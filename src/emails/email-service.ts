import { render } from '@react-email/components';
import { sendEmail } from './email';
import PaymentConfirmationEmail from '@/emails/PaymentConfirmation';
import AdminNotificationEmail from '@/emails/AdminNotification';

interface SendPaymentEmailsParams {
  userEmail: string;
  userName: string;
  userPhone: string;
  product: {
    title: string;
    price: number;
  };
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
  try {
    console.log('📧 Iniciando envio de e-mails de confirmação...');
    
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : process.env.NEXTAUTH_URL || 'http://localhost:3000';

    // Formatar lista de livros para o combo
    const bookTitles = books.map(book => `• ${book.title} (Livro ${book.bookNumber})`);

    // 1️⃣ E-mail para o cliente
    console.log(`📧 Gerando e-mail para cliente: ${userEmail}`);
    const clientEmailHtml = render(
      PaymentConfirmationEmail({
        userName,
        productName: product.title,
        productPrice: product.price.toFixed(2).replace('.', ','),
        isCombo,
        books: bookTitles,
        dashboardUrl: `${baseUrl}/dashboard`,
      })
    );

    const clientResult = await sendEmail({
      to: userEmail,
      subject: isCombo 
        ? '🎁 Seu pacote completo foi liberado!' 
        : '✅ Seu livro foi liberado!',
      html: clientEmailHtml,
    });

    if (!clientResult.success) {
      console.error('❌ Falha ao enviar e-mail para o cliente');
    }

    // 2️⃣ E-mail para o administrador (você)
    console.log(`📧 Gerando e-mail para administrador: ${process.env.ADMIN_EMAIL}`);
    const adminEmailHtml = render(
      AdminNotificationEmail({
        userName,
        userEmail,
        userPhone,
        productName: product.title,
        productPrice: product.price.toFixed(2).replace('.', ','),
        isCombo,
        paymentId,
        purchaseDate: new Date().toLocaleString('pt-BR', {
          dateStyle: 'full',
          timeStyle: 'short'
        }),
      })
    );

    const adminResult = await sendEmail({
      to: process.env.ADMIN_EMAIL!,
      subject: `💰 Nova venda: ${product.title}`,
      html: adminEmailHtml,
    });

    if (!adminResult.success) {
      console.error('❌ Falha ao enviar e-mail para administrador');
    }

    console.log(`📧 E-mails processados - Cliente: ${clientResult.success ? '✅' : '❌'}, Admin: ${adminResult.success ? '✅' : '❌'}`);
    
  } catch (error) {
    console.error('❌ Erro no serviço de e-mail:', error);
  }
}