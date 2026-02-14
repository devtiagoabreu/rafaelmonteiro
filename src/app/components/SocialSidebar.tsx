'use client'

import { useEffect, useState } from 'react'

export default function SocialSidebar() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      // Esconder quando rolar muito para baixo (opcional)
      const scrollPosition = window.scrollY
      setIsVisible(scrollPosition < document.body.scrollHeight - 1000)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isVisible) return null

  return (
    <div className="social-sidebar">
      <a 
        href="https://facebook.com" 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="Facebook"
      >
        <i className="fab fa-facebook-f"></i>
      </a>
      <a 
        href="https://instagram.com" 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="Instagram"
      >
        <i className="fab fa-instagram"></i>
      </a>
      <a 
        href="https://tiktok.com" 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="TikTok"
      >
        <i className="fab fa-tiktok"></i>
      </a>
    </div>
  )
}