'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'
import RegistrationModal from '@/app/livro-1/components/RegistrationModal'
import SocialSidebar from './components/SocialSidebar'
import WhatsAppFloat from './components/WhatsAppFloat'
import FaqSection from './components/FaqSection'
import './landing.css'

export default function HomePage() {
  const { data: session } = useSession()
  const [showRegistrationModal, setShowRegistrationModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)

  const handleFreeBookClick = () => {
    setSelectedProduct({
      id: 1,
      title: 'O Desejo Não Morre — Ele É Mal Cuidado',
      price: 0,
      isFree: true
    })
    setShowRegistrationModal(true)
  }

  const handleBuyClick = (product: any) => {
    if (!session) {
      setSelectedProduct(product)
      setShowRegistrationModal(true)
    } else {
      const userEmail = session.user?.email
      if (!userEmail) {
        console.error('Email não encontrado na sessão')
        alert('Erro: email não encontrado. Tente fazer login novamente.')
        return
      }

      if (product.id === 1) {
        window.location.href = '/livro-1'
      } else {
        criarPagamentoMercadoPago(product, userEmail)
      }
    }
  }

  const criarPagamentoMercadoPago = async (product: any, userEmail: string) => {
    try {
      console.log('🔄 Criando preferência de pagamento...')
      
      const response = await fetch('/api/criar-preferencia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id.toString(),
          userEmail: userEmail,
          productTitle: product.title,
          productPrice: product.price
        })
      })
      
      const data = await response.json()
      console.log('✅ Preferência criada:', data)
      
      if (data.init_point) {
        window.location.href = data.init_point
      } else {
        alert('Erro ao criar pagamento. Tente novamente.')
      }
    } catch (error) {
      console.error('❌ Erro ao criar pagamento:', error)
      alert('Erro ao conectar com Mercado Pago. Tente novamente.')
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Redes Sociais Laterais */}
      <SocialSidebar />
      
      {/* WhatsApp Flutuante */}
      <WhatsAppFloat phoneNumber="5519994559836" />

      {/* HEADER */}
      <header className="landing-header">
        <div className="container">
          <div className="logo-area">
            <span className="name">Rafael Monteiro</span>
            <span className="separator">|</span>
            <span className="title">Terapeuta de Relacionamentos</span>
          </div>
          
          <div className="flex items-center space-x-4">
            {session ? (
              <Link 
                href="/dashboard" 
                className="header-btn"
              >
                Meu Painel
              </Link>
            ) : (
              <Link 
                href="/login" 
                className="header-btn"
              >
                Entrar
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="landing-hero">
        <div className="container">
          <div className="hero-content">
            <div className="badge">
              🔥 Lançamento - Livro 1 Grátis!
            </div>
            
            <h1>O Desejo Não Morre</h1>
            
            <p className="subtitle">Ele É Mal Cuidado</p>
            
            <p className="description">
              Um guia direto, humano e terapêutico para reconstruir a intimidade no relacionamento
            </p>
            
            <div className="cta-buttons">
              <button
                onClick={handleFreeBookClick}
                className="btn-primary"
              >
                <span>📘</span>
                Baixar Grátis - Livro 1
              </button>
              
              <a 
                href="#livros" 
                className="btn-secondary"
              >
                Conheça a Série Completa
              </a>
            </div>
            
            <div className="trust-badges">
              <span>✓ Mais de 10.000 leitores</span>
              <span>✓ Acesso vitalício</span>
              <span>✓ Atualizações gratuitas</span>
            </div>
          </div>
          
          <div className="hero-image">
            <div className="image-placeholder">
              <span className="book-icon">📘</span>
              <h3>O Desejo Não Morre</h3>
              <p>Ele é mal cuidado</p>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO DE DOWNLOADS DO LIVRO 1 */}
      <section className="formats-section">
        <div className="container">
          <h2>📥 Todos os Formatos Inclusos no Livro 1</h2>
          <p className="section-description">
            Leia, ouça e assista onde e quando quiser. O livro gratuito vem com TODOS estes formatos!
          </p>
          
          <div className="formats-grid">
            {[
              { icon: '📕', title: 'Ebook (PDF)', desc: 'Leia em qualquer dispositivo' },
              { icon: '🎧', title: 'Audiobook', desc: 'Ouça onde estiver' },
              { icon: '🎙️', title: 'Podcast', desc: 'Episódios exclusivos' },
              { icon: '📺', title: 'Videocast', desc: 'Conteúdo em vídeo' },
              { icon: '📄', title: 'Resumo (PDF)', desc: 'Para revisão rápida' },
              { icon: '📊', title: 'Infográfico', desc: 'Mapas mentais' },
              { icon: '📽️', title: 'Apresentação', desc: 'Slides para estudo' },
              { icon: '🎁', title: 'Bônus', desc: 'Materiais extras' }
            ].map((item, index) => (
              <div key={index} className="landing-download-card">
                <div className="icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button
              onClick={handleFreeBookClick}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xl px-12 py-4 rounded-full shadow-2xl hover:shadow-3xl transition transform hover:scale-105"
            >
              🔥 Quero meu livro grátis agora!
            </button>
            <p className="text-sm text-gray-500 mt-4">* Acesso imediato após cadastro</p>
          </div>
        </div>
      </section>

      {/* SEÇÃO "TODOS OS LIVROS SEGUEM O MESMO PADRÃO" */}
      <section className="comparison-section">
        <div className="container">
          <h2>📚 Todos os Livros da Série Seguem o Mesmo Padrão</h2>
          <p className="section-description">
            Ao adquirir qualquer livro, você terá acesso a múltiplos formatos para estudar do jeito que preferir
          </p>
          
          <div className="comparison-grid">
            <div className="comparison-card free-card">
              <div className="card-header">
                <span>GRÁTIS</span>
              </div>
              <div className="card-body">
                <h3>Livro 1</h3>
                <p>O Desejo Não Morre — Ele É Mal Cuidado</p>
                <ul>
                  <li><span>✓</span> PDF + Audiobook + Podcast</li>
                  <li><span>✓</span> Videocast + Resumo + Infográfico</li>
                  <li><span>✓</span> Acesso vitalício</li>
                </ul>
                <button
                  onClick={handleFreeBookClick}
                  className="card-btn"
                >
                  Baixar Grátis
                </button>
              </div>
            </div>
            
            <div className="comparison-card paid-card">
              <div className="card-header">
                <span>Livros 2, 3, 4 e 5</span>
              </div>
              <div className="card-body">
                <h3>Toda a Jornada</h3>
                <p>Todos os livros da série seguem o mesmo formato:</p>
                <ul>
                  <li><span>✓</span> Ebook em PDF</li>
                  <li><span>✓</span> Audiobook completo</li>
                  <li><span>✓</span> Podcast com episódios exclusivos</li>
                  <li><span>✓</span> Material de apoio</li>
                </ul>
                <a 
                  href="#livros" 
                  className="card-btn"
                >
                  Conheça os Livros
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO DE LIVROS À VENDA */}
      <section id="livros" className="books-section">
        <div className="container">
          <h2>Continue Sua Jornada de Transformação</h2>
          <p className="section-description">
            Descubra os próximos livros da série que vão te ajudar a reconstruir relacionamentos mais saudáveis
          </p>

          <div className="books-grid">
            {/* Livro 2 */}
            <div className="landing-book-card">
              <div className="card-header">
                <h3>Livro 2</h3>
              </div>
              <div className="card-body">
                <h4>Por Que Você Se Atrai Sempre Pelo Mesmo Tipo de Pessoa</h4>
                <ul>
                  <li><i className="fas fa-check"></i> Padrões inconscientes de atração</li>
                  <li><i className="fas fa-check"></i> Carência emocional e escolhas repetidas</li>
                  <li><i className="fas fa-check"></i> Como quebrar ciclos destrutivos</li>
                  <li><i className="fas fa-check"></i> Exercícios para autoconhecimento</li>
                </ul>
                <div className="price">
                  <span className="old-price">R$ 47,90</span>
                  <div className="new-price">R$ 9,90</div>
                  <span className="discount-badge">79% OFF</span>
                </div>
                <button
                  onClick={() => handleBuyClick({
                    id: 2,
                    title: 'Por Que Você Se Atrai Sempre Pelo Mesmo Tipo de Pessoa',
                    price: 9.90
                  })}
                  className="buy-btn"
                >
                  Comprar Agora
                </button>
              </div>
            </div>

            {/* Livro 3 */}
            <div className="landing-book-card">
              <div className="card-header">
                <h3>Livro 3</h3>
              </div>
              <div className="card-body">
                <h4>Ciúme, Insegurança e Medo de Perder</h4>
                <ul>
                  <li><i className="fas fa-check"></i> Origens emocionais do ciúme</li>
                  <li><i className="fas fa-check"></i> Como reconstruir segurança emocional</li>
                  <li><i className="fas fa-check"></i> Técnicas para lidar com a insegurança</li>
                  <li><i className="fas fa-check"></i> Autoconfiança nos relacionamentos</li>
                </ul>
                <div className="price">
                  <span className="old-price">R$ 47,90</span>
                  <div className="new-price">R$ 9,90</div>
                  <span className="discount-badge">79% OFF</span>
                </div>
                <button
                  onClick={() => handleBuyClick({
                    id: 3,
                    title: 'Ciúme, Insegurança e Medo de Perder',
                    price: 9.90
                  })}
                  className="buy-btn"
                >
                  Comprar Agora
                </button>
              </div>
            </div>

            {/* Livro 4 */}
            <div className="landing-book-card">
              <div className="card-header">
                <h3>Livro 4</h3>
              </div>
              <div className="card-body">
                <h4>Quando o Amor Vira Dependência</h4>
                <ul>
                  <li><i className="fas fa-check"></i> A linha entre amar e se anular</li>
                  <li><i className="fas fa-check"></i> Sinais de dependência emocional</li>
                  <li><i className="fas fa-check"></i> Recuperando sua autonomia</li>
                  <li><i className="fas fa-check"></i> Amor saudável vs. apego doentio</li>
                </ul>
                <div className="price">
                  <span className="old-price">R$ 47,90</span>
                  <div className="new-price">R$ 9,90</div>
                  <span className="discount-badge">79% OFF</span>
                </div>
                <button
                  onClick={() => handleBuyClick({
                    id: 4,
                    title: 'Quando o Amor Vira Dependência',
                    price: 9.90
                  })}
                  className="buy-btn"
                >
                  Comprar Agora
                </button>
              </div>
            </div>

            {/* Livro 5 */}
            <div className="landing-book-card">
              <div className="card-header">
                <h3>Livro 5</h3>
              </div>
              <div className="card-body">
                <h4>Relacionamentos Conscientes</h4>
                <ul>
                  <li><i className="fas fa-check"></i> Como amar sem se perder</li>
                  <li><i className="fas fa-check"></i> Comunicação não violenta</li>
                  <li><i className="fas fa-check"></i> Limites saudáveis</li>
                  <li><i className="fas fa-check"></i> Intimidade emocional madura</li>
                </ul>
                <div className="price">
                  <span className="old-price">R$ 47,90</span>
                  <div className="new-price">R$ 9,90</div>
                  <span className="discount-badge">79% OFF</span>
                </div>
                <button
                  onClick={() => handleBuyClick({
                    id: 5,
                    title: 'Relacionamentos Conscientes',
                    price: 9.90
                  })}
                  className="buy-btn"
                >
                  Comprar Agora
                </button>
              </div>
            </div>
          </div>

          {/* COMBO EM DESTAQUE */}
          <div className="combo-highlight">
            <h3>🎁 Pacote Completo com Super Desconto</h3>
            <p>Adquira todos os 4 livros e economize!</p>
            <div className="price">R$ 29,90</div>
            <p className="save"><s>De R$ 191,60</s> • Economize R$ 161,70</p>
            <button
              onClick={() => handleBuyClick({
                id: 6,
                title: 'Pacote Completo',
                price: 29.90
              })}
              className="combo-btn"
            >
              🔥 Comprar Pacote Completo
            </button>
          </div>
        </div>
      </section>

      {/* SEÇÃO DE PERGUNTAS FREQUENTES */}
      <FaqSection />

      {/* SEÇÃO DE GARANTIA */}
      <section className="py-12 bg-indigo-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="guarantee-section">
            <div className="guarantee-item">
              <div className="icon">🔒</div>
              <h3>Compra Segura</h3>
              <p>Pagamento processado pelo Mercado Pago</p>
            </div>
            <div className="guarantee-item">
              <div className="icon">📱</div>
              <h3>Acesso Imediato</h3>
              <p>Após a confirmação, liberação automática</p>
            </div>
            <div className="guarantee-item">
              <div className="icon">⭐</div>
              <h3>Satisfação Garantida</h3>
              <p>Mais de 10.000 leitores satisfeitos</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="landing-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-section">
              <h4>Rafael Monteiro</h4>
              <p>Terapeuta de Relacionamentos e Sexualidade</p>
            </div>
            <div className="footer-section">
              <h4>Links Rápidos</h4>
              <ul>
                <li><a href="#livros">Livros</a></li>
                <li><Link href="/login">Login</Link></li>
                <li><Link href="/dashboard">Meu Painel</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Contato</h4>
              <ul>
                <li>rafaelmonteiroterapeuta@gmail.com</li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Redes Sociais</h4>
              <div className="social-links">
                <a href="#">📘</a>
                <a href="#">📷</a>
                <a href="#">🎵</a>
              </div>
            </div>
          </div>
          <div className="copyright">
            © 2026 Rafael Monteiro - Jornada Relacionamentos Conscientes. Todos os direitos reservados.
          </div>
        </div>
      </footer>

      {/* MODAL */}
      <RegistrationModal
        isOpen={showRegistrationModal}
        onClose={() => setShowRegistrationModal(false)}
        selectedProduct={selectedProduct}
      />
    </main>
  )
}