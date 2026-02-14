import { NextResponse } from 'next/server'
import { Payment } from 'mercadopago'
import { prisma } from '@/lib/prisma'
import { MercadoPagoConfig } from 'mercadopago'

const client = new MercadoPagoConfig({ 
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN! 
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log('🔵 Webhook recebido:', JSON.stringify(body, null, 2))
    
    const { action, data, type } = body
    const paymentId = data?.id || body.data?.id
    
    if (!paymentId) {
      console.log('⚠️ ID do pagamento não encontrado')
      return NextResponse.json({ received: true })
    }
    
    // Buscar detalhes do pagamento na API do Mercado Pago
    const payment = await new Payment(client).get({ id: paymentId })
    
    console.log('💰 Status do pagamento:', payment.status)
    console.log('📧 Email do comprador:', payment.payer?.email)
    console.log('📦 Metadata:', payment.metadata)
    console.log('🔗 External reference:', payment.external_reference)
    
    // Se o pagamento foi aprovado
    if (payment.status === 'approved') {
      // Prioridade: 1. external_reference, 2. payer.email, 3. metadata
      const email = payment.external_reference || payment.payer?.email
      const productId = payment.metadata?.product_id
      
      if (!email) {
        console.log('❌ Email não encontrado no pagamento')
        return NextResponse.json({ received: true })
      }
      
      // Buscar o usuário pelo email
      const user = await prisma.user.findUnique({
        where: { email }
      })
      
      if (!user) {
        console.log(`❌ Usuário não encontrado: ${email}`)
        return NextResponse.json({ received: true })
      }
      
      // Se não veio productId na metadata, precisamos determinar pelo valor
      let finalProductId = productId
      
      if (!finalProductId) {
        // Tenta identificar pelo valor do pagamento
        const amount = payment.transaction_amount
        if (amount === 1) {
          // Era um teste - provavelmente livro 2
          finalProductId = '2'
        } else if (amount === 29.90) {
          // Encontrar qual livro tem esse preço
          const product = await prisma.product.findFirst({
            where: { price: amount, isCombo: false }
          })
          finalProductId = product?.id
        } else if (amount === 89.90) {
          const product = await prisma.product.findFirst({
            where: { isCombo: true }
          })
          finalProductId = product?.id
        }
      }
      
      if (!finalProductId) {
        console.log('❌ Product ID não identificado')
        return NextResponse.json({ received: true })
      }
      
      // Atualizar o status da compra
      const result = await prisma.userProduct.upsert({
        where: {
          userId_productId: {
            userId: user.id,
            productId: finalProductId
          }
        },
        update: {
          paymentStatus: 'paid',
          mpPaymentId: paymentId.toString()
        },
        create: {
          userId: user.id,
          productId: finalProductId,
          paymentStatus: 'paid',
          mpPaymentId: paymentId.toString()
        }
      })
      
      console.log(`✅ Pagamento ${paymentId} processado para ${email}`)
      console.log(`📊 Produto: ${finalProductId}, Status: paid`)
    }
    
    return NextResponse.json({ received: true })
    
  } catch (error) {
    console.error('🔴 Erro no webhook:', error)
    return NextResponse.json({ received: true, error: String(error) })
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Webhook endpoint ready for POST requests' })
}