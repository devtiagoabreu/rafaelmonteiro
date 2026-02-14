import { NextResponse } from 'next/server'
import { Payment, MerchantOrder } from 'mercadopago'
import { prisma } from '@/lib/prisma'
import { MercadoPagoConfig } from 'mercadopago'

const client = new MercadoPagoConfig({ 
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN! 
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    console.log('🔵 WEBHOOK RECEBIDO:')
    console.log(JSON.stringify(body, null, 2))
    
    const { resource, topic } = body
    
    // CASO 1: Notificação de payment (resource já é o ID)
    if (topic === 'payment') {
      const paymentId = resource // resource já é o ID direto
      
      if (!paymentId) {
        console.log('⚠️ ID do pagamento não encontrado em payment')
        return NextResponse.json({ received: true })
      }
      
      console.log(`💰 Processando pagamento direto ID: ${paymentId}`)
      await processarPagamento(paymentId)
    }
    
    // CASO 2: Notificação de merchant_order (resource é uma URL)
    else if (topic === 'merchant_order' && resource) {
      console.log('📦 Processando merchant_order:', resource)
      
      // Extrair o ID da merchant_order da URL
      const orderId = resource.split('/').pop()
      
      if (!orderId) {
        console.log('⚠️ ID da merchant_order não encontrado')
        return NextResponse.json({ received: true })
      }
      
      // Buscar detalhes da merchant_order
      const merchantOrder = await new MerchantOrder(client).get({ 
        merchantOrderId: orderId 
      })
      
      console.log('📊 Merchant order:', {
        id: merchantOrder.id,
        status: merchantOrder.status,
        payments: merchantOrder.payments
      })
      
      // Processar cada pagamento dentro da ordem
      if (merchantOrder.payments && merchantOrder.payments.length > 0) {
        for (const paymentInfo of merchantOrder.payments) {
          const paymentId = paymentInfo.id
          
          if (!paymentId) {
            console.log('⚠️ Pagamento sem ID encontrado, pulando...')
            continue
          }
          
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

// Função auxiliar para processar um pagamento específico
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
    
    // Determinar productId
    let productId = payment.metadata?.product_id
    
    if (!productId) {
      const amount = payment.transaction_amount
      console.log(`💰 Valor do pagamento: ${amount}`)
      
      if (amount === 1 || amount === 1.00) {
        productId = '2' // Livro 2 (teste)
      } else if (amount === 29.90) {
        const product = await prisma.product.findFirst({
          where: { price: amount, isCombo: false }
        })
        productId = product?.id
      } else if (amount === 89.90) {
        const product = await prisma.product.findFirst({
          where: { isCombo: true }
        })
        productId = product?.id
      }
    }
    
    if (!productId) {
      console.log('❌ Product ID não identificado')
      return
    }
    
    // Atualizar ou criar o registro de compra
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