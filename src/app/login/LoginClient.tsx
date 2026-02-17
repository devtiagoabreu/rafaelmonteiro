// src/app/login/LoginClient.tsx
'use client'

import { useState, useEffect } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

export default function LoginClient() {
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
  const [userName, setUserName] = useState('')

  const checkUserStatus = async (emailToCheck: string) => {
    if (!emailToCheck) return

    try {
      const response = await fetch(`/api/check-user?email=${encodeURIComponent(emailToCheck)}`)
      const data = await response.json()
      
      setUserChecked(true)
      
      if (data.exists && data.hasPurchased) {
        setUserName(data.userName || '')
        if (!data.hasPassword) {
          setIsFirstAccess(true)
          setNeedsPasswordCreation(true)
          setError('')
        } else {
          setIsFirstAccess(false)
          setNeedsPasswordCreation(false)
          setError('')
        }
      } else if (data.exists && !data.hasPurchased) {
        setError('❌ Você ainda não possui nenhum produto. Adquira um livro primeiro!')
        setIsFirstAccess(false)
        setNeedsPasswordCreation(false)
      } else {
        setError('❌ Email não cadastrado. Primeiro faça uma compra!')
        setIsFirstAccess(false)
        setNeedsPasswordCreation(false)
      }
    } catch (error) {
      console.error('Erro ao verificar email:', error)
      setError('Erro ao verificar email. Tente novamente.')
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (email) {
        checkUserStatus(email)
      } else {
        setUserChecked(false)
        setError('')
        setUserName('')
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
        router.push(`/criar-senha?email=${encodeURIComponent(email)}`)
        return
      }

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
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
      {/* Card de Login */}
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
        
        {/* Header com gradiente */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-10 -mb-10"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-2 font-serif">Bem-vindo de volta</h2>
            <p className="text-indigo-100 text-sm">Acesse sua conta para continuar sua jornada</p>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="p-8">
          {/* Mensagem de boas-vindas personalizada */}
          {userName && (
            <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 mb-6 rounded-lg animate-fadeIn">
              <p className="text-indigo-700">
                <span className="font-semibold">Olá, {userName}!</span> {needsPasswordCreation ? 'Bem-vindo! Crie sua senha para acessar.' : 'Que bom ver você novamente!'}
              </p>
            </div>
          )}

          {/* Mensagem de erro */}
          {error && (
            <div className={`border-l-4 p-4 mb-6 rounded-lg animate-fadeIn ${
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
            {/* Campo de Email */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Email cadastrado na compra
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-envelope text-gray-400"></i>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white text-gray-900 placeholder-gray-400"
                  placeholder="seu@email.com"
                  required
                  disabled={loading}
                  autoComplete="email"
                />
              </div>
              {email && !userChecked && (
                <div className="flex items-center gap-2 text-sm text-indigo-600">
                  <i className="fas fa-spinner fa-spin"></i>
                  <span>Verificando email...</span>
                </div>
              )}
            </div>

            {/* Campo de Senha (só aparece se necessário) */}
            {!needsPasswordCreation && userChecked && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Senha
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-lock text-gray-400"></i>
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white text-gray-900 placeholder-gray-400"
                    placeholder="Sua senha"
                    disabled={loading || needsPasswordCreation}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-indigo-600 transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Checkbox de primeiro acesso */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="firstAccess"
                checked={isFirstAccess}
                onChange={(e) => {
                  setIsFirstAccess(e.target.checked)
                  setNeedsPasswordCreation(e.target.checked)
                  if (e.target.checked) setPassword('')
                }}
                className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded transition-colors"
              />
              <label htmlFor="firstAccess" className="text-sm text-gray-600">
                Primeiro acesso (não tenho senha)
              </label>
            </div>

            {/* Dica para primeiro acesso */}
            {isFirstAccess && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 animate-slideDown">
                <div className="flex gap-3">
                  <i className="fas fa-info-circle text-green-500 text-lg"></i>
                  <div className="text-sm text-green-700">
                    <p className="font-medium mb-1">Primeiro acesso detectado!</p>
                    <p>Ao clicar em "Continuar", você será redirecionado para criar sua senha.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Botão de ação */}
            <button
              type="submit"
              disabled={loading || !userChecked}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <i className="fas fa-spinner fa-spin"></i>
                  Processando...
                </span>
              ) : !userChecked ? (
                'Aguardando email...'
              ) : needsPasswordCreation ? (
                'Continuar para criar senha'
              ) : (
                'Entrar'
              )}
            </button>
          </form>

          {/* Links de ajuda */}
          <div className="mt-8 space-y-3 text-center">
            <Link 
              href="/recuperar-senha" 
              className="inline-flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-800 transition-colors group"
            >
              <i className="fas fa-key text-xs group-hover:animate-shake"></i>
              Esqueceu sua senha?
            </Link>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-white text-gray-500">Ainda não tem conta?</span>
              </div>
            </div>
            
            <Link
              href="/#livros"
              className="inline-flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              <i className="fas fa-book-open"></i>
              Adquira um livro para começar
            </Link>
          </div>

          {/* Selo de segurança */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <i className="fas fa-lock text-green-500"></i>
                <span>Segurança SSL</span>
              </div>
              <div className="flex items-center gap-1">
                <i className="fas fa-shield-alt text-green-500"></i>
                <span>Dados protegidos</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}