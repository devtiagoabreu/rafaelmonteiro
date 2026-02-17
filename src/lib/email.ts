// src/lib/email.ts
import { Resend } from 'resend';

// Inicializar Resend com a API key
const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailData {
  to: string;
  subject: string;
  html: string;
  text?: string;
  from?: string;
}

export async function sendEmail({ to, subject, html, text, from }: EmailData) {
  console.log(`📧 sendEmail: Preparando envio para ${to}`);
  console.log(`📧 Assunto: ${subject}`);
  
  try {
    // Verificar se a API key existe
    if (!process.env.RESEND_API_KEY) {
      console.error('❌ RESEND_API_KEY não está definida nas variáveis de ambiente');
      return { success: false, error: 'RESEND_API_KEY não configurada' };
    }

    // Usar email de fallback se necessário
    const fromEmail = from || process.env.EMAIL_FROM;
    
    if (!fromEmail) {
      console.error('❌ EMAIL_FROM não está definido');
      return { success: false, error: 'EMAIL_FROM não configurado' };
    }
    
    console.log('📧 From:', fromEmail);

    console.log('📧 Chamando API do Resend...');
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [to],
      subject,
      html,
      text: text || html.replace(/<[^>]*>/g, ''),
    });

    if (error) {
      console.error('❌ Resend retornou erro:', error);
      return { success: false, error };
    }

    console.log('✅ Resend sucesso. ID:', data?.id);
    return { success: true, data };
  } catch (error) {
    console.error('❌ Exceção no sendEmail:', error);
    return { success: false, error };
  }
}