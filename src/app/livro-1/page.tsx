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

  // Salvar marcações quando mudar
  useEffect(() => {
    localStorage.setItem('bookmarkedChapters', JSON.stringify(bookmarkedChapters))
  }, [bookmarkedChapters])

  // Salvar tamanho da fonte
  useEffect(() => {
    localStorage.setItem('fontSize', fontSize)
  }, [fontSize])

  const handleBuyClick = (product: any) => {
    setSelectedProduct(product)
    if (!session) {
      setShowRegistrationModal(true)
    } else {
      // Usuário já logado, redirecionar para compra
      window.open(product.mpLink, '_blank')
    }
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

      {/* Cabeçalho do Livro */}
      <div className="container">
        <header>
          <h1>📘 {bookInfo.title}</h1>
          <p className="subtitle">{bookInfo.subtitle}</p>
          <p className="author">{bookInfo.author} • {bookInfo.authorTitle}</p>
        </header>

        {/* Controles */}
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
        />

        {/* Visualizador do Livro */}
        <BookViewer 
          chapter={chapters[currentChapter]}
          fontSize={fontSize}
          isNarrating={isNarrating}
          onNarrationEnd={() => setIsNarrating(false)}
        />

        {/* Navegação */}
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

        {/* Barra de Progresso */}
        <div className="progress-bar">
          <div 
            className="progress" 
            style={{ width: `${((currentChapter + 1) / chapters.length) * 100}%` }}
          ></div>
        </div>

        {/* Seção de Outros Livros */}
        <section className="other-books-section">
          <h2 className="section-title">Continue Sua Jornada</h2>
          <div className="books-grid">
            {/* Livro 2 */}
            <div className="book-card">
              <div className="book-card-header">
                <h3>Livro 2</h3>
              </div>
              <div className="book-card-body">
                <h4>Por Que Você Se Atrai Sempre Pelo Mesmo Tipo de Pessoa</h4>
                <ul>
                  <li><i className="fas fa-check"></i> Padrões inconscientes de atração</li>
                  <li><i className="fas fa-check"></i> Carência emocional e escolhas repetidas</li>
                  <li><i className="fas fa-check"></i> Como quebrar ciclos destrutivos</li>
                </ul>
                <div className="price">
                  <div className="old-price">R$ 47,90</div>
                  <div className="new-price">R$ 29,90</div>
                </div>
                <button 
                  className="buy-btn"
                  onClick={() => handleBuyClick({
                    id: 2,
                    title: 'Por Que Você Se Atrai Sempre Pelo Mesmo Tipo de Pessoa',
                    price: 29.90,
                    mpLink: 'https://www.mercadopago.com.br/book2'
                  })}
                >
                  Comprar Agora
                </button>
              </div>
            </div>

            {/* Livro 3 */}
            <div className="book-card">
              <div className="book-card-header">
                <h3>Livro 3</h3>
              </div>
              <div className="book-card-body">
                <h4>Ciúme, Insegurança e Medo de Perder</h4>
                <ul>
                  <li><i className="fas fa-check"></i> Origens emocionais do ciúme</li>
                  <li><i className="fas fa-check"></i> Como reconstruir segurança emocional</li>
                  <li><i className="fas fa-check"></i> Técnicas para lidar com a insegurança</li>
                </ul>
                <div className="price">
                  <div className="old-price">R$ 47,90</div>
                  <div className="new-price">R$ 29,90</div>
                </div>
                <button 
                  className="buy-btn"
                  onClick={() => handleBuyClick({
                    id: 3,
                    title: 'Ciúme, Insegurança e Medo de Perder',
                    price: 29.90,
                    mpLink: 'https://www.mercadopago.com.br/book3'
                  })}
                >
                  Comprar Agora
                </button>
              </div>
            </div>

            {/* Livro 4 */}
            <div className="book-card">
              <div className="book-card-header">
                <h3>Livro 4</h3>
              </div>
              <div className="book-card-body">
                <h4>Quando o Amor Vira Dependência</h4>
                <ul>
                  <li><i className="fas fa-check"></i> A linha entre amar e se anular</li>
                  <li><i className="fas fa-check"></i> Sinais de dependência emocional</li>
                  <li><i className="fas fa-check"></i> Recuperando sua autonomia</li>
                </ul>
                <div className="price">
                  <div className="old-price">R$ 47,90</div>
                  <div className="new-price">R$ 29,90</div>
                </div>
                <button 
                  className="buy-btn"
                  onClick={() => handleBuyClick({
                    id: 4,
                    title: 'Quando o Amor Vira Dependência',
                    price: 29.90,
                    mpLink: 'https://www.mercadopago.com.br/book4'
                  })}
                >
                  Comprar Agora
                </button>
              </div>
            </div>

            {/* Livro 5 */}
            <div className="book-card">
              <div className="book-card-header">
                <h3>Livro 5</h3>
              </div>
              <div className="book-card-body">
                <h4>Relacionamentos Conscientes</h4>
                <ul>
                  <li><i className="fas fa-check"></i> Como amar sem se perder</li>
                  <li><i className="fas fa-check"></i> Comunicação não violenta</li>
                  <li><i className="fas fa-check"></i> Limites saudáveis</li>
                </ul>
                <div className="price">
                  <div className="old-price">R$ 47,90</div>
                  <div className="new-price">R$ 29,90</div>
                </div>
                <button 
                  className="buy-btn"
                  onClick={() => handleBuyClick({
                    id: 5,
                    title: 'Relacionamentos Conscientes',
                    price: 29.90,
                    mpLink: 'https://www.mercadopago.com.br/book5'
                  })}
                >
                  Comprar Agora
                </button>
              </div>
            </div>
          </div>

          {/* Pacote Completo */}
          <div className="combo-section">
            <h3>Pacote Completo com Super Desconto</h3>
            <p>Adquira todos os 4 próximos livros com um desconto especial!</p>
            <div className="combo-price">R$ 89,90</div>
            <div className="combo-save">De R$ 191,60 • Economize R$ 101,70</div>
            <button 
              className="buy-btn special-price"
              onClick={() => handleBuyClick({
                id: 'combo',
                title: 'Pacote Completo',
                price: 89.90,
                mpLink: 'https://www.mercadopago.com.br/combo'
              })}
            >
              <i className="fas fa-gift"></i> Comprar Pacote Completo
            </button>
          </div>
        </section>
      </div>

      {/* Modais */}
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