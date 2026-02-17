import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/context/AuthContext'
import { NotificationProvider } from '@/context/NotificationContext'

const inter = Inter({ subsets: ['latin'] })

// 👇 VIEWPORT separado do metadata (NOVO)
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a1a' },
  ],
  colorScheme: 'light dark',
}

export const metadata: Metadata = {
  title: {
    default: 'Rafael Monteiro - Terapeuta de Relacionamentos e Sexualidade',
    template: '%s | Rafael Monteiro'
  },
  description: 'Jornada Relacionamentos Conscientes: Série de livros sobre desejo, ciúme, dependência emocional e relacionamentos saudáveis.',
  keywords: [
    'Rafael Monteiro',
    'terapeuta de relacionamentos',
    'livros de relacionamento',
    'O Desejo Não Morre',
    'Ele É Mal Cuidado',
    'ciúme no relacionamento',
    'dependência emocional',
    'como melhorar o relacionamento',
    'desejo sexual no casamento',
    'terapia de casal',
    'relacionamentos conscientes',
    'intimidade no casamento',
    'superar término',
    'reconstruir relacionamento',
    'amor saudável'
  ],
  authors: [{ name: 'Rafael Monteiro', url: 'https://rafaelmonteiro-pi.vercel.app' }],
  creator: 'Rafael Monteiro',
  publisher: 'Rafael Monteiro',
  formatDetection: { email: false, address: false, telephone: false },
  metadataBase: new URL('https://rafaelmonteiro-pi.vercel.app'),
  alternates: {
    canonical: '/',
    languages: { 'pt-BR': '/' },
  },
  openGraph: {
    title: 'Rafael Monteiro - Jornada Relacionamentos Conscientes',
    description: 'Descubra livros que transformam relacionamentos. Série com 5 livros sobre desejo, ciúme, dependência emocional e amor consciente.',
    url: 'https://rafaelmonteiro-pi.vercel.app',
    siteName: 'Rafael Monteiro - Terapeuta de Relacionamentos',
    images: [{
      url: 'https://rafaelmonteiro-pi.vercel.app/images/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Rafael Monteiro - Série Jornada Relacionamentos Conscientes',
    }],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rafael Monteiro - Relacionamentos Conscientes',
    description: 'Livros que transformam seus relacionamentos. Série completa sobre desejo, ciúme e amor consciente.',
    images: ['https://rafaelmonteiro-pi.vercel.app/images/twitter-image.jpg'],
    creator: '@rafaelmonteiro',
    site: '@rafaelmonteiro',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: { google: 'SEU_CODIGO_DE_VERIFICACAO_AQUI' },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon-57x57.png', sizes: '57x57', type: 'image/png' },
      { url: '/apple-icon-60x60.png', sizes: '60x60', type: 'image/png' },
      { url: '/apple-icon-72x72.png', sizes: '72x72', type: 'image/png' },
      { url: '/apple-icon-76x76.png', sizes: '76x76', type: 'image/png' },
      { url: '/apple-icon-114x114.png', sizes: '114x114', type: 'image/png' },
      { url: '/apple-icon-120x120.png', sizes: '120x120', type: 'image/png' },
      { url: '/apple-icon-144x144.png', sizes: '144x144', type: 'image/png' },
      { url: '/apple-icon-152x152.png', sizes: '152x152', type: 'image/png' },
      { url: '/apple-icon-180x180.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [{ rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#9d4e7c' }],
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    title: 'Rafael Monteiro',
    statusBarStyle: 'black-translucent',
    startupImage: ['/apple-splash-2048-2732.png'],
  },
  applicationName: 'Rafael Monteiro - Terapeuta de Relacionamentos',
  category: 'relacionamentos, autoajuda, terapia, sexualidade',
  classification: 'Conteúdo para maiores de 18 anos',
  other: {
    'google-site-verification': 'SEU_CODIGO_VERIFICACAO',
    'msvalidate.01': 'SEU_CODIGO_BING',
    'facebook-domain-verification': 'SEU_CODIGO_FACEBOOK',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Crimson+Text:wght@400;600;700&family=Open+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icon-32x32.png" />
        <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="google-site-verification" content="SEU_CODIGO_GOOGLE" />
        <meta name="msvalidate.01" content="SEU_CODIGO_BING" />
        <meta name="facebook-domain-verification" content="SEU_CODIGO_FACEBOOK" />
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