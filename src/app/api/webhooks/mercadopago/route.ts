// src/app/api/webhooks/mercadopago/route.ts
import { NextResponse } from 'next/server'
import { Payment, MerchantOrder } from 'mercadopago'
import { prisma } from '@/lib/prisma'
import { MercadoPagoConfig } from 'mercadopago'
import { sendPaymentConfirmationEmails } from '@/lib/email-service'

const client = new MercadoPagoConfig({ 
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN! 
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    console.log('🔵 WEBHOOK RECEBIDO:')
    console.log(JSON.stringify(body, null, 2))
    
    const { resource, topic } = body
    
    if (topic === 'payment') {
      const paymentId = resource
      
      if (!paymentId) {
        console.log('⚠️ ID do pagamento não encontrado em payment')
        return NextResponse.json({ received: true })
      }
      
      console.log(`💰 Processando pagamento direto ID: ${paymentId}`)
      await processarPagamento(paymentId)
    }
    
    else if (topic === 'merchant_order' && resource) {
      console.log('📦 Processando merchant_order:', resource)
      
      const orderId = resource.split('/').pop()
      
      if (!orderId) {
        console.log('⚠️ ID da merchant_order não encontrado')
        return NextResponse.json({ received: true })
      }
      
      const merchantOrder = await new MerchantOrder(client).get({ 
        merchantOrderId: orderId 
      })
      
      console.log('📊 Merchant order:', {
        id: merchantOrder.id,
        status: merchantOrder.status,
        payments: merchantOrder.payments
      })
      
      if (merchantOrder.payments && merchantOrder.payments.length > 0) {
        for (const paymentInfo of merchantOrder.payments) {
          const paymentId = paymentInfo.id
          
          if (!paymentId) continue
          
          if (paymentInfo.status === 'approved') {
            console.log(`💰 Processando pagamento ${paymentId} da merchant_order`)
            await processarPagamento(paymentId)
          }
        }
      }
    }
    
    return NextResponse.json({ received: true })
    
  } catch (error) {
    console.error('🔴 Erro no webhook:', error)
    return NextResponse.json({ received: true, error: String(error) })
  }
}

// Função principal que processa cada pagamento
async function processarPagamento(paymentId: string | number) {
  try {
    console.log(`🔄 Buscando detalhes do pagamento ${paymentId}`)
    
    const payment = await new Payment(client).get({ id: paymentId })
    
    console.log('📊 Status do pagamento:', payment.status)
    console.log('📧 Email:', payment.payer?.email)
    console.log('🔗 External reference:', payment.external_reference)
    console.log('📦 Metadata:', payment.metadata)
    
    if (payment.status !== 'approved') {
      console.log(`⏳ Pagamento ${paymentId} não está aprovado (${payment.status})`)
      return
    }
    
    const email = payment.external_reference || payment.payer?.email
    
    if (!email) {
      console.log('❌ Email não encontrado no pagamento')
      return
    }
    
    const user = await prisma.user.findUnique({
      where: { email }
    })
    
    if (!user) {
      console.log(`❌ Usuário não encontrado: ${email}`)
      return
    }
    
    // DETERMINAR QUAL PRODUTO FOI COMPRADO
    let productId = payment.metadata?.product_id
    let isCombo = false
    
    // Se não veio na metadata, tenta identificar pelo valor
    if (!productId) {
      const amount = payment.transaction_amount
      console.log(`💰 Valor do pagamento: ${amount}`)
      
      if (amount === 1 || amount === 1.00) {
        productId = '2' // Livro 2 (teste)
      } else if (amount === 9.90) {
        // Identificar qual livro tem esse preço (todos os individuais)
        const product = await prisma.product.findFirst({
          where: { price: amount, isCombo: false }
        })
        productId = product?.id
      } else if (amount === 29.90) {
        // COMBO DETECTADO - ID 6
        productId = '6'
        isCombo = true
        console.log('🎁 COMBO DETECTADO! ID 6 - Processando livros 2, 3, 4 e 5...')
      }
    } else {
      // Verifica se o productId é do combo (id 6)
      const product = await prisma.product.findUnique({
        where: { id: productId }
      })
      isCombo = product?.isCombo || false
      console.log(`📦 Produto ID: ${productId}, é combo? ${isCombo}`)
    }
    
    // PROCESSAMENTO DO COMBO (ID 6 - libera livros 2, 3, 4, 5)
    if (isCombo || productId === '6') {
      console.log('📦 Processando COMBO - Liberando livros 2, 3, 4 e 5')
      
      // Buscar os IDs dos livros 2, 3, 4 e 5
      const livrosCombo = await prisma.product.findMany({
        where: {
          bookNumber: { in: [2, 3, 4, 5] }
        }
      })
      
      console.log(`📚 Encontrados ${livrosCombo.length} livros para o combo`)
      
      const resultados = []
      
      // Para cada livro, criar ou atualizar o registro
      for (const livro of livrosCombo) {
        const result = await prisma.userProduct.upsert({
          where: {
            userId_productId: {
              userId: user.id,
              productId: livro.id
            }
          },
          update: {
            paymentStatus: 'paid',
            mpPaymentId: paymentId.toString()
          },
          create: {
            userId: user.id,
            productId: livro.id,
            paymentStatus: 'paid',
            mpPaymentId: paymentId.toString()
          }
        })
        
        console.log(`✅ Livro ${livro.bookNumber} (${livro.title}) processado`)
        resultados.push(livro.bookNumber)
      }
      
      // 🔥 AGORA TAMBÉM REGISTRA O PRÓPRIO COMBO (opcional)
      // Isso mantém o registro de que o usuário comprou o combo
      await prisma.userProduct.upsert({
        where: {
          userId_productId: {
            userId: user.id,
            productId: '6'
          }
        },
        update: {
          paymentStatus: 'paid',
          mpPaymentId: paymentId.toString()
        },
        create: {
          userId: user.id,
          productId: '6',
          paymentStatus: 'paid',
          mpPaymentId: paymentId.toString()
        }
      })
      
      console.log(`🎁 Registro do combo ID 6 também salvo`)
      console.log(`🎉 COMBO finalizado! Livros liberados: ${resultados.join(', ')} para ${email}`)
      
      // Enviar e-mails de confirmação
      const comboProduct = await prisma.product.findUnique({
        where: { id: '6' }
      })
      
      console.log('📧 ===== INICIANDO ENVIO DE E-MAIL DO COMBO =====');
      console.log('📧 Email do usuário:', email);
      console.log('📧 Nome do usuário:', user.fullName);
      console.log('📧 Produto:', comboProduct?.title);
      console.log('📧 É combo?', true);
      console.log('📧 Livros:', livrosCombo.map(l => l.title));
      
      try {
        await sendPaymentConfirmationEmails({
          userEmail: email,
          userName: user.fullName,
          userPhone: user.phone || 'Não informado',
          product: comboProduct || { title: 'Pacote Completo', price: 29.90 },
          paymentId: paymentId.toString(),
          isCombo: true,
          books: livrosCombo,
        });
        console.log('✅ Função de e-mail do combo executada com sucesso');
      } catch (emailError) {
        console.error('❌ ERRO ao executar função de e-mail do combo:', emailError);
      }
      
      return
    }
    
    // PROCESSAMENTO DE LIVRO INDIVIDUAL
    if (!productId) {
      console.log('❌ Product ID não identificado')
      return
    }
    
    const product = await prisma.product.findUnique({
      where: { id: productId }
    })
    
    if (!product) {
      console.log(`❌ Produto não encontrado: ${productId}`)
      return
    }
    
    const result = await prisma.userProduct.upsert({
      where: {
        userId_productId: {
          userId: user.id,
          productId: productId
        }
      },
      update: {
        paymentStatus: 'paid',
        mpPaymentId: paymentId.toString()
      },
      create: {
        userId: user.id,
        productId: productId,
        paymentStatus: 'paid',
        mpPaymentId: paymentId.toString()
      }
    })
    
    console.log(`✅ Pagamento ${paymentId} processado para ${email}`)
    console.log(`📊 ID do registro: ${result.id}`)
    
    console.log('📧 ===== INICIANDO ENVIO DE E-MAIL DO LIVRO INDIVIDUAL =====');
    console.log('📧 Email do usuário:', email);
    console.log('📧 Nome do usuário:', user.fullName);
    console.log('📧 Produto:', product.title);
    console.log('📧 É combo?', false);
    
    try {
      await sendPaymentConfirmationEmails({
        userEmail: email,
        userName: user.fullName,
        userPhone: user.phone || 'Não informado',
        product,
        paymentId: paymentId.toString(),
        isCombo: false,
        books: [],
      });
      console.log('✅ Função de e-mail do livro executada com sucesso');
    } catch (emailError) {
      console.error('❌ ERRO ao executar função de e-mail do livro:', emailError);
    }
    
  } catch (error) {
    console.error(`🔴 Erro ao processar pagamento ${paymentId}:`, error)
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Webhook endpoint ready for POST requests',
    note: 'Processa notificações dos tipos payment e merchant_order'
  })
}