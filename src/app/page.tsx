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
      // Logado: verifica se tem email antes de prosseguir
      const userEmail = session.user?.email
      if (!userEmail) {
        console.error('Email não encontrado na sessão')
        alert('Erro: email não encontrado. Tente fazer login novamente.')
        return
      }

      if (product.id === 1) {
        // Se for livro 1, vai direto para o livro
        window.location.href = '/livro-1'
      } else {
        // Se for pago, chama a função de criar pagamento
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
              
              <p className="text-xl text-gray-300 border-l-4 border-yellow-500 pl-4 py-2">
                Um guia direto, humano e terapêutico para reconstruir a intimidade no relacionamento
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={handleFreeBookClick}
                  className="bg-yellow-500 hover:bg-yellow-600 text-yellow-900 font-bold text-xl px-8 py-4 rounded-full shadow-2xl hover:shadow-3xl transition transform hover:scale-105 flex items-center justify-center gap-3"
                >
                  <span className="text-2xl">📘</span>
                  Baixar Grátis - Livro 1
                </button>
                
                <a 
                  href="#livros" 
                  className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white px-8 py-4 rounded-full transition font-semibold text-center"
                >
                  Conheça a Série Completa
                </a>
              </div>
              
              {/* Selos de Confiança */}
              <div className="flex flex-wrap gap-4 pt-6 text-sm text-gray-300">
                <span className="flex items-center gap-2">✓ Mais de 10.000 leitores</span>
                <span className="flex items-center gap-2">✓ Acesso vitalício</span>
                <span className="flex items-center gap-2">✓ Atualizações gratuitas</span>
              </div>
            </div>
            
            {/* Coluna da Direita - Imagem do Livro */}
            <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition duration-500">
              <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-700 flex items-center justify-center">
                <div className="text-center p-8">
                  <span className="text-9xl mb-4 block">📘</span>
                  <h3 className="text-4xl font-bold mb-2">O Desejo Não Morre</h3>
                  <p className="text-xl">Ele é mal cuidado</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO DE DOWNLOADS DO LIVRO 1 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              📥 Todos os Formatos Inclusos no Livro 1
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Leia, ouça e assista onde e quando quiser. O livro gratuito vem com TODOS estes formatos!
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
              <div key={index} className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl text-center shadow-lg hover:shadow-xl transition">
                <div className="text-5xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-lg">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
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
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              📚 Todos os Livros da Série Seguem o Mesmo Padrão
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ao adquirir qualquer livro, você terá acesso a múltiplos formatos para estudar do jeito que preferir
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Card Livro 1 (Grátis) */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-yellow-400 transform hover:scale-105 transition">
              <div className="bg-gradient-to-r from-yellow-500 to-amber-600 p-4 text-white text-center">
                <span className="bg-white text-yellow-700 px-3 py-1 rounded-full text-sm font-bold">GRÁTIS</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Livro 1</h3>
                <p className="text-gray-700 font-semibold mb-3">O Desejo Não Morre — Ele É Mal Cuidado</p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center gap-2 text-sm"><span className="text-green-500">✓</span> PDF + Audiobook + Podcast</li>
                  <li className="flex items-center gap-2 text-sm"><span className="text-green-500">✓</span> Videocast + Resumo + Infográfico</li>
                  <li className="flex items-center gap-2 text-sm"><span className="text-green-500">✓</span> Acesso vitalício</li>
                </ul>
                <button
                  onClick={handleFreeBookClick}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-yellow-900 font-bold py-3 rounded-lg transition"
                >
                  Baixar Grátis
                </button>
              </div>
            </div>
            
            {/* Card Livros 2-5 */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-indigo-400">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white text-center">
                <span className="bg-white text-indigo-700 px-3 py-1 rounded-full text-sm font-bold">Livros 2, 3, 4 e 5</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Toda a Jornada</h3>
                <p className="text-gray-700 mb-3">Todos os livros da série seguem o mesmo formato:</p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center gap-2 text-sm"><span className="text-green-500">✓</span> Ebook em PDF</li>
                  <li className="flex items-center gap-2 text-sm"><span className="text-green-500">✓</span> Audiobook completo</li>
                  <li className="flex items-center gap-2 text-sm"><span className="text-green-500">✓</span> Podcast com episódios exclusivos</li>
                  <li className="flex items-center gap-2 text-sm"><span className="text-green-500">✓</span> Material de apoio</li>
                </ul>
                <a 
                  href="#livros" 
                  className="w-full block text-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition"
                >
                  Conheça os Livros
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO DE LIVROS À VENDA */}
      <section id="livros" className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Continue Sua Jornada de Transformação
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Descubra os próximos livros da série que vão te ajudar a reconstruir relacionamentos mais saudáveis
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Livro 2 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition border border-gray-200">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white text-center">
                <h3 className="text-xl font-bold">Livro 2</h3>
              </div>
              <div className="p-6">
                <h4 className="font-bold text-lg mb-3">Por Que Você Se Atrai Sempre Pelo Mesmo Tipo de Pessoa</h4>
                <ul className="space-y-2 mb-4 text-sm">
                  <li className="flex items-start gap-2">✓ Padrões inconscientes de atração</li>
                  <li className="flex items-start gap-2">✓ Carência emocional e escolhas repetidas</li>
                  <li className="flex items-start gap-2">✓ Como quebrar ciclos destrutivos</li>
                  <li className="flex items-start gap-2">✓ Exercícios para autoconhecimento</li>
                </ul>
                <div className="text-center mb-4">
                  <span className="text-gray-400 line-through text-sm">R$ 47,90</span>
                  <div className="text-3xl font-bold text-indigo-600">R$ 9,90</div>
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">-79% OFF</span>
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
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition border border-gray-200">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white text-center">
                <h3 className="text-xl font-bold">Livro 3</h3>
              </div>
              <div className="p-6">
                <h4 className="font-bold text-lg mb-3">Ciúme, Insegurança e Medo de Perder</h4>
                <ul className="space-y-2 mb-4 text-sm">
                  <li className="flex items-start gap-2">✓ Origens emocionais do ciúme</li>
                  <li className="flex items-start gap-2">✓ Como reconstruir segurança emocional</li>
                  <li className="flex items-start gap-2">✓ Técnicas para lidar com a insegurança</li>
                  <li className="flex items-start gap-2">✓ Autoconfiança nos relacionamentos</li>
                </ul>
                <div className="text-center mb-4">
                  <span className="text-gray-400 line-through text-sm">R$ 47,90</span>
                  <div className="text-3xl font-bold text-indigo-600">R$ 9,90</div>
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">-79% OFF</span>
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
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition border border-gray-200">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white text-center">
                <h3 className="text-xl font-bold">Livro 4</h3>
              </div>
              <div className="p-6">
                <h4 className="font-bold text-lg mb-3">Quando o Amor Vira Dependência</h4>
                <ul className="space-y-2 mb-4 text-sm">
                  <li className="flex items-start gap-2">✓ A linha entre amar e se anular</li>
                  <li className="flex items-start gap-2">✓ Sinais de dependência emocional</li>
                  <li className="flex items-start gap-2">✓ Recuperando sua autonomia</li>
                  <li className="flex items-start gap-2">✓ Amor saudável vs. apego doentio</li>
                </ul>
                <div className="text-center mb-4">
                  <span className="text-gray-400 line-through text-sm">R$ 47,90</span>
                  <div className="text-3xl font-bold text-indigo-600">R$ 9,90</div>
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">-79% OFF</span>
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
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition border border-gray-200">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white text-center">
                <h3 className="text-xl font-bold">Livro 5</h3>
              </div>
              <div className="p-6">
                <h4 className="font-bold text-lg mb-3">Relacionamentos Conscientes</h4>
                <ul className="space-y-2 mb-4 text-sm">
                  <li className="flex items-start gap-2">✓ Como amar sem se perder</li>
                  <li className="flex items-start gap-2">✓ Comunicação não violenta</li>
                  <li className="flex items-start gap-2">✓ Limites saudáveis</li>
                  <li className="flex items-start gap-2">✓ Intimidade emocional madura</li>
                </ul>
                <div className="text-center mb-4">
                  <span className="text-gray-400 line-through text-sm">R$ 47,90</span>
                  <div className="text-3xl font-bold text-indigo-600">R$ 9,90</div>
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">-79% OFF</span>
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

          {/* COMBO EM DESTAQUE */}
          <div className="mt-12 bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-8 text-white text-center shadow-2xl">
            <h3 className="text-3xl font-bold mb-4">🎁 Pacote Completo com Super Desconto</h3>
            <p className="text-xl mb-6">Adquira todos os 4 livros e economize!</p>
            <div className="text-5xl font-bold mb-2">R$ 29,90</div>
            <p className="text-lg opacity-90 mb-6">De R$ 191,60 • Economize R$ 161,70</p>
            <button
              onClick={() => handleBuyClick({
                id: 6,
                title: 'Pacote Completo',
                price: 0.01
              })}
              className="bg-white text-green-700 hover:bg-green-50 px-12 py-4 rounded-full text-xl font-bold transition transform hover:scale-105 shadow-xl"
            >
              🔥 Comprar Pacote Completo
            </button>
          </div>
        </div>
      </section>

      {/* SEÇÃO DE GARANTIA */}
      <section className="py-12 bg-indigo-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl mb-3">🔒</div>
              <h3 className="font-bold text-lg">Compra Segura</h3>
              <p className="text-gray-600">Pagamento processado pelo Mercado Pago</p>
            </div>
            <div>
              <div className="text-4xl mb-3">📱</div>
              <h3 className="font-bold text-lg">Acesso Imediato</h3>
              <p className="text-gray-600">Após a confirmação, liberação automática</p>
            </div>
            <div>
              <div className="text-4xl mb-3">⭐</div>
              <h3 className="font-bold text-lg">Satisfação Garantida</h3>
              <p className="text-gray-600">Mais de 10.000 leitores satisfeitos</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold text-lg mb-4">Rafael Monteiro</h4>
              <p className="text-gray-400 text-sm">Terapeuta de Relacionamentos e Sexualidade</p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Links Rápidos</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#livros" className="hover:text-white transition">Livros</a></li>
                <li><Link href="/login" className="hover:text-white transition">Login</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition">Meu Painel</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Contato</h4>
              <ul className="space-y-2 text-gray-400">
                <li>rafaelmonteiroterapeuta@gmail.com</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Redes Sociais</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition text-2xl">📘</a>
                <a href="#" className="text-gray-400 hover:text-white transition text-2xl">📷</a>
                <a href="#" className="text-gray-400 hover:text-white transition text-2xl">🎵</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
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