import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'
import Link from 'next/link'

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
        }
      }
    }
  })

  const purchasedProducts = user?.products
    .filter(up => up.paymentStatus === 'paid')
    .map(up => up.product) || []

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-lg">
        <div className="container-custom py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-900">Meus Livros</h1>
          <div className="flex items-center gap-4">
            <span>Olá, {user?.fullName}</span>
            <Link href="/api/auth/signout" className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
              Sair
            </Link>
          </div>
        </div>
      </header>

      <main className="container-custom py-8">
        {purchasedProducts.length === 0 ? (
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6">
            <p>Você ainda não possui livros. Após a confirmação do pagamento, eles aparecerão aqui.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {purchasedProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4">{product.title}</h3>
                <Link 
                  href={`/livro-${product.bookNumber}`}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 inline-block"
                >
                  Acessar Livro
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}