'use client'

import { useState, useEffect } from 'react'

interface WhatsAppFloatProps {
  phoneNumber: string
  message?: string
}

export default function WhatsAppFloat({ phoneNumber, message = 'Olá! Vim do site e gostaria de mais informações.' }: WhatsAppFloatProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = () => {
    const formattedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${formattedMessage}`
    window.open(whatsappUrl, '_blank')
  }

  if (!isVisible) return null

  return (
    <div className="whatsapp-float">
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault()
          handleClick()
        }}
        aria-label="WhatsApp"
      >
        <i className="fab fa-whatsapp"></i>
      </a>
    </div>
  )
}