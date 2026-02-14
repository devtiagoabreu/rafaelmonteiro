'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isFirstAccess, setIsFirstAccess] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [needsPasswordCreation, setNeedsPasswordCreation] = useState(false)

  const handleEmailBlur = async () => {
    if (!email) return
    
    try {
      const response = await fetch(`/api/check-user?email=${encodeURIComponent(email)}`)
      const data = await response.json()
      
      if (data.exists && data.hasPurchased) {
        // Usuário existe e tem compras
        if (!data.hasPassword) {
          // Não tem senha - primeiro acesso
          setIsFirstAccess(true)
          setNeedsPasswordCreation(true)
          setError('Primeiro acesso detectado. Clique em "Continuar" para criar sua senha.')
        } else {
          // Tem senha - login normal
          setIsFirstAccess(false)
          setNeedsPasswordCreation(false)
        }
      } else if (data.exists && !data.hasPurchased) {
        // Usuário existe mas não tem compras
        setError('Você ainda não possui nenhum produto. Adquira um livro primeiro!')
        setIsFirstAccess(false)
      } else {
        // Usuário não existe
        setError('Email não cadastrado. Primeiro faça uma compra!')
        setIsFirstAccess(false)
      }
    } catch (error) {
      console.error('Erro ao verificar email:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (needsPasswordCreation) {
        // Redirecionar para criar senha
        router.push(`/criar-senha?email=${encodeURIComponent(email)}`)
        return
      }

      // Tentar login normal
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false
      })

      if (result?.error) {
        setError('Email ou senha inválidos')
      } else {
        router.push('/dashboard')
      }
    } catch (error) {
      setError('Erro ao fazer login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Portal do Leitor
          </h2>
          <p className="text-gray-600">
            Acesse seus livros da Jornada Relacionamentos Conscientes
          </p>
        </div>

        {/* Mensagem de ajuda */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <p className="text-sm text-blue-700">
            <strong>💡 Primeiro acesso?</strong> Digite seu email e clique em "Continuar" para criar sua senha.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email cadastrado na compra
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={handleEmailBlur}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="seu@email.com"
              required
              disabled={loading}
            />
          </div>

          {/* Senha - só aparece se não for primeiro acesso ou se usuário escolher */}
          {(!needsPasswordCreation || !isFirstAccess) && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent pr-12"
                  placeholder="Sua senha"
                  disabled={loading || needsPasswordCreation}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-6 w-6" />
                  ) : (
                    <EyeIcon className="h-6 w-6" />
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Checkbox de primeiro acesso */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="firstAccess"
              checked={isFirstAccess}
              onChange={(e) => {
                setIsFirstAccess(e.target.checked)
                setNeedsPasswordCreation(e.target.checked)
                if (e.target.checked) {
                  setPassword('')
                }
              }}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="firstAccess" className="ml-2 block text-sm text-gray-700">
              Primeiro acesso (não tenho senha)
            </label>
          </div>

          {/* Aviso de senha em branco */}
          {isFirstAccess && (
            <div className="bg-green-50 border-l-4 border-green-500 p-3">
              <p className="text-sm text-green-700">
                ✓ Você será redirecionado para criar sua senha após confirmar.
              </p>
            </div>
          )}

          {/* Botão de submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-semibold disabled:opacity-50"
          >
            {loading ? 'Processando...' : needsPasswordCreation ? 'Criar senha' : 'Entrar'}
          </button>
        </form>

        {/* Links de ajuda */}
        <div className="mt-6 space-y-2 text-center">
          <Link href="/recuperar-senha" className="text-sm text-indigo-600 hover:underline block">
            Esqueceu sua senha?
          </Link>
          <p className="text-xs text-gray-500 mt-4">
            * Apenas clientes que já realizaram uma compra podem acessar o portal.
          </p>
        </div>
      </div>
    </div>
  )
}