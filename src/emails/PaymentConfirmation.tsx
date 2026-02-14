import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
  Link,
} from '@react-email/components';
import * as React from 'react';

interface PaymentConfirmationEmailProps {
  userName: string;
  productName: string;
  productPrice: string;
  isCombo?: boolean;
  books?: string[];
  dashboardUrl: string;
}

export const PaymentConfirmationEmail = ({
  userName,
  productName,
  productPrice,
  isCombo = false,
  books = [],
  dashboardUrl,
}: PaymentConfirmationEmailProps) => {
  const previewText = `✅ Pagamento confirmado - Bem-vindo à Jornada Relacionamentos Conscientes`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={headerSection}>
            <Heading style={h1}>🎉 Pagamento Confirmado!</Heading>
          </Section>

          <Section style={contentSection}>
            <Text style={greeting}>Olá, {userName}!</Text>
            
            <Text style={paragraph}>
              Seu pagamento foi processado com sucesso. Agora você tem acesso a:
            </Text>

            <Section style={productBox}>
              <Text style={productTitle}>{productName}</Text>
              {isCombo && books.length > 0 && (
                <Text style={booksList}>
                  📚 Livros inclusos:
                  {books.map((book, index) => (
                    <span key={index} style={bookItem as React.CSSProperties}>
                      {book}
                    </span>
                  ))}
                </Text>
              )}
              {/* CORREÇÃO: productPrice é usado como conteúdo, não como style */}
              <Text style={productPriceStyle}>Valor: R$ {productPrice}</Text>
            </Section>

            <Text style={paragraph}>
              Para acessar seu conteúdo, clique no botão abaixo:
            </Text>

            <Section style={buttonSection}>
              <Link href={dashboardUrl} style={button}>
                Acessar Meus Livros
              </Link>
            </Section>

            <Text style={paragraphSmall}>
              Se você ainda não tem senha, ao clicar no botão você será redirecionado
              para criar sua senha de acesso.
            </Text>

            <Hr style={hr} />

            <Text style={footer}>
              Este é um e-mail automático, por favor não responda.
              Em caso de dúvidas, entre em contato com nosso suporte.
            </Text>
            
            <Text style={footer}>
              Rafael Monteiro - Terapeuta de Relacionamentos
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// Estilos (agora com nomes únicos para evitar conflitos)
const main: React.CSSProperties = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container: React.CSSProperties = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  maxWidth: '600px',
};

const headerSection: React.CSSProperties = {
  backgroundColor: '#4f46e5',
  padding: '30px',
  textAlign: 'center' as const,
};

const h1: React.CSSProperties = {
  color: '#ffffff',
  fontSize: '32px',
  fontWeight: 'bold',
  margin: '0',
};

const contentSection: React.CSSProperties = {
  padding: '30px',
};

const greeting: React.CSSProperties = {
  fontSize: '20px',
  fontWeight: 'bold',
  marginBottom: '20px',
};

const paragraph: React.CSSProperties = {
  fontSize: '16px',
  lineHeight: '26px',
  marginBottom: '20px',
  color: '#333',
};

const productBox: React.CSSProperties = {
  backgroundColor: '#f3f4f6',
  borderRadius: '8px',
  padding: '20px',
  marginBottom: '25px',
};

const productTitle: React.CSSProperties = {
  fontSize: '18px',
  fontWeight: 'bold',
  marginBottom: '10px',
  color: '#4f46e5',
};

const booksList: React.CSSProperties = {
  fontSize: '15px',
  lineHeight: '24px',
  marginBottom: '10px',
};

const bookItem: React.CSSProperties = {
  display: 'block',
  marginLeft: '15px',
  color: '#4b5563',
};

// CORREÇÃO: Nome diferente para não conflitar com a prop
const productPriceStyle: React.CSSProperties = {
  fontSize: '16px',
  fontWeight: 'bold',
  color: '#10b981',
};

const buttonSection: React.CSSProperties = {
  textAlign: 'center' as const,
  marginTop: '30px',
  marginBottom: '30px',
};

const button: React.CSSProperties = {
  backgroundColor: '#4f46e5',
  borderRadius: '5px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '15px 30px',
};

const paragraphSmall: React.CSSProperties = {
  fontSize: '14px',
  color: '#6b7280',
  marginTop: '20px',
};

const hr: React.CSSProperties = {
  borderColor: '#e5e7eb',
  margin: '30px 0',
};

const footer: React.CSSProperties = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
  textAlign: 'center' as const,
};

export default PaymentConfirmationEmail;