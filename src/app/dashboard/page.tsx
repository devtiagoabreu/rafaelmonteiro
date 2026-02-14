import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'
import Link from 'next/link'
import { BookOpenIcon, GiftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user?.email as string },
    include: {
      products: {
        include: {
          product: true
        },
        orderBy: {
          purchasedAt: 'desc'
        }
      }
    }
  })

  if (!user) {
    redirect('/login')
  }

  // Filtrar apenas produtos pagos
  const purchasedProducts = user.products
    .filter(up => up.paymentStatus === 'paid')
    .map(up => up.product)

  // Verificar se há produtos pendentes
  const pendingProducts = user.products.filter(up => up.paymentStatus === 'pending')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container-custom py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-indigo-900">Meus Livros</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-600 hidden sm:block">Olá, {user.fullName}</span>
            <Link href="/api/auth/signout" className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition text-sm sm:text-base">
              Sair
            </Link>
          </div>
        </div>
      </header>

      <main className="container-custom py-8">
        {/* Aviso de pagamentos pendentes */}
        {pendingProducts.length > 0 && (
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6 rounded-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  Você tem {pendingProducts.length} pagamento(s) pendente(s). 
                  Assim que o pagamento for confirmado, seus livros aparecerão aqui.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Seção de Acesso Rápido - Links Importantes */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Acesso Rápido</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Card do Livro 1 - Sempre disponível */}
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
              <div className="p-6 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <BookOpenIcon className="h-8 w-8" />
                  <h3 className="text-xl font-bold">Livro 1 - Gratuito</h3>
                </div>
                <p className="text-emerald-100 mb-4">
                  O Desejo Não Morre — Ele É Mal Cuidado
                </p>
                <Link 
                  href="/livro-1"
                  className="inline-flex items-center gap-2 bg-white text-emerald-700 px-4 py-2 rounded-lg font-semibold hover:bg-emerald-50 transition"
                >
                  Acessar Agora
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Card de Bônus */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
              <div className="p-6 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <GiftIcon className="h-8 w-8" />
                  <h3 className="text-xl font-bold">Área de Bônus</h3>
                </div>
                <p className="text-purple-100 mb-4">
                  Conteúdos exclusivos e materiais complementares
                </p>
                <Link 
                  href="/bonus"
                  className="inline-flex items-center gap-2 bg-white text-purple-700 px-4 py-2 rounded-lg font-semibold hover:bg-purple-50 transition"
                >
                  Acessar Bônus
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Seção de Livros Comprados */}
        {purchasedProducts.length > 0 ? (
          <>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Sua Coleção</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {purchasedProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
                  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white">
                    <h3 className="text-xl font-bold">Livro {product.bookNumber}</h3>
                  </div>
                  <div className="p-6">
                    <h4 className="text-lg font-semibold mb-4">{product.title}</h4>
                    <Link 
                      href={`/livro-${product.bookNumber}`}
                      className="block w-full bg-indigo-600 text-white text-center px-4 py-3 rounded-lg hover:bg-indigo-700 transition font-semibold"
                    >
                      Acessar Livro
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center mt-8">
            <div className="text-6xl mb-4">📚</div>
            <h2 className="text-2xl font-bold mb-4">Você ainda não tem livros</h2>
            <p className="text-gray-600 mb-6">
              Após a confirmação do pagamento, seus livros aparecerão aqui.
            </p>
            <Link 
              href="/#livros" 
              className="btn-primary inline-block"
            >
              Ver Livros Disponíveis
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}