import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const { fullName, email, phone, productId } = await req.json()

    console.log('Dados recebidos:', { fullName, email, phone, productId })

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
      console.log('Novo usuário criado:', user.id)
    } else {
      console.log('Usuário existente:', user.id)
    }

    // Buscar produto - CORREÇÃO AQUI
    let product = null
    
    if (productId === 'combo') {
      product = await prisma.product.findFirst({
        where: { isCombo: true }
      })
    } else {
      // Converter para número e buscar por bookNumber
      const bookNumber = parseInt(productId)
      if (!isNaN(bookNumber)) {
        product = await prisma.product.findFirst({
          where: { bookNumber: bookNumber }
        })
      }
    }

    console.log('Produto encontrado:', product)

    if (!product) {
      return NextResponse.json(
        { error: 'Produto não encontrado. Verifique se o produto existe no banco de dados.' },
        { status: 404 }
      )
    }

    // Verificar se já tem registro
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
      console.log('Acesso registrado com status pending')
    } else {
      console.log('Acesso já existente')
    }

    return NextResponse.json({ 
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.fullName
      }
    })

  } catch (error) {
    console.error('Erro detalhado ao registrar acesso:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor: ' + (error instanceof Error ? error.message : 'Erro desconhecido') },
      { status: 500 }
    )
  }
}