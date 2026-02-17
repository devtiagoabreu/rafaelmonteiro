import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function GET() {
  console.log('🧪 ===== TESTE SIMPLES DE E-MAIL =====');
  
  try {
    // Verificar credenciais
    console.log('📧 Verificando credenciais...');
    console.log('GMAIL_USER:', process.env.GMAIL_USER ? '✅' : '❌');
    console.log('GMAIL_APP_PASS:', process.env.GMAIL_APP_PASS ? '✅' : '❌');

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASS,
      },
    });

    console.log('📧 Verificando conexão SMTP...');
    await transporter.verify();
    console.log('✅ Conexão SMTP OK!');

    const info = await transporter.sendMail({
      from: `"Rafael Monteiro" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: '🧪 Teste SIMPLES - Nodemailer',
      html: '<h1>Teste</h1><p>E-mail de teste simples</p>',
    });

    console.log('✅ E-mail enviado:', info.messageId);
    
    return NextResponse.json({ success: true, messageId: info.messageId });
  } catch (error) {
    console.error('❌ Erro:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}