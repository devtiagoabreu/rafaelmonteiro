// src/app/login/page.tsx

import { Suspense } from 'react'
import LoginClient from './LoginClient'
import type { Viewport } from 'next'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a1a' },
  ],
}

export const metadata = {
  title: 'Login - Rafael Monteiro',
  description: 'Acesse sua conta para continuar sua jornada de transformação nos relacionamentos.',
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <h2 className="text-xl font-semibold text-gray-800">Carregando...</h2>
            <p className="text-gray-500 text-sm">Preparando sua experiência</p>
          </div>
        </div>
      </div>
    }>
      <LoginClient />
    </Suspense>
  )
}