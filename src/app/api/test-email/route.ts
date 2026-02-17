import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function GET() {
  console.log('🧪 ===== TESTE DE E-MAIL COM NODEMAILER =====');
  
  try {
    // Verificar credenciais
    console.log('📧 Verificando variáveis de ambiente...');
    
    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_APP_PASS;
    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = process.env.SMTP_PORT || '587';

    console.log('📧 GMAIL_USER:', gmailUser ? '✅' : '❌');
    console.log('📧 GMAIL_APP_PASS:', gmailPass ? '✅' : '❌');
    console.log('📧 SMTP_HOST:', smtpHost);
    console.log('📧 SMTP_PORT:', smtpPort);

    if (!gmailUser || !gmailPass) {
      console.error('❌ Credenciais não configuradas');
      return NextResponse.json({ 
        success: false, 
        error: 'Credenciais de e-mail não configuradas na Vercel' 
      });
    }

    // Configurar transporter
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(smtpPort),
      secure: false,
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });

    console.log('📧 Verificando conexão SMTP...');
    await transporter.verify();
    console.log('✅ Conexão SMTP OK!');

    // Enviar e-mail
    const info = await transporter.sendMail({
      from: `"Rafael Monteiro" <${gmailUser}>`,
      to: gmailUser,
      subject: '🧪 Teste Nodemailer - Diagnóstico',
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2 style="color: #9d4e7c;">Teste de E-mail</h2>
          <p>Se você está vendo isso, o sistema está funcionando!</p>
          <p>Enviado em: ${new Date().toLocaleString('pt-BR')}</p>
        </div>
      `,
    });

    console.log('✅ E-mail enviado:', info.messageId);

    return NextResponse.json({ 
      success: true, 
      message: 'E-mail enviado com sucesso!',
      messageId: info.messageId 
    });

  } catch (error) {
    console.error('❌ Erro detalhado:', error);
    
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : null
    }, { status: 500 });
  }
}