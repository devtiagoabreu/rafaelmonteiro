// src/app/api/check-payment-status/route.ts
import { NextResponse } from 'next/server'
import { Payment } from 'mercadopago'
import { MercadoPagoConfig } from 'mercadopago'

const client = new MercadoPagoConfig({ 
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN! 
})

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const paymentId = searchParams.get('payment_id')
  
  if (!paymentId) {
    return NextResponse.json({ error: 'payment_id é obrigatório' }, { status: 400 })
  }
  
  try {
    const payment = await new Payment(client).get({ id: paymentId })
    
    return NextResponse.json({
      status: payment.status,
      status_detail: payment.status_detail
    })
  } catch (error) {
    console.error('Erro ao consultar pagamento:', error)
    return NextResponse.json({ error: 'Erro na consulta' }, { status: 500 })
  }
}