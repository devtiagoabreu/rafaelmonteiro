// Arquivo: src/app/livro-2/layout.tsx (LAYOUT)

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
  title: 'Livro 2 - Por Que Você Se Atrai Sempre Pelo Mesmo Tipo de Pessoa?',
  description: 'Descubra os padrões inconscientes que te levam às mesmas escolhas amorosas e aprenda a quebrar o ciclo da repetição.',
}

export default function Livro2Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}