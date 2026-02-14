// src/lib/email-service.ts
import { sendEmail } from './email';
import { render } from '@react-email/components';
import PaymentConfirmationEmail from '@/emails/PaymentConfirmation';
import AdminNotificationEmail from '@/emails/AdminNotification';

interface SendPaymentEmailsParams {
  userEmail: string;
  userName: string;
  userPhone: string;
  product: any;
  paymentId: string;
  isCombo: boolean;
  books?: any[];
}

export async function sendPaymentConfirmationEmails({
  userEmail,
  userName,
  userPhone,
  product,
  paymentId,
  isCombo,
  books = [],
}: SendPaymentEmailsParams) {
  const baseUrl = process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : 'http://localhost:3000';

  // Formatar lista de livros para o combo
  const bookTitles = books.map(book => `• ${book.title} (Livro ${book.bookNumber})`);

  // 1️⃣ E-mail para o cliente
  const clientEmailHtml = render(
    PaymentConfirmationEmail({
      userName,
      productName: product.title,
      productPrice: product.price.toFixed(2),
      isCombo,
      books: bookTitles,
      dashboardUrl: `${baseUrl}/dashboard`,
    })
  );

  await sendEmail({
    to: userEmail,
    subject: isCombo 
      ? '🎁 Seu pacote completo foi liberado!' 
      : '✅ Seu livro foi liberado!',
    html: clientEmailHtml,
  });

  // 2️⃣ E-mail para o administrador (você)
  const adminEmailHtml = render(
    AdminNotificationEmail({
      userName,
      userEmail,
      userPhone,
      productName: product.title,
      productPrice: product.price.toFixed(2),
      isCombo,
      paymentId,
      purchaseDate: new Date().toLocaleString('pt-BR'),
    })
  );

  await sendEmail({
    to: process.env.ADMIN_EMAIL!,
    subject: `💰 Nova venda: ${product.title}`,
    html: adminEmailHtml,
  });

  console.log(`📧 E-mails enviados para cliente (${userEmail}) e admin`);
}