'use client'

import { useEffect, useRef } from 'react'
import { Chapter } from '@/types'
import './BookViewer.css'

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

  return (
    <div className={`book-container ${fontSize === 'small' ? 'font-small' : fontSize === 'medium' ? 'font-medium' : 'font-large'}`}>
      <div 
        ref={contentRef}
        className="book-content"
        dangerouslySetInnerHTML={{ __html: chapter.content }}
      />
    </div>
  )
}