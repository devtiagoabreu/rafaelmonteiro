// src/app/criar-senha/page.tsx
import type { Viewport } from 'next'
import { Suspense } from 'react'
import CriarSenhaClient from './CriarSenhaClient'

// Viewport export - Server Component pode ter
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

// Página principal (Server Component)
export default function CriarSenhaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Criar Senha de Acesso
          </h2>
          <p className="text-gray-600">
            Primeiro acesso detectado
          </p>
        </div>

        <Suspense fallback={
          <div className="text-center py-8">
            <div className="text-4xl mb-4 animate-spin">⏳</div>
            <p>Carregando...</p>
          </div>
        }>
          <CriarSenhaClient />
        </Suspense>
      </div>
    </div>
  )
}