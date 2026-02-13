import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Criar produtos
  const products = [
    {
      title: 'O Desejo Não Morre — Ele É Mal Cuidado',
      description: 'Livro 1 da série Jornada Relacionamentos Conscientes',
      price: 0,
      bookNumber: 1,
      isCombo: false,
      mpLink: 'https://www.mercadopago.com.br/book1'
    },
    {
      title: 'Por Que Você Se Atrai Sempre Pelo Mesmo Tipo de Pessoa',
      description: 'Livro 2 da série',
      price: 29.90,
      bookNumber: 2,
      isCombo: false,
      mpLink: 'https://www.mercadopago.com.br/book2'
    },
    {
      title: 'Ciúme, Insegurança e Medo de Perder',
      description: 'Livro 3 da série',
      price: 29.90,
      bookNumber: 3,
      isCombo: false,
      mpLink: 'https://www.mercadopago.com.br/book3'
    },
    {
      title: 'Quando o Amor Vira Dependência',
      description: 'Livro 4 da série',
      price: 29.90,
      bookNumber: 4,
      isCombo: false,
      mpLink: 'https://www.mercadopago.com.br/book4'
    },
    {
      title: 'Relacionamentos Conscientes: Como Amar Sem Se Perder',
      description: 'Livro 5 da série',
      price: 29.90,
      bookNumber: 5,
      isCombo: false,
      mpLink: 'https://www.mercadopago.com.br/book5'
    },
    {
      title: 'Pacote Completo - Jornada Relacionamentos Conscientes',
      description: 'Todos os 5 livros com desconto especial',
      price: 89.90,
      bookNumber: null,
      isCombo: true,
      mpLink: 'https://www.mercadopago.com.br/combo'
    }
  ]

  for (const product of products) {
    await prisma.product.upsert({
      where: { 
        bookNumber: product.bookNumber ?? 999 
      },
      update: {},
      create: product
    })
  }

  // Criar usuário admin
  const adminPassword = await bcrypt.hash('Admin@123', 10)
  await prisma.user.upsert({
    where: { email: 'admin@jornadaconsciente.com.br' },
    update: {},
    create: {
      email: 'admin@jornadaconsciente.com.br',
      fullName: 'Administrador',
      phone: '+5511999999999',
      passwordHash: adminPassword
    }
  })

  // Criar usuário teste
  const testPassword = await bcrypt.hash('Teste@123', 10)
  await prisma.user.upsert({
    where: { email: 'teste@email.com' },
    update: {},
    create: {
      email: 'teste@email.com',
      fullName: 'Usuário Teste',
      phone: '+5511988887777',
      passwordHash: testPassword
    }
  })

  console.log('✅ Seed completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })