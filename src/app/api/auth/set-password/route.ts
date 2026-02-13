import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    if (!email || !password || password.length < 6) {
      return NextResponse.json(
        { error: 'Senha inválida' },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      )
    }

    const passwordHash = await bcrypt.hash(password, 10)

    await prisma.user.update({
      where: { email },
      data: { passwordHash }
    })

    return NextResponse.json({ success: true })

  } catch (error) {
    return NextResponse.json(
      { error: 'Erro interno' },
      { status: 500 }
    )
  }
}