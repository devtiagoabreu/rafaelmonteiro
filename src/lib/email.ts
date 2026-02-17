// src/lib/email.ts
import nodemailer from 'nodemailer';

// Configuração do transporte SMTP do Gmail
const createTransporter = () => {
  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASS;
  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
  const smtpPort = process.env.SMTP_PORT || '587';

  if (!gmailUser || !gmailPass) {
    console.error('❌ Credenciais de e-mail não configuradas');
    throw new Error('Credenciais de e-mail não configuradas');
  }

  return nodemailer.createTransport({
    host: smtpHost,
    port: parseInt(smtpPort),
    secure: false,
    auth: {
      user: gmailUser,
      pass: gmailPass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
};

interface EmailData {
  to: string;
  subject: string;
  html: string;
  text?: string;
  from?: string;
}

export async function sendEmail({ to, subject, html, text, from }: EmailData) {
  console.log('📧 ===== NODEMAILER ENVIANDO E-MAIL =====');
  console.log('📧 Para:', to);
  console.log('📧 Assunto:', subject);
  
  try {
    const transporter = createTransporter();
    
    // Verificar conexão
    console.log('📧 Verificando conexão SMTP...');
    await transporter.verify();
    console.log('✅ Conexão SMTP verificada com sucesso');

    const fromEmail = from || `"Rafael Monteiro" <${process.env.GMAIL_USER}>`;

    console.log('📧 From:', fromEmail);

    const mailOptions = {
      from: fromEmail,
      to: to,
      subject: subject,
      text: text || html.replace(/<[^>]*>/g, ''),
      html: html,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log(`✅ E-mail enviado com sucesso! ID: ${info.messageId}`);
    
    return { success: true, data: info };
  } catch (error) {
    console.error('❌ Erro no Nodemailer:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('EAUTH')) {
        console.error('❌ Erro de autenticação: Verifique a senha de aplicativo');
      } else if (error.message.includes('ENOTFOUND')) {
        console.error('❌ Erro de conexão: Verifique o host SMTP');
      }
    }
    
    return { success: false, error };
  }
}