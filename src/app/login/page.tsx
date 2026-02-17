// src/app/login/page.tsx

import { Suspense } from 'react'
import LoginClient from './LoginClient'

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 text-center">
          <div className="text-4xl mb-4 animate-spin">⏳</div>
          <h2 className="text-2xl font-bold mb-4">Carregando...</h2>
        </div>
      </div>
    }>
      <LoginClient />
    </Suspense>
  )
}