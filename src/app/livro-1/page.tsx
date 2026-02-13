'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import BookViewer from './components/BookViewer'
import BookControls from './components/BookControls'
import DownloadMenu from './components/DownloadMenu'
import ShareModal from './components/ShareModal'
import BookmarksModal from './components/BookmarksModal'
import RegistrationModal from './components/RegistrationModal'
import { chapters, bookInfo } from '@/data/livro-1'
import '@/app/globals.css'
import './components/BookViewer.css'

export default function Livro1Page() {
  const { data: session } = useSession()
  const [currentChapter, setCurrentChapter] = useState(0)
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium')
  const [isNarrating, setIsNarrating] = useState(false)
  const [bookmarkedChapters, setBookmarkedChapters] = useState<number[]>([])
  const [showShareModal, setShowShareModal] = useState(false)
  const [showBookmarksModal, setShowBookmarksModal] = useState(false)
  const [showRegistrationModal, setShowRegistrationModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)

  // Carregar preferências salvas
  useEffect(() => {
    const savedBookmarks = localStorage.getItem('bookmarkedChapters')
    if (savedBookmarks) {
      setBookmarkedChapters(JSON.parse(savedBookmarks))
    }
    
    const savedFontSize = localStorage.getItem('fontSize') as 'small' | 'medium' | 'large'
    if (savedFontSize) {
      setFontSize(savedFontSize)
    }
  }, [])

  // Salvar preferências quando mudar
  useEffect(() => {
    localStorage.setItem('bookmarkedChapters', JSON.stringify(bookmarkedChapters))
  }, [bookmarkedChapters])

  useEffect(() => {
    localStorage.setItem('fontSize', fontSize)
  }, [fontSize])

  const handleBuyClick = (product: any) => {
    setSelectedProduct(product)
    if (!session) {
      setShowRegistrationModal(true)
    } else {
      window.open(product.mpLink, '_blank')
    }
  }

  const handleShowToc = () => {
    setCurrentChapter(3) // Índice do sumário
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Menu Superior */}
      <div className="top-menu">
        <div className="top-menu-left">
          <a href="/" className="logo">
            <i className="fas fa-book"></i>
            <span>O Desejo Não Morre</span>
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
          <a href="/#livros" className="menu-btn">
            <i className="fas fa-shopping-cart"></i>
            <span>Outros Livros</span>
          </a>
          {session ? (
            <a href="/dashboard" className="menu-btn">
              <i className="fas fa-user"></i>
              <span>Meu Painel</span>
            </a>
          ) : (
            <a href="/login" className="menu-btn">
              <i className="fas fa-sign-in-alt"></i>
              <span>Entrar</span>
            </a>
          )}
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="container">
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

      <RegistrationModal
        isOpen={showRegistrationModal}
        onClose={() => setShowRegistrationModal(false)}
        selectedProduct={selectedProduct}
      />
    </div>
  )
}