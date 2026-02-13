import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const { fullName, email, phone, productId } = await req.json()

    // Validações
    if (!fullName || !email || !phone || !productId) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios' },
        { status: 400 }
      )
    }

    // Verificar se usuário já existe
    let user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      // Criar novo usuário (sem senha ainda)
      user = await prisma.user.create({
        data: {
          fullName,
          email,
          phone
        }
      })
    }

    // Buscar produto
    const product = await prisma.product.findFirst({
      where: productId === 'combo'
        ? { isCombo: true }
        : { bookNumber: Number(productId) }
    })

    if (!product) {
      return NextResponse.json(
        { error: 'Produto não encontrado' },
        { status: 404 }
      )
    }

    // Verificar se já tem acesso
    const existingAccess = await prisma.userProduct.findUnique({
      where: {
        userId_productId: {
          userId: user.id,
          productId: product.id
        }
      }
    })

    if (!existingAccess) {
      // Registrar acesso pendente
      await prisma.userProduct.create({
        data: {
          userId: user.id,
          productId: product.id,
          paymentStatus: 'pending'
        }
      })
    }

    return NextResponse.json({ 
      success: true,
      user: {
        id: user.id,
        email: user.email
      }
    })

  } catch (error) {
    console.error('Erro ao registrar acesso:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}