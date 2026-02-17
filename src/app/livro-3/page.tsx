// src/app/livro-3/page.tsx

import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'
import Livro3Client from './Livro3Client'

export default async function Livro3Page() {
  const session = await getServerSession(authOptions)

  // Se não estiver logado, redireciona para login
  if (!session) {
    redirect('/login?callbackUrl=/livro-3')
  }

  // Verificar se o usuário tem acesso a este livro
  const user = await prisma.user.findUnique({
    where: { email: session.user?.email as string },
    include: {
      products: {
        where: {
          product: {
            bookNumber: 3
          },
          paymentStatus: 'paid'
        }
      }
    }
  })

  // Se não tiver comprado o livro, redireciona para a página inicial com erro
  if (!user || user.products.length === 0) {
    redirect('/#livros?error=acesso-negado')
  }

  // Se tiver acesso, renderiza o livro
  return <Livro3Client />
}