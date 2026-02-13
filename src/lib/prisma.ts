// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import { Pool } from '@neondatabase/serverless'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

// Verificar se DATABASE_URL existe
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL não está definida no ambiente')
}

// Configuração para o adaptador Neon - CORREÇÃO AQUI
const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL 
})

// O adaptador espera o pool, mas pode haver conflito de tipos
// @ts-ignore - Ignorar erro de tipo temporariamente
const adapter = new PrismaNeon(pool)

export const prisma =
  globalForPrisma.prisma || new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma