// src/app/components/AccessibilityControls.tsx
'use client'

import { useState, useEffect } from 'react'

interface AccessibilityControlsProps {
  onThemeToggle: () => void
  onNarrate: () => void
  isNarrating: boolean
  currentTheme: 'dark' | 'light'
}

export default function AccessibilityControls({
  onThemeToggle,
  onNarrate,
  isNarrating,
  currentTheme
}: AccessibilityControlsProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="accessibility-controls">
      <button
        onClick={onThemeToggle}
        className="accessibility-btn"
        title={currentTheme === 'dark' ? 'Mudar para modo claro' : 'Mudar para modo escuro'}
      >
        <i className={`fas fa-${currentTheme === 'dark' ? 'sun' : 'moon'}`}></i>
        <span className="tooltip">
          {currentTheme === 'dark' ? 'Modo Claro' : 'Modo Escuro'}
        </span>
      </button>

      <button
        onClick={onNarrate}
        className="accessibility-btn"
        title={isNarrating ? 'Parar narração' : 'Narrar página'}
      >
        <i className={`fas fa-${isNarrating ? 'stop' : 'volume-up'}`}></i>
        <span className="tooltip">
          {isNarrating ? 'Parar Narração' : 'Narrar Página'}
        </span>
      </button>
    </div>
  )
}