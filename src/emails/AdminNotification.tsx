// src/emails/AdminNotification.tsx
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
} from '@react-email/components';
import * as React from 'react';

interface AdminNotificationEmailProps {
  userName: string;
  userEmail: string;
  userPhone: string;
  productName: string;
  productPrice: string;
  isCombo?: boolean;
  paymentId: string;
  purchaseDate: string;
}

export const AdminNotificationEmail = ({
  userName,
  userEmail,
  userPhone,
  productName,
  productPrice,
  isCombo = false,
  paymentId,
  purchaseDate,
}: AdminNotificationEmailProps) => {
  const previewText = `💰 Nova venda: ${productName}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={headerSection}>
            <Heading style={h1}>💰 Nova Venda Realizada!</Heading>
          </Section>

          <Section style={contentSection}>
            <Text style={subheading}>Detalhes do Cliente:</Text>
            <Text style={info}>Nome: {userName}</Text>
            <Text style={info}>Email: {userEmail}</Text>
            <Text style={info}>Telefone: {userPhone}</Text>

            <Hr style={hr} />

            <Text style={subheading}>Detalhes da Compra:</Text>
            <Text style={info}>Produto: {productName}</Text>
            <Text style={info}>Valor: R$ {productPrice}</Text>
            <Text style={info}>Tipo: {isCombo ? '📦 COMBO' : '📘 Livro Individual'}</Text>
            <Text style={info}>ID do Pagamento: {paymentId}</Text>
            <Text style={info}>Data: {purchaseDate}</Text>

            <Hr style={hr} />

            <Text style={footer}>
              Este é um e-mail automático de notificação de venda.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// Estilos
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  maxWidth: '600px',
};

const headerSection = {
  backgroundColor: '#10b981',
  padding: '30px',
  textAlign: 'center' as const,
};

const h1 = {
  color: '#ffffff',
  fontSize: '28px',
  fontWeight: 'bold',
  margin: '0',
};

const contentSection = {
  padding: '30px',
};

const subheading = {
  fontSize: '18px',
  fontWeight: 'bold',
  marginBottom: '15px',
  color: '#333',
};

const info = {
  fontSize: '15px',
  lineHeight: '24px',
  marginBottom: '8px',
  color: '#4b5563',
};

const hr = {
  borderColor: '#e5e7eb',
  margin: '25px 0',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
  textAlign: 'center' as const,
  marginTop: '20px',
};

export default AdminNotificationEmail;