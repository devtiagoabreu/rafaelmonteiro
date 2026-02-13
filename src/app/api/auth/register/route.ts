import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const { fullName, email, phone, productId } = await req.json()

    if (!fullName || !email || !phone || !productId) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios' },
        { status: 400 }
      )
    }

    let user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      user = await prisma.user.create({
        data: { fullName, email, phone }
      })
    }

    const product = await prisma.product.findFirst({
      where: productId === 'combo' 
        ? { isCombo: true }
        : { bookNumber: parseInt(productId) }
    })

    if (!product) {
      return NextResponse.json(
        { error: 'Produto não encontrado' },
        { status: 404 }
      )
    }

    const existing = await prisma.userProduct.findUnique({
      where: {
        userId_productId: {
          userId: user.id,
          productId: product.id
        }
      }
    })

    if (!existing) {
      await prisma.userProduct.create({
        data: {
          userId: user.id,
          productId: product.id,
          paymentStatus: 'pending'
        }
      })
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}