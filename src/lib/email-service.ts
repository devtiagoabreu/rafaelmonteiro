// src/lib/email-service.ts
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
  console.log('📧 ===== INICIANDO sendPaymentConfirmationEmails =====');
  console.log('📧 Parâmetros recebidos:', {
    userEmail,
    userName,
    userPhone,
    productTitle: product?.title,
    productPrice: product?.price,
    paymentId,
    isCombo,
    booksCount: books.length
  });

  // VALIDAÇÕES INICIAIS
  if (!userEmail) {
    console.error('❌ ERRO: userEmail é obrigatório');
    return;
  }

  if (!userName) {
    console.error('❌ ERRO: userName é obrigatório');
    return;
  }

  if (!product) {
    console.error('❌ ERRO: product é obrigatório');
    return;
  }

  try {
    console.log('📧 Verificando variáveis de ambiente...');
    console.log('📧 RESEND_API_KEY existe?', process.env.RESEND_API_KEY ? 'SIM' : 'NÃO');
    console.log('📧 EMAIL_FROM:', process.env.EMAIL_FROM || 'NÃO CONFIGURADO');
    console.log('📧 ADMIN_EMAIL:', process.env.ADMIN_EMAIL || 'NÃO CONFIGURADO');

    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : process.env.NEXTAUTH_URL || 'http://localhost:3000';

    console.log('📧 Base URL:', baseUrl);

    // Formatar lista de livros para o combo
    const bookTitles = books.map(book => `• ${book.title} (Livro ${book.bookNumber})`);
    console.log('📧 Títulos dos livros formatados:', bookTitles);

    // 1️⃣ E-mail para o cliente
    console.log(`📧 Gerando e-mail para cliente: ${userEmail}`);
    
    const clientEmailHtml = await render(
      PaymentConfirmationEmail({
        userName,
        productName: product.title,
        productPrice: product.price.toFixed(2).replace('.', ','),
        isCombo,
        books: bookTitles,
        dashboardUrl: `${baseUrl}/dashboard`,
      })
    );

    console.log('📧 HTML do e-mail do cliente gerado, tamanho:', clientEmailHtml.length);

    console.log('📧 Enviando e-mail para cliente...');
    const clientResult = await sendEmail({
      to: userEmail,
      subject: isCombo 
        ? '🎁 Seu pacote completo foi liberado!' 
        : '✅ Seu livro foi liberado!',
      html: clientEmailHtml,
    });

    console.log('📧 Resultado do envio para cliente:', clientResult);

    if (!clientResult.success) {
      console.error('❌ Falha ao enviar e-mail para o cliente:', clientResult.error);
    } else {
      console.log('✅ E-mail do cliente enviado com sucesso. ID:', clientResult.data?.id);
    }

    // 2️⃣ E-mail para o administrador (você)
    const adminEmail = process.env.ADMIN_EMAIL;
    if (!adminEmail) {
      console.warn('⚠️ ADMIN_EMAIL não configurado, pulando e-mail para administrador');
    } else {
      console.log(`📧 Gerando e-mail para administrador: ${adminEmail}`);
      
      const adminEmailHtml = await render(
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

      console.log('📧 HTML do e-mail do admin gerado, tamanho:', adminEmailHtml.length);

      const adminResult = await sendEmail({
        to: adminEmail,
        subject: `💰 Nova venda: ${product.title}`,
        html: adminEmailHtml,
      });

      console.log('📧 Resultado do envio para admin:', adminResult);

      if (!adminResult.success) {
        console.error('❌ Falha ao enviar e-mail para administrador:', adminResult.error);
      } else {
        console.log('✅ E-mail do administrador enviado com sucesso. ID:', adminResult.data?.id);
      }
    }

    console.log('📧 ===== FINALIZANDO sendPaymentConfirmationEmails =====');
    
  } catch (error) {
    console.error('❌ ERRO CRÍTICO no serviço de e-mail:', error);
    console.error('❌ Stack trace:', error instanceof Error ? error.stack : 'Sem stack trace');
  }
}