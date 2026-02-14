'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'
import RegistrationModal from '@/app/livro-1/components/RegistrationModal'

export default function HomePage() {
  const { data: session } = useSession()
  const [showRegistrationModal, setShowRegistrationModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)

  const handleFreeBookClick = () => {
    // Livro 1 - grátis: sempre mostra modal de cadastro
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
      // Não logado: mostra modal de cadastro
      setSelectedProduct(product)
      setShowRegistrationModal(true)
    } else {
      // Logado: vai direto para o link de pagamento
      if (product.id === 1) {
        // Se for livro 1, vai direto para o livro
        window.location.href = '/livro-1'
      } else {
        // Se for pago, chama a função de criar pagamento
        criarPagamentoMercadoPago(product, session.user.email)
      }
    }
  }

  const criarPagamentoMercadoPago = async (product: any, userEmail: string) => {
    try {
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
      
      if (data.init_point) {
        window.location.href = data.init_point
      } else {
        alert('Erro ao criar pagamento. Tente novamente.')
      }
    } catch (error) {
      console.error('Erro ao criar pagamento:', error)
      alert('Erro ao conectar com Mercado Pago.')
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* HEADER */}
      <header className="bg-white shadow-lg sticky top-0 z-50 border-b-2 border-indigo-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-indigo-900">Rafael Monteiro</span>
              <span className="hidden sm:inline text-gray-400">|</span>
              <span className="hidden sm:inline text-gray-600">Terapeuta de Relacionamentos</span>
            </div>
            
            <div className="flex items-center space-x-4">
              {session ? (
                <Link 
                  href="/dashboard" 
                  className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition font-semibold shadow-md hover:shadow-lg"
                >
                  Meu Painel
                </Link>
              ) : (
                <Link 
                  href="/login" 
                  className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition font-semibold shadow-md hover:shadow-lg"
                >
                  Entrar
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block bg-yellow-500 text-yellow-900 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
                🔥 Lançamento - Livro 1 Grátis!
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                O Desejo Não Morre
              </h1>
              
              <p className="text-2xl md:text-3xl text-indigo-200 font-light">
                Ele É Mal Cuidado
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={handleFreeBookClick}
                  className="bg-yellow-500 hover:bg-yellow-600 text-yellow-900 font-bold text-xl px-8 py-4 rounded-full shadow-2xl hover:shadow-3xl transition transform hover:scale-105"
                >
                  📘 Baixar Grátis - Livro 1
                </button>
                
                <a 
                  href="#livros" 
                  className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white px-8 py-4 rounded-full transition font-semibold text-center"
                >
                  Conheça a Série
                </a>
              </div>
            </div>
            
            <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-indigo-500 to-purple-700 flex items-center justify-center">
              <div className="text-center p-8">
                <span className="text-9xl mb-4 block">📘</span>
                <h3 className="text-4xl font-bold mb-2">O Desejo Não Morre</h3>
                <p className="text-xl">Ele é mal cuidado</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO DE DOWNLOADS */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            📥 Todos os Formatos Inclusos no Livro 1
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: '📕', title: 'Ebook (PDF)' },
              { icon: '🎧', title: 'Audiobook' },
              { icon: '🎙️', title: 'Podcast' },
              { icon: '📺', title: 'Videocast' },
              { icon: '📄', title: 'Resumo (PDF)' },
              { icon: '📊', title: 'Infográfico' },
              { icon: '📽️', title: 'Apresentação' },
              { icon: '🎁', title: 'Bônus' }
            ].map((item, index) => (
              <div key={index} className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl text-center shadow-lg hover:shadow-xl transition">
                <div className="text-5xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-lg">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO DE LIVROS À VENDA */}
      <section id="livros" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Continue Sua Jornada
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Livro 2 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white text-center">
                <h3 className="text-xl font-bold">Livro 2</h3>
              </div>
              <div className="p-6">
                <h4 className="font-bold text-lg mb-3">Por Que Você Se Atrai Sempre Pelo Mesmo Tipo de Pessoa</h4>
                <div className="text-center mb-4">
                  <span className="text-gray-400 line-through text-sm">R$ 47,90</span>
                  <div className="text-3xl font-bold text-indigo-600">R$ 9,90</div>
                </div>
                <button
                  onClick={() => handleBuyClick({
                    id: 2,
                    title: 'Por Que Você Se Atrai Sempre Pelo Mesmo Tipo de Pessoa',
                    price: 9.90
                  })}
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-semibold"
                >
                  Comprar Agora
                </button>
              </div>
            </div>

            {/* Livro 3 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white text-center">
                <h3 className="text-xl font-bold">Livro 3</h3>
              </div>
              <div className="p-6">
                <h4 className="font-bold text-lg mb-3">Ciúme, Insegurança e Medo de Perder</h4>
                <div className="text-center mb-4">
                  <span className="text-gray-400 line-through text-sm">R$ 47,90</span>
                  <div className="text-3xl font-bold text-indigo-600">R$ 9,90</div>
                </div>
                <button
                  onClick={() => handleBuyClick({
                    id: 3,
                    title: 'Ciúme, Insegurança e Medo de Perder',
                    price: 9.90
                  })}
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-semibold"
                >
                  Comprar Agora
                </button>
              </div>
            </div>

            {/* Livro 4 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white text-center">
                <h3 className="text-xl font-bold">Livro 4</h3>
              </div>
              <div className="p-6">
                <h4 className="font-bold text-lg mb-3">Quando o Amor Vira Dependência</h4>
                <div className="text-center mb-4">
                  <span className="text-gray-400 line-through text-sm">R$ 47,90</span>
                  <div className="text-3xl font-bold text-indigo-600">R$ 9,90</div>
                </div>
                <button
                  onClick={() => handleBuyClick({
                    id: 4,
                    title: 'Quando o Amor Vira Dependência',
                    price: 9.90
                  })}
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-semibold"
                >
                  Comprar Agora
                </button>
              </div>
            </div>

            {/* Livro 5 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white text-center">
                <h3 className="text-xl font-bold">Livro 5</h3>
              </div>
              <div className="p-6">
                <h4 className="font-bold text-lg mb-3">Relacionamentos Conscientes</h4>
                <div className="text-center mb-4">
                  <span className="text-gray-400 line-through text-sm">R$ 47,90</span>
                  <div className="text-3xl font-bold text-indigo-600">R$ 9,90</div>
                </div>
                <button
                  onClick={() => handleBuyClick({
                    id: 5,
                    title: 'Relacionamentos Conscientes',
                    price: 9.90
                  })}
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-semibold"
                >
                  Comprar Agora
                </button>
              </div>
            </div>
          </div>

          {/* COMBO */}
          <div className="mt-12 bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-8 text-white text-center shadow-2xl">
            <h3 className="text-3xl font-bold mb-4">🎁 Pacote Completo</h3>
            <p className="text-xl mb-6">4 livros por apenas R$ 29,90</p>
            <div className="text-5xl font-bold mb-2">R$ 29,90</div>
            <p className="text-lg opacity-90 mb-6">De R$ 191,60 • Economize R$ 161,70</p>
            <button
              onClick={() => handleBuyClick({
                id: 'combo',
                title: 'Pacote Completo',
                price: 29.90
              })}
              className="bg-white text-green-700 hover:bg-green-50 px-12 py-4 rounded-full text-xl font-bold transition transform hover:scale-105 shadow-xl"
            >
              🔥 Comprar Pacote Completo
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>© 2026 Rafael Monteiro - Jornada Relacionamentos Conscientes</p>
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