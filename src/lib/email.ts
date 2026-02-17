// src/lib/email.ts
import nodemailer from 'nodemailer';

// Configuração do transporte SMTP do Gmail
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true para 465, false para 587
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASS,
  },
  tls: {
    rejectUnauthorized: false, // Evita erros de certificado em desenvolvimento
  },
});

interface EmailData {
  to: string;
  subject: string;
  html: string;
  text?: string;
  from?: string;
}

export async function sendEmail({ to, subject, html, text, from }: EmailData) {
  console.log('📧 ===== NOEMAILER ENVIANDO E-MAIL =====');
  console.log('📧 Para:', to);
  console.log('📧 Assunto:', subject);
  
  try {
    // Verificar credenciais
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASS) {
      console.error('❌ GMAIL_USER ou GMAIL_APP_PASS não configurados');
      return { success: false, error: 'Credenciais de e-mail não configuradas' };
    }

    // Verificar conexão
    console.log('📧 Verificando conexão SMTP...');
    await transporter.verify();
    console.log('✅ Conexão SMTP verificada com sucesso');

    const fromEmail = from || `"Rafael Monteiro" <${process.env.GMAIL_USER}>`;

    console.log('📧 From:', fromEmail);
    console.log('📧 Enviando e-mail...');

    const mailOptions = {
      from: fromEmail,
      to: to,
      subject: subject,
      text: text || html.replace(/<[^>]*>/g, ''),
      html: html,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log(`✅ E-mail enviado com sucesso! ID: ${info.messageId}`);
    console.log('📧 Resposta do servidor:', info.response);
    
    return { success: true, data: info };
  } catch (error) {
    console.error('❌ Erro no Nodemailer:', error);
    
    // Mensagens de erro mais específicas
    if (error instanceof Error) {
      if (error.message.includes('EAUTH')) {
        console.error('❌ Erro de autenticação: Verifique se a senha de aplicativo está correta');
      } else if (error.message.includes('ENOTFOUND')) {
        console.error('❌ Erro de conexão: Verifique o host SMTP');
      } else if (error.message.includes('ETIMEDOUT')) {
        console.error('❌ Erro de timeout: O servidor demorou para responder');
      }
      console.error('❌ Detalhes do erro:', error.message);
    }
    
    return { success: false, error };
  }
}