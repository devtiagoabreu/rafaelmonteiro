import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// FORÇAR A ROTA A SER DINÂMICA (NÃO PRÉ-RENDERIZADA)
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')

    if (!email) {
      return NextResponse.json(
        { error: 'Email é obrigatório' },
        { status: 400 }
      )
    }

    console.log(`🔍 Verificando usuário: ${email}`)

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
    console.error('🔴 Erro ao verificar usuário:', error)
    return NextResponse.json(
      { error: 'Erro interno ao verificar usuário' },
      { status: 500 }
    )
  }
}