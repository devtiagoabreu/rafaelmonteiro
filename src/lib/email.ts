// src/lib/email.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailData {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail({ to, subject, html, text }: EmailData) {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: [to],
      subject,
      html,
      text: text || html.replace(/<[^>]*>/g, ''),
    });

    if (error) {
      console.error('❌ Erro ao enviar e-mail:', error);
      return { success: false, error };
    }

    console.log(`✅ E-mail enviado para ${to}`);
    return { success: true, data };
  } catch (error) {
    console.error('❌ Erro ao enviar e-mail:', error);
    return { success: false, error };
  }
}