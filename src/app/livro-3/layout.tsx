// Arquivo: src/app/livro-3/layout.tsx (LAYOUT)

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
  title: 'Livro 3 - Ciúme, Insegurança e Medo de Perder',
  description: 'Como reconstruir segurança emocional sem controle nem dependência. Um guia prático para lidar com ciúmes e insegurança nos relacionamentos.',
}

export default function Livro3Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}