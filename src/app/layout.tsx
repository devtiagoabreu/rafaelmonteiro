import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/context/AuthContext'
import { NotificationProvider } from '@/context/NotificationContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Jornada Relacionamentos Conscientes',
  description: 'Série de livros sobre relacionamentos conscientes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Crimson+Text:wght@400;600;700&family=Open+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <NotificationProvider>
            {children}
          </NotificationProvider>
        </AuthProvider>
      </body>
    </html>
  )
}