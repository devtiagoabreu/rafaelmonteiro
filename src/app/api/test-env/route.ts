import { NextResponse } from 'next/server';

export async function GET() {
  console.log('🔍 ===== DIAGNÓSTICO DE VARIÁVEIS DE AMBIENTE =====');
  
  const envVars = {
    GMAIL_USER: process.env.GMAIL_USER ? '✅ configurado' : '❌ não configurado',
    GMAIL_APP_PASS: process.env.GMAIL_APP_PASS ? '✅ configurado' : '❌ não configurado',
    SMTP_HOST: process.env.SMTP_HOST || '❌ não configurado',
    SMTP_PORT: process.env.SMTP_PORT || '❌ não configurado',
    ADMIN_EMAIL: process.env.ADMIN_EMAIL || '❌ não configurado',
    NODE_ENV: process.env.NODE_ENV,
    VERCEL_ENV: process.env.VERCEL_ENV,
  };

  console.log('📊 Variáveis de ambiente:', envVars);

  return NextResponse.json({
    success: true,
    message: 'Diagnóstico de variáveis de ambiente',
    environment: envVars,
    timestamp: new Date().toISOString(),
  });
}