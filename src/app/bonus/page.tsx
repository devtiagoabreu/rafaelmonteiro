'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeftIcon, GiftIcon, DocumentTextIcon, VideoCameraIcon, MicrophoneIcon } from '@heroicons/react/24/outline'

export default function BonusPage() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center">
        <div className="text-white text-2xl">Carregando...</div>
      </div>
    )
  }

  if (!session) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container-custom py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
              <ArrowLeftIcon className="h-5 w-5" />
            </Link>
            <h1 className="text-2xl font-bold text-indigo-900">Área de Bônus</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-600 hidden sm:block">Olá, {session.user?.name}</span>
            <Link href="/api/auth/signout" className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition text-sm sm:text-base">
              Sair
            </Link>
          </div>
        </div>
      </header>

      <main className="container-custom py-8">
        {/* Banner de boas-vindas */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-8 text-white mb-8">
          <div className="flex items-center gap-4 mb-4">
            <GiftIcon className="h-12 w-12" />
            <h2 className="text-3xl font-bold">Bônus Exclusivos</h2>
          </div>
          <p className="text-purple-100 text-lg max-w-2xl">
            Conteúdos especiais preparados para complementar sua jornada de transformação nos relacionamentos.
          </p>
        </div>

        {/* Grid de Bônus */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Bônus 1 - Em breve */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
            <div className="bg-purple-100 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
              <DocumentTextIcon className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Guia de Exercícios</h3>
            <p className="text-gray-600 mb-4">
              Exercícios práticos para aplicar os conceitos dos livros no dia a dia.
            </p>
            <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm inline-block">
              Em breve
            </div>
          </div>

          {/* Bônus 2 - Em breve */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
            <div className="bg-purple-100 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
              <VideoCameraIcon className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Entrevistas Exclusivas</h3>
            <p className="text-gray-600 mb-4">
              Conversas com especialistas sobre relacionamentos e sexualidade.
            </p>
            <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm inline-block">
              Em breve
            </div>
          </div>

          {/* Bônus 3 - Em breve */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
            <div className="bg-purple-100 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
              <MicrophoneIcon className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Meditações Guiadas</h3>
            <p className="text-gray-600 mb-4">
              Áudios para aprofundar sua conexão emocional e autoconsciência.
            </p>
            <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm inline-block">
              Em breve
            </div>
          </div>
        </div>

        {/* Mensagem de em breve */}
        <div className="mt-12 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
          <h3 className="text-xl font-bold text-blue-800 mb-2">🚀 Novidades chegando!</h3>
          <p className="text-blue-700">
            Estamos preparando conteúdos especiais para você. Fique de olho, em breve esta área será atualizada com materiais exclusivos!
          </p>
        </div>

        {/* Link de volta ao dashboard */}
        <div className="mt-8 text-center">
          <Link 
            href="/dashboard" 
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-semibold"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Voltar para o Dashboard
          </Link>
        </div>
      </main>
    </div>
  )
}