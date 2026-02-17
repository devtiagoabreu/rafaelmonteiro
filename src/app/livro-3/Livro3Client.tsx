//src/app/livro-3/Livro3Client.tsx
'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import BookViewer from './components/BookViewer'
import BookControls from './components/BookControls'
import DownloadMenu from './components/DownloadMenu'
import ShareModal from './components/ShareModal'
import BookmarksModal from './components/BookmarksModal'
import { chapters, bookInfo } from '@/data/livro-3'
import './livro-3.css'

export default function Livro3Client() {
  const { data: session } = useSession()
  const [currentChapter, setCurrentChapter] = useState(0)
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium')
  const [isNarrating, setIsNarrating] = useState(false)
  const [bookmarkedChapters, setBookmarkedChapters] = useState<number[]>([])
  const [showShareModal, setShowShareModal] = useState(false)
  const [showBookmarksModal, setShowBookmarksModal] = useState(false)

  useEffect(() => {
    const savedBookmarks = localStorage.getItem('bookmarkedChapters-livro3')
    if (savedBookmarks) {
      setBookmarkedChapters(JSON.parse(savedBookmarks))
    }
    
    const savedFontSize = localStorage.getItem('fontSize') as 'small' | 'medium' | 'large' | null
    if (savedFontSize) {
      setFontSize(savedFontSize)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('bookmarkedChapters-livro3', JSON.stringify(bookmarkedChapters))
  }, [bookmarkedChapters])

  useEffect(() => {
    localStorage.setItem('fontSize', fontSize)
  }, [fontSize])

  const handleShowToc = () => {
    setCurrentChapter(1) // Primeiro capítulo
  }

  return (
    <div className="livro-3-page">
      {/* Menu Superior */}
      <div className="top-menu">
        <div className="top-menu-left">
          <a href="/" className="logo">
            <i className="fas fa-book"></i>
            <span>Livro 3</span>
          </a>
          
          <div className="page-nav-top">
            <button 
              className="nav-top-btn" 
              onClick={() => setCurrentChapter(prev => Math.max(0, prev - 1))}
              disabled={currentChapter === 0}
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <button 
              className="nav-top-btn" 
              onClick={() => setCurrentChapter(prev => Math.min(chapters.length - 1, prev + 1))}
              disabled={currentChapter === chapters.length - 1}
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
          
          <DownloadMenu />
          
          <button 
            className="menu-btn" 
            onClick={() => setShowBookmarksModal(true)}
          >
            <i className="fas fa-bookmark"></i>
            <span>Páginas Marcadas</span>
          </button>
          
          <button 
            className="menu-btn" 
            onClick={() => setShowShareModal(true)}
          >
            <i className="fas fa-share-alt"></i>
            <span>Compartilhar</span>
          </button>
        </div>
        
        <div className="top-menu-right">
          {session && (
            <a href="/dashboard" className="menu-btn">
              <i className="fas fa-user"></i>
              <span>Meu Painel</span>
            </a>
          )}
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="container" id="mainContent">
        <header>
          <h1>📘 {bookInfo.title}</h1>
          <p className="subtitle">{bookInfo.subtitle}</p>
          <p className="author">{bookInfo.author} • {bookInfo.authorTitle}</p>
        </header>

        <BookControls 
          currentChapter={currentChapter}
          totalChapters={chapters.length}
          fontSize={fontSize}
          onPrevChapter={() => setCurrentChapter(prev => Math.max(0, prev - 1))}
          onNextChapter={() => setCurrentChapter(prev => Math.min(chapters.length - 1, prev + 1))}
          onFontIncrease={() => {
            if (fontSize === 'small') setFontSize('medium')
            else if (fontSize === 'medium') setFontSize('large')
          }}
          onFontDecrease={() => {
            if (fontSize === 'large') setFontSize('medium')
            else if (fontSize === 'medium') setFontSize('small')
          }}
          onToggleNarration={() => setIsNarrating(!isNarrating)}
          isNarrating={isNarrating}
          onToggleBookmark={() => {
            if (bookmarkedChapters.includes(currentChapter)) {
              setBookmarkedChapters(bookmarkedChapters.filter(c => c !== currentChapter))
            } else {
              setBookmarkedChapters([...bookmarkedChapters, currentChapter])
            }
          }}
          isBookmarked={bookmarkedChapters.includes(currentChapter)}
          onShowToc={handleShowToc}
        />

        <BookViewer 
          chapter={chapters[currentChapter]}
          fontSize={fontSize}
          isNarrating={isNarrating}
          onNarrationEnd={() => setIsNarrating(false)}
        />

        <div className="navigation">
          <button 
            className="nav-btn" 
            onClick={() => setCurrentChapter(prev => Math.max(0, prev - 1))}
            disabled={currentChapter === 0}
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          
          <div className="page-counter">
            <span>{currentChapter + 1}</span> de <span>{chapters.length}</span>
          </div>
          
          <button 
            className="nav-btn" 
            onClick={() => setCurrentChapter(prev => Math.min(chapters.length - 1, prev + 1))}
            disabled={currentChapter === chapters.length - 1}
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>

        <div className="progress-bar">
          <div 
            className="progress" 
            style={{ width: `${((currentChapter + 1) / chapters.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <ShareModal 
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        bookTitle={bookInfo.title}
      />

      <BookmarksModal
        isOpen={showBookmarksModal}
        onClose={() => setShowBookmarksModal(false)}
        bookmarks={bookmarkedChapters}
        chapters={chapters}
        onSelectChapter={(index) => {
          setCurrentChapter(index)
          setShowBookmarksModal(false)
        }}
      />

      {/* Indicador de narração */}
      {isNarrating && (
        <div className="narration-indicator">
          <i className="fas fa-volume-up"></i>
          <span>Narração em andamento...</span>
          <button id="stopNarration" onClick={() => setIsNarrating(false)}>
            <i className="fas fa-stop"></i>
          </button>
        </div>
      )}
    </div>
  )
}