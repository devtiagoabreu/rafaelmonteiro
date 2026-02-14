import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')

    if (!email) {
      return NextResponse.json(
        { error: 'Email é obrigatório' },
        { status: 400 }
      )
    }

    // Buscar usuário
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        products: {
          where: {
            paymentStatus: 'paid'
          }
        }
      }
    })

    if (!user) {
      return NextResponse.json({
        exists: false,
        hasPurchased: false,
        hasPassword: false
      })
    }

    return NextResponse.json({
      exists: true,
      hasPurchased: user.products.length > 0,
      hasPassword: !!user.passwordHash,
      userName: user.fullName
    })

  } catch (error) {
    console.error('Erro ao verificar usuário:', error)
    return NextResponse.json(
      { error: 'Erro interno' },
      { status: 500 }
    )
  }
}