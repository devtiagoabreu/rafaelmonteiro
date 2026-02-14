// src/app/pagamento-pendente/page.tsx
'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

// Componente que realmente usa o useSearchParams
function PaymentChecker() {
  const searchParams = useSearchParams()
  const paymentId = searchParams.get('payment_id')
  const [status, setStatus] = useState('pending')
  const [attempts, setAttempts] = useState(0)

  useEffect(() => {
    if (!paymentId) return

    const checkPayment = async () => {
      try {
        const response = await fetch(`/api/check-payment-status?payment_id=${paymentId}`)
        const data = await response.json()
        
        setAttempts(a => a + 1)
        
        if (data.status === 'approved') {
          window.location.href = '/obrigado'
        }
      } catch (error) {
        console.error('Erro ao verificar pagamento:', error)
      }
    }

    const interval = setInterval(checkPayment, 3000)
    return () => clearInterval(interval)
  }, [paymentId])

  return (
    <>
      <div className="text-6xl mb-4 animate-pulse">⏳</div>
      <h1 className="text-3xl font-bold mb-4">Aguardando pagamento</h1>
      <p className="text-gray-600 mb-4">
        Seu PIX foi gerado. Após o pagamento, você será redirecionado automaticamente.
      </p>
      <div className="bg-blue-50 p-4 rounded-lg mb-4">
        <p className="text-sm text-blue-800">
          Verificando pagamento... (tentativa {attempts})
        </p>
      </div>
      <p className="text-sm text-gray-500">
        O pagamento PIX pode levar alguns segundos para ser confirmado.
      </p>
    </>
  )
}

// Página principal com Suspense
export default function PagamentoPendente() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 text-center">
        <Suspense fallback={
          <>
            <div className="text-6xl mb-4 animate-pulse">⏳</div>
            <h1 className="text-3xl font-bold mb-4">Carregando...</h1>
          </>
        }>
          <PaymentChecker />
        </Suspense>
      </div>
    </div>
  )
}