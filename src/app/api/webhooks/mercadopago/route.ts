// src/app/api/webhooks/mercadopago/route.ts
import { NextResponse } from 'next/server'
import { Payment } from 'mercadopago'
import { prisma } from '@/lib/prisma'
import crypto from 'crypto'
import { MercadoPagoConfig } from 'mercadopago'

// Configurar o cliente do Mercado Pago
const client = new MercadoPagoConfig({ 
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN! 
})

// Função para verificar a assinatura do webhook (segurança)
function verifyMercadoPagoSignature(
  body: string,
  signature: string | null,
  secret: string
): boolean {
  if (!signature) return false
  
  try {
    // Formato esperado: ts=123456,v1=abcdefg
    const parts = signature.split(',')
    const ts = parts[0].split('=')[1]
    const receivedHash = parts[1].split('=')[1]
    
    // Criar o payload para verificação
    const payload = `id:${body};request-id:${ts};`
    
    // Gerar HMAC SHA256
    const expectedHash = crypto
      .createHmac('sha256', secret)
      .update(payload)
      .digest('hex')
    
    return receivedHash === expectedHash
  } catch (error) {
    console.error('Erro ao verificar assinatura:', error)
    return false
  }
}

export async function POST(request: Request) {
  try {
    // Obter o corpo da requisição
    const body = await request.json()
    const bodyString = JSON.stringify(body)
    
    // Obter a assinatura do header
    const signature = request.headers.get('x-signature')
    
    // Verificar a assinatura (opcional, mas recomendado para produção)
    if (process.env.NODE_ENV === 'production') {
      const isValid = verifyMercadoPagoSignature(
        bodyString,
        signature,
        process.env.MERCADO_PAGO_WEBHOOK_SECRET!
      )
      
      if (!isValid) {
        console.error('Assinatura inválida')
        return NextResponse.json(
          { error: 'Assinatura inválida' },
          { status: 401 }
        )
      }
    }
    
    // Log para debug
    console.log('Webhook recebido:', JSON.stringify(body, null, 2))
    
    // Processar diferentes tipos de notificação
    const { action, data } = body
    
    // Se for notificação de pagamento
    if (action === 'payment.created' || action === 'payment.updated' || body.type === 'payment') {
      const paymentId = data?.id || body.data?.id
      
      if (!paymentId) {
        return NextResponse.json(
          { error: 'ID do pagamento não encontrado' },
          { status: 400 }
        )
      }
      
      // Buscar detalhes do pagamento na API do Mercado Pago
      const payment = await new Payment(client).get({ id: paymentId })
      
      console.log('Status do pagamento:', payment.status)
      console.log('Email do comprador:', payment.payer?.email)
      console.log('Metadata:', payment.metadata)
      
      // Se o pagamento foi aprovado
      if (payment.status === 'approved') {
        const email = payment.payer?.email
        const productId = payment.metadata?.product_id
        
        if (email && productId) {
          // Buscar o usuário pelo email
          const user = await prisma.user.findUnique({
            where: { email }
          })
          
          if (user) {
            // Atualizar o status da compra para 'paid'
            await prisma.userProduct.updateMany({
              where: {
                userId: user.id,
                productId: productId
              },
              data: {
                paymentStatus: 'paid',
                mpPaymentId: paymentId.toString()
              }
            })
            
            console.log(`Pagamento ${paymentId} processado para usuário ${email}`)
          }
        }
      }
    }
    
    // Sempre retornar 200 para o Mercado Pago saber que recebemos
    return NextResponse.json({ received: true })
    
  } catch (error) {
    console.error('Erro no webhook:', error)
    // Retornar 200 mesmo em erro para não reenviar (opcional)
    // Se quiser que tente novamente, retorne 500
    return NextResponse.json(
      { error: 'Erro interno' },
      { status: 500 }
    )
  }
}