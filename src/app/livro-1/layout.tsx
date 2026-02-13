import { ReactNode } from 'react'

export default function Livro1Layout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <>
      {/* Font Awesome - Carregar globalmente para a página do livro */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Crimson+Text:wght@400;600;700&family=Open+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      {children}
    </>
  )
}