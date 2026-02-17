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
  console.log('📧 ===== INICIANDO ENVIO DE E-MAILS DE CONFIRMAÇÃO =====');
  
  try {
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : process.env.NEXTAUTH_URL || 'http://localhost:3000';

    // Formatar lista de livros para o combo
    const bookTitles = books.map(book => `• ${book.title} (Livro ${book.bookNumber})`);

    // E-mail para o cliente
    console.log(`📧 Gerando e-mail para cliente: ${userEmail}`);
    
    const clientEmailHtml = await render(
      PaymentConfirmationEmail({
        userName,
        productName: product.title,
        productPrice: product.price.toFixed(2).replace('.', ','),
        isCombo,
        books: bookTitles,
        dashboardUrl: `${baseUrl}/login?email=${encodeURIComponent(userEmail)}`, // Link para login com email pré-preenchido
      })
    );

    const clientResult = await sendEmail({
      to: userEmail,
      subject: isCombo 
        ? '🎁 Seu pacote completo foi liberado!' 
        : '✅ Seu livro foi liberado!',
      html: clientEmailHtml,
    });

    console.log(`📧 Resultado cliente:`, clientResult);

    // E-mail para o administrador
    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail) {
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

      const adminResult = await sendEmail({
        to: adminEmail,
        subject: `💰 Nova venda: ${product.title}`,
        html: adminEmailHtml,
      });

      console.log(`📧 Resultado admin:`, adminResult);
    }

  } catch (error) {
    console.error('❌ ERRO no serviço de e-mail:', error);
  }
}