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
  whatsappNumber?: string;
}

export const PaymentConfirmationEmail = ({
  userName,
  productName,
  productPrice,
  isCombo = false,
  books = [],
  dashboardUrl,
  whatsappNumber = '5519994559836',
}: PaymentConfirmationEmailProps) => {
  const previewText = `✅ Pagamento confirmado - Bem-vindo à Jornada Relacionamentos Conscientes`;
  
  // Formatar número do WhatsApp
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Olá! Vim do site e gostaria de tirar uma dúvida sobre minha compra.`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={headerSection}>
            <Heading style={h1}>🎉 Pagamento Confirmado!</Heading>
          </Section>

          {/* Conteúdo */}
          <Section style={contentSection}>
            <Text style={greeting}>Olá, {userName}!</Text>
            
            <Text style={paragraph}>
              Seu pagamento foi processado com sucesso. Agora você tem acesso a:
            </Text>

            <Section style={productBox}>
              <Text style={productTitle}>{productName}</Text>
              {isCombo && books.length > 0 && (
                <>
                  <Text style={booksList}>
                    📚 Livros inclusos:
                  </Text>
                  {books.map((book, index) => (
                    <Text key={index} style={bookItem}>
                      {book}
                    </Text>
                  ))}
                </>
              )}
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

            {/* Instruções de primeiro acesso */}
            <Section style={instructionsBox}>
              <Text style={instructionsTitle}>📝 Primeiro acesso?</Text>
              <Text style={instructionsText}>
                Ao clicar no botão acima, você será redirecionado para a página de login.
              </Text>
              <Text style={instructionsText}>
                1. Insira o <strong>mesmo e-mail utilizado na compra</strong>
              </Text>
              <Text style={instructionsText}>
                2. Aguarde até que o botão <strong>"Criar senha"</strong> apareça
              </Text>
              <Text style={instructionsText}>
                3. Clique em "Criar senha" e defina sua senha de acesso
              </Text>
              <Text style={instructionsText}>
                4. Pronto! Agora você já pode acessar sua conta fazendo o login normalmente
              </Text>
            </Section>

            <Hr style={hrStyle} />

            {/* Rodapé com WhatsApp */}
            <Section style={footerSection}>
              <Text style={footer}>
                Este é um e-mail automático, por favor não responda.
              </Text>
              <Text style={footer}>
                Em caso de dúvidas, entre em contato com nosso suporte:{' '}
                <Link href={whatsappUrl} style={whatsappLink}>
                  WhatsApp +55 (19) 99455-9836
                </Link>
              </Text>
              <Text style={footer}>
                Rafael Monteiro - Terapeuta de Relacionamentos
              </Text>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// Estilos
const main: React.CSSProperties = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  padding: '20px',
};

const container: React.CSSProperties = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  maxWidth: '600px',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
};

const headerSection: React.CSSProperties = {
  backgroundColor: '#9d4e7c',
  padding: '30px',
  textAlign: 'center' as const,
  borderTopLeftRadius: '12px',
  borderTopRightRadius: '12px',
};

const h1: React.CSSProperties = {
  color: '#ffffff',
  fontSize: '32px',
  fontWeight: 'bold',
  margin: '0',
  fontFamily: 'Playfair Display, serif',
};

const contentSection: React.CSSProperties = {
  padding: '30px',
};

const greeting: React.CSSProperties = {
  fontSize: '20px',
  fontWeight: 'bold',
  marginBottom: '20px',
  color: '#2c3e50',
  fontFamily: 'Playfair Display, serif',
};

const paragraph: React.CSSProperties = {
  fontSize: '16px',
  lineHeight: '26px',
  marginBottom: '20px',
  color: '#333',
  fontFamily: 'Montserrat, sans-serif',
};

const productBox: React.CSSProperties = {
  backgroundColor: '#f8f4f3',
  borderRadius: '8px',
  padding: '20px',
  marginBottom: '25px',
  border: '1px solid #e9e0dd',
};

const productTitle: React.CSSProperties = {
  fontSize: '18px',
  fontWeight: 'bold',
  marginBottom: '10px',
  color: '#9d4e7c',
  fontFamily: 'Playfair Display, serif',
};

const booksList: React.CSSProperties = {
  fontSize: '15px',
  fontWeight: '600',
  marginBottom: '5px',
  color: '#2c3e50',
};

const bookItem: React.CSSProperties = {
  fontSize: '14px',
  marginLeft: '15px',
  marginBottom: '3px',
  color: '#4b5563',
};

const productPriceStyle: React.CSSProperties = {
  fontSize: '18px',
  fontWeight: 'bold',
  color: '#10b981',
  marginTop: '15px',
};

const buttonSection: React.CSSProperties = {
  textAlign: 'center' as const,
  marginTop: '30px',
  marginBottom: '30px',
};

const button: React.CSSProperties = {
  backgroundColor: '#9d4e7c',
  borderRadius: '40px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '15px 30px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
};

// Estilos para as instruções
const instructionsBox: React.CSSProperties = {
  backgroundColor: '#f0f9ff',
  borderRadius: '8px',
  padding: '20px',
  marginBottom: '25px',
  borderLeft: '4px solid #3b82f6',
};

const instructionsTitle: React.CSSProperties = {
  fontSize: '16px',
  fontWeight: 'bold',
  marginBottom: '12px',
  color: '#1e3a8a',
};

const instructionsText: React.CSSProperties = {
  fontSize: '14px',
  lineHeight: '22px',
  marginBottom: '8px',
  color: '#1e3a8a',
};

// Estilo para o Hr (corrigido)
const hrStyle: React.CSSProperties = {
  borderColor: '#e9e0dd',
  margin: '30px 0',
};

const footerSection: React.CSSProperties = {
  textAlign: 'center' as const,
};

const footer: React.CSSProperties = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '18px',
  marginBottom: '5px',
};

const whatsappLink: React.CSSProperties = {
  color: '#25d366',
  textDecoration: 'none',
  fontWeight: '600',
};

export default PaymentConfirmationEmail;