// src/app/api/criar-preferencia/route.ts
import { NextResponse } from 'next/server'
import { MercadoPagoConfig, Preference } from 'mercadopago'

const client = new MercadoPagoConfig({ 
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN! 
})

export async function POST(request: Request) {
  try {
    const { productId, userEmail, productTitle, productPrice } = await request.json()
    
    const preference = new Preference(client)
    
    const body = {
      items: [
        {
          id: productId,
          title: productTitle,
          quantity: 1,
          unit_price: productPrice,
          currency_id: 'BRL'
        }
      ],
      payer: {
        email: userEmail
      },
      external_reference: userEmail, // IMPORTANTE: para identificar no webhook
      metadata: {
        product_id: productId // IMPORTANTE: para saber qual produto foi comprado
      },
      back_urls: {
        success: 'https://rafaelmonteiro-pi.vercel.app/obrigado',
        pending: 'https://rafaelmonteiro-pi.vercel.app/pagamento-pendente',
        failure: 'https://rafaelmonteiro-pi.vercel.app/'
      },
      auto_return: 'approved', // Funciona apenas para cartão
      notification_url: 'https://rafaelmonteiro-pi.vercel.app/api/webhooks/mercadopago' // WEBHOOK
    }
    
    const result = await preference.create({ body })
    
    return NextResponse.json({ 
      init_point: result.init_point, // URL para redirecionar o usuário
      preference_id: result.id 
    })
    
  } catch (error) {
    console.error('Erro ao criar preferência:', error)
    return NextResponse.json({ error: 'Erro ao criar pagamento' }, { status: 500 })
  }
}