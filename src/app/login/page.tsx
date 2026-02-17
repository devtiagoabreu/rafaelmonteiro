'use client'

import { useState, useEffect } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const emailFromUrl = searchParams.get('email') || ''
  const [email, setEmail] = useState(emailFromUrl)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isFirstAccess, setIsFirstAccess] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [needsPasswordCreation, setNeedsPasswordCreation] = useState(false)
  const [userChecked, setUserChecked] = useState(false)

  // Função para verificar o email assim que o usuário para de digitar
  const checkUserStatus = async (emailToCheck: string) => {
    if (!emailToCheck) return

    try {
      const response = await fetch(`/api/check-user?email=${encodeURIComponent(emailToCheck)}`)
      const data = await response.json()
      
      setUserChecked(true)
      
      if (data.exists && data.hasPurchased) {
        // Usuário existe e tem compras
        if (!data.hasPassword) {
          // Não tem senha - primeiro acesso
          setIsFirstAccess(true)
          setNeedsPasswordCreation(true)
          setError('✅ Primeiro acesso detectado! Clique em "Continuar" para criar sua senha.')
        } else {
          // Tem senha - login normal
          setIsFirstAccess(false)
          setNeedsPasswordCreation(false)
          setError('')
        }
      } else if (data.exists && !data.hasPurchased) {
        // Usuário existe mas não tem compras
        setError('❌ Você ainda não possui nenhum produto. Adquira um livro primeiro!')
        setIsFirstAccess(false)
        setNeedsPasswordCreation(false)
      } else {
        // Usuário não existe
        setError('❌ Email não cadastrado. Primeiro faça uma compra!')
        setIsFirstAccess(false)
        setNeedsPasswordCreation(false)
      }
    } catch (error) {
      console.error('Erro ao verificar email:', error)
      setError('Erro ao verificar email. Tente novamente.')
    }
  }

  // Verificar quando o email muda (após 500ms de inatividade)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (email) {
        checkUserStatus(email)
      } else {
        setUserChecked(false)
        setError('')
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [email])

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
        setError('❌ Email ou senha inválidos')
      } else {
        router.push('/dashboard')
      }
    } catch (error) {
      setError('❌ Erro ao fazer login')
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

        {/* Mensagem de ajuda - SEMPRE VISÍVEL */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <p className="text-sm text-blue-700">
            <strong>💡 Primeiro acesso?</strong> Digite seu email e aguarde. Se você já comprou, será orientado a criar sua senha.
          </p>
        </div>

        {/* Mensagem de erro/sucesso */}
        {error && (
          <div className={`border-l-4 p-4 mb-6 ${
            error.includes('✅') ? 'bg-green-50 border-green-500' : 
            error.includes('❌') ? 'bg-red-50 border-red-500' : 
            'bg-yellow-50 border-yellow-500'
          }`}>
            <p className={`text-sm ${
              error.includes('✅') ? 'text-green-700' : 
              error.includes('❌') ? 'text-red-700' : 
              'text-yellow-700'
            }`}>{error}</p>
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="seu@email.com"
              required
              disabled={loading}
              autoComplete="email"
            />
            {email && !userChecked && (
              <p className="text-xs text-gray-500 mt-1">
                Verificando email...
              </p>
            )}
          </div>

          {/* Senha - só aparece se não for primeiro acesso */}
          {!needsPasswordCreation && userChecked && (
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
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                  tabIndex={-1}
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

          {/* Checkbox de primeiro acesso - manual */}
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
                ✓ Você será redirecionado para criar sua senha.
              </p>
            </div>
          )}

          {/* Botão de submit - texto dinâmico */}
          <button
            type="submit"
            disabled={loading || !userChecked}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Processando...' : 
             !userChecked ? 'Aguardando email...' :
             needsPasswordCreation ? 'Criar senha' : 'Entrar'}
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
          <p className="text-xs text-gray-400 mt-2">
            © 2026 Rafael Monteiro - Jornada Relacionamentos Conscientes
          </p>
        </div>
      </div>
    </div>
  )
}