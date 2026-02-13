// Tipos para os capítulos do livro
export interface Chapter {
  id: number
  type: 'cover' | 'dedication' | 'preface' | 'toc' | 'chapter' | 'back-cover'
  title: string
  content: string
}

// Tipos para produtos/livros
export interface Product {
  id: number | string
  title: string
  price: number
  mpLink: string
}

// Tipos para usuário (estendendo o NextAuth)
export interface User {
  id: string
  email: string
  fullName: string
  phone?: string
}

// Tipos para resposta da API
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
}

// Extensão do Session do NextAuth
import 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }
}