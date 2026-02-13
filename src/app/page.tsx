'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'

export default function Home() {
  const { data: session } = useSession()

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container-custom py-4 flex justify-between items-center">
          <h1 className="font-serif text-2xl font-bold text-indigo-900">
            Jornada Relacionamentos Conscientes
          </h1>
          
          <div>
            {session ? (
              <Link href="/dashboard" className="btn-primary">
                Meu Dashboard
              </Link>
            ) : (
              <Link href="/login" className="btn-primary">
                Entrar
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white py-20">
        <div className="container-custom text-center">
          <h2 className="font-serif text-5xl font-bold mb-6">
            O Desejo Não Morre
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-4">
            Ele é mal cuidado
          </p>
          <p className="text-lg text-indigo-200">
            Rafael Monteiro • Terapeuta de Relacionamentos
          </p>
        </div>
      </section>

      {/* Livro 1 Grátis */}
      <section className="container-custom py-16">
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl p-8 text-center">
          <h3 className="text-3xl font-bold mb-4">Comece sua jornada agora!</h3>
          <p className="text-xl mb-6">O primeiro livro é COMPLETAMENTE GRÁTIS</p>
          <Link 
            href="/livro-1"
            className="bg-white text-emerald-700 px-8 py-4 rounded-xl text-lg font-bold hover:bg-emerald-50 transition inline-block"
          >
            Baixar Grátis
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container-custom text-center">
          <p>© 2024 Rafael Monteiro - Jornada Relacionamentos Conscientes</p>
        </div>
      </footer>
    </main>
  )
}