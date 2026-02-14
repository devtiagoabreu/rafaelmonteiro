import { NextResponse } from 'next/server'
import { Payment } from 'mercadopago'
import { prisma } from '@/lib/prisma'
import { MercadoPagoConfig } from 'mercadopago'

// Configurar o cliente do Mercado Pago
const client = new MercadoPagoConfig({ 
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN! 
})

export async function POST(request: Request) {
  try {
    // Obter o corpo da requisição
    const body = await request.json()
    
    // Log para debug (importante para ver o que está chegando)
    console.log('🔵 Webhook recebido:', JSON.stringify(body, null, 2))
    console.log('🔵 Headers:', Object.fromEntries(request.headers))
    
    // EM MODO DE TESTE, ACEITAMOS TODAS AS REQUISIÇÕES
    // (em produção, você deve verificar a assinatura)
    
    // Extrair informações do pagamento
    const { action, data, type } = body
    
    // Se for notificação de pagamento
    if (type === 'payment' || action?.includes('payment')) {
      const paymentId = data?.id || body.data?.id
      
      if (!paymentId) {
        console.log('⚠️ ID do pagamento não encontrado')
        return NextResponse.json({ received: true }) // Retorna 200 mesmo assim
      }
      
      console.log(`💰 Pagamento ID: ${paymentId} recebido`)
      
      // Para TESTE, podemos simular um pagamento aprovado
      if (paymentId === '123456' || process.env.NODE_ENV !== 'production') {
        // Buscar o email do usuário (em produção, viria do external_reference)
        // Como é teste, vamos apenas logar
        console.log('✅ Pagamento de teste recebido com sucesso!')
        
        // Em produção, você atualizaria o banco aqui
        // await prisma.userProduct.updateMany({ ... })
      }
    }
    
    // Sempre retornar 200 para o Mercado Pago
    return NextResponse.json({ received: true })
    
  } catch (error) {
    console.error('🔴 Erro no webhook:', error)
    // Retornar 200 mesmo em erro para não reenviar (opcional)
    return NextResponse.json({ received: true, error: String(error) })
  }
}

// Importante: Aceitar apenas POST
export async function GET() {
  return NextResponse.json({ message: 'Webhook endpoint ready for POST requests' })
}