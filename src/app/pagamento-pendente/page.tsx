// src/app/pagamento-pendente/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

export default function PagamentoPendente() {
  const searchParams = useSearchParams()
  const paymentId = searchParams.get('payment_id')
  const [status, setStatus] = useState('pending')
  const [verifications, setVerifications] = useState(0)

  useEffect(() => {
    // Polling para verificar status do pagamento
    const interval = setInterval(async () => {
      try {
        const response = await fetch(`/api/check-payment-status?payment_id=${paymentId}`)
        const data = await response.json()
        
        setVerifications(v => v + 1)
        
        if (data.status === 'approved') {
          clearInterval(interval)
          window.location.href = '/obrigado'
        }
      } catch (error) {
        console.error('Erro ao verificar status:', error)
      }
    }, 5000) // Verifica a cada 5 segundos

    return () => clearInterval(interval)
  }, [paymentId])

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 text-center">
        <div className="text-6xl mb-4 animate-pulse">⏳</div>
        <h1 className="text-3xl font-bold mb-4">Aguardando pagamento</h1>
        <p className="text-gray-600 mb-4">
          Seu PIX foi gerado. Após o pagamento, esta página será atualizada automaticamente.
        </p>
        <div className="bg-blue-50 p-4 rounded-lg mb-4">
          <p className="text-sm text-blue-800">
            Já pagou? Estamos verificando... ({verifications} tentativas)
          </p>
        </div>
        <p className="text-sm text-gray-500">
          O pagamento PIX pode levar alguns segundos para ser confirmado pelo banco.
        </p>
      </div>
    </div>
  )
}