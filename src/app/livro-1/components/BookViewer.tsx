'use client'

import { useEffect, useRef } from 'react'
import { Chapter } from '@/types'

interface BookViewerProps {
  chapter: Chapter
  fontSize: 'small' | 'medium' | 'large'
  isNarrating: boolean
  onNarrationEnd: () => void
}

export default function BookViewer({ 
  chapter, 
  fontSize, 
  isNarrating,
  onNarrationEnd 
}: BookViewerProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null)

  // Narração
  useEffect(() => {
    if (isNarrating) {
      const text = contentRef.current?.innerText
      if (text && window.speechSynthesis) {
        window.speechSynthesis.cancel()
        
        const speech = new SpeechSynthesisUtterance(text)
        speech.lang = 'pt-BR'
        speech.rate = 1.0
        speech.pitch = 1.0
        
        speech.onend = onNarrationEnd
        speech.onerror = onNarrationEnd
        
        window.speechSynthesis.speak(speech)
        speechRef.current = speech
      }
    } else {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel()
      }
    }

    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel()
      }
    }
  }, [isNarrating, chapter, onNarrationEnd])

  // Aplicar tamanho da fonte
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.fontSize = 
        fontSize === 'small' ? '1.1rem' :
        fontSize === 'medium' ? '1.25rem' : '1.4rem'
    }
  }, [fontSize])

  return (
    <div className={`book-container font-${fontSize}`}>
      <div 
        ref={contentRef}
        className="book-content"
        dangerouslySetInnerHTML={{ __html: chapter.content }}
      />
    </div>
  )
}