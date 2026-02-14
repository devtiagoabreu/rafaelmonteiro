// src/app/api/webhooks/mercadopago/route.ts
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
    
    // Se for uma merchant_order (ordem de pagamento)
    if (topic === 'merchant_order' && resource) {
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
      
      // A merchant_order pode ter múltiplos pagamentos
      if (merchantOrder.payments && merchantOrder.payments.length > 0) {
        for (const paymentInfo of merchantOrder.payments) {
          const paymentId = paymentInfo.id
          console.log(`💰 Processando pagamento ${paymentId} com status ${paymentInfo.status}`)
          
          if (paymentInfo.status === 'approved') {
            // Buscar detalhes completos do pagamento
            const payment = await new Payment(client).get({ id: paymentId })
            
            const email = payment.external_reference || payment.payer?.email
            console.log('📧 Email:', email)
            console.log('📦 Metadata:', payment.metadata)
            
            if (email) {
              const user = await prisma.user.findUnique({
                where: { email }
              })
              
              if (user) {
                // Determinar productId (da metadata ou do valor)
                let productId = payment.metadata?.product_id
                
                if (!productId) {
                  const amount = payment.transaction_amount
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
                
                if (productId) {
                  await prisma.userProduct.upsert({
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
                }
              }
            }
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

export async function GET() {
  return NextResponse.json({ 
    message: 'Webhook endpoint ready for POST requests' 
  })
}