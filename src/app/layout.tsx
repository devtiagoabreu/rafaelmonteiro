import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/context/AuthContext'
import { NotificationProvider } from '@/context/NotificationContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  // Título padrão do site
  title: {
    default: 'Rafael Monteiro - Terapeuta de Relacionamentos e Sexualidade',
    template: '%s | Rafael Monteiro'
  },
  
  // Descrição principal para SEO
  description: 'Jornada Relacionamentos Conscientes: Série de livros sobre desejo, ciúme, dependência emocional e relacionamentos saudáveis. Escritos por Rafael Monteiro, terapeuta de relacionamentos.',
  
  // Palavras-chave para mecanismos de busca
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
  
  // Informações do autor
  authors: [
    {
      name: 'Rafael Monteiro',
      url: 'https://rafaelmonteiro-pi.vercel.app'
    }
  ],
  
  // Criador e publicador
  creator: 'Rafael Monteiro',
  publisher: 'Rafael Monteiro',
  
  // Configuração de formatação
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  
  // URL base para metadados
  metadataBase: new URL('https://rafaelmonteiro-pi.vercel.app'),
  
  // URLs alternativas (canônica)
  alternates: {
    canonical: '/',
    languages: {
      'pt-BR': '/',
    },
  },
  
  // Open Graph (para compartilhamento em redes sociais)
  openGraph: {
    title: 'Rafael Monteiro - Jornada Relacionamentos Conscientes',
    description: 'Descubra livros que transformam relacionamentos. Série com 5 livros sobre desejo, ciúme, dependência emocional e amor consciente.',
    url: 'https://rafaelmonteiro-pi.vercel.app',
    siteName: 'Rafael Monteiro - Terapeuta de Relacionamentos',
    images: [
      {
        url: 'https://rafaelmonteiro-pi.vercel.app/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Rafael Monteiro - Série Jornada Relacionamentos Conscientes',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  
  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'Rafael Monteiro - Relacionamentos Conscientes',
    description: 'Livros que transformam seus relacionamentos. Série completa sobre desejo, ciúme e amor consciente.',
    images: ['https://rafaelmonteiro-pi.vercel.app/images/twitter-image.jpg'],
    creator: '@rafaelmonteiro',
    site: '@rafaelmonteiro',
  },
  
  // Robôs de busca
  robots: {
    index: true, // Permite indexação
    follow: true, // Permite seguir links
    nocache: false, // Permite cache
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Verificação do Google Search Console
  verification: {
    google: 'vPTQ9kB2K9m7Iah7dPjO5jZAXadvSaat0C5mF5Z0lmE', // Substitua pelo código do Search Console
    // yandex: '',
    // yahoo: '',
    // other: '',
  },
  
  // Ícones e manifest
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
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#9d4e7c',
      },
    ],
  },
  
  // Manifest para PWA
  manifest: '/manifest.json',
  
  // Cor do tema
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a1a' },
  ],
  
  // Cor de fundo
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  
  // Apple specific
  appleWebApp: {
    capable: true,
    title: 'Rafael Monteiro',
    statusBarStyle: 'black-translucent',
    startupImage: [
      '/apple-splash-2048-2732.png',
    ],
  },
  
  // Aplicação
  applicationName: 'Rafael Monteiro - Terapeuta de Relacionamentos',
  
  // Categoria
  category: 'relacionamentos, autoajuda, terapia, sexualidade',
  
  // Classificação
  classification: 'Conteúdo para maiores de 18 anos',
  
  // Outros metadados úteis
  other: {
    'google-site-verification': 'SEU_CODIGO_VERIFICACAO',
    'msvalidate.01': 'SEU_CODIGO_BING',
    'facebook-domain-verification': 'SEU_CODIGO_FACEBOOK',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Font Awesome */}
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
        />
        
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Crimson+Text:wght@400;600;700&family=Open+Sans:wght@300;400;500;600;700&display=swap" 
          rel="stylesheet" 
        />

        {/* Google Search Console Verification - ADICIONE AQUI */}
        <meta name="google-site-verification" content="vPTQ9kB2K9m7Iah7dPjO5jZAXadvSaat0C5mF5Z0lmE" />
        
        {/* Favicon para todos os navegadores */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icon-32x32.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon-512x512.png" />
        
        {/* Apple Touch Icons */}
        <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
        
        {/* Windows Tile */}
        <meta name="msapplication-TileColor" content="#9d4e7c" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Safari Pinned Tab */}
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#9d4e7c" />
        
        {/* Theme Color */}
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#1a1a1a" media="(prefers-color-scheme: dark)" />
        
        {/* Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://rafaelmonteiro-pi.vercel.app" />
        
        {/* Alternate languages */}
        <link rel="alternate" hrefLang="pt-BR" href="https://rafaelmonteiro-pi.vercel.app" />
        <link rel="alternate" hrefLang="x-default" href="https://rafaelmonteiro-pi.vercel.app" />
        
        {/* Open Graph protocol */}
        <meta property="og:site_name" content="Rafael Monteiro - Terapeuta de Relacionamentos" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://rafaelmonteiro-pi.vercel.app" />
        <meta property="og:title" content="Rafael Monteiro - Jornada Relacionamentos Conscientes" />
        <meta property="og:description" content="Série de livros sobre desejo, ciúme, dependência emocional e relacionamentos saudáveis." />
        <meta property="og:image" content="https://rafaelmonteiro-pi.vercel.app/images/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Rafael Monteiro - Livros sobre Relacionamentos" />
        <meta property="og:locale" content="pt_BR" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@rafaelmonteiro" />
        <meta name="twitter:creator" content="@rafaelmonteiro" />
        <meta name="twitter:title" content="Rafael Monteiro - Relacionamentos Conscientes" />
        <meta name="twitter:description" content="Livros que transformam seus relacionamentos. Série completa sobre desejo, ciúme e amor consciente." />
        <meta name="twitter:image" content="https://rafaelmonteiro-pi.vercel.app/images/twitter-image.jpg" />
        
        {/* SEO Meta Tags adicionais */}
        <meta name="author" content="Rafael Monteiro" />
        <meta name="publisher" content="Rafael Monteiro" />
        <meta name="keywords" content="Rafael Monteiro, terapeuta de relacionamentos, livros de relacionamento, O Desejo Não Morre, ciúme, dependência emocional, terapia de casal, relacionamentos conscientes" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        
        {/* Verificação de sites */}
        <meta name="google-site-verification" content="vPTQ9kB2K9m7Iah7dPjO5jZAXadvSaat0C5mF5Z0lmE" />
        <meta name="msvalidate.01" content="SEU_CODIGO_BING" />
        <meta name="facebook-domain-verification" content="SEU_CODIGO_FACEBOOK" />
        
        {/* Dados Estruturados (JSON-LD) - Schema.org */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Rafael Monteiro",
              "description": "Terapeuta de Relacionamentos e autor da série Jornada Relacionamentos Conscientes",
              "url": "https://rafaelmonteiro-pi.vercel.app",
              "sameAs": [
                "https://facebook.com/rafaelmonteiro",
                "https://instagram.com/rafaelmonteiro",
                "https://twitter.com/rafaelmonteiro"
              ],
              "knowsAbout": ["Relacionamentos", "Terapia de Casal", "Sexualidade", "Desenvolvimento Pessoal"],
              "worksFor": {
                "@type": "Organization",
                "name": "Jornada Relacionamentos Conscientes"
              }
            })
          }}
        />
        
        {/* Dados Estruturados para o site */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Rafael Monteiro - Terapeuta de Relacionamentos",
              "url": "https://rafaelmonteiro-pi.vercel.app",
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://rafaelmonteiro-pi.vercel.app/busca?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              },
              "description": "Série de livros sobre relacionamentos conscientes, desejo, ciúme e amor saudável."
            })
          }}
        />
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