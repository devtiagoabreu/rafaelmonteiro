import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';

export async function GET() {
  console.log('🧪 ===== TESTANDO SISTEMA DE E-MAIL =====');
  
  try {
    const result = await sendEmail({
      to: 'rafaelmonteiroterapeuta@gmail.com',
      subject: '🧪 Teste do Novo Sistema de E-mail - Nodemailer',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e9e0dd; border-radius: 10px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #9d4e7c; font-family: 'Playfair Display', serif;">📧 Teste de E-mail</h1>
          </div>
          
          <div style="background: linear-gradient(135deg, #9d4e7c, #c49a6c); color: white; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
            <h2 style="margin: 0; font-family: 'Playfair Display', serif;">Rafael Monteiro</h2>
            <p style="margin: 5px 0 0; opacity: 0.9;">Terapeuta de Relacionamentos</p>
          </div>
          
          <div style="background: #f8f4f3; padding: 20px; border-radius: 10px;">
            <p style="color: #2c3e50; line-height: 1.6;">Olá Rafael,</p>
            <p style="color: #2c3e50; line-height: 1.6;">Este é um e-mail de teste do novo sistema usando <strong>Gmail SMTP + Nodemailer</strong>.</p>
            
            <div style="background: white; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #9d4e7c;">
              <p style="margin: 0; color: #6b5a53;"><strong>Configuração testada:</strong></p>
              <p style="margin: 5px 0 0; color: #6b5a53;">✅ Senha de aplicativo configurada</p>
              <p style="margin: 5px 0 0; color: #6b5a53;">✅ SMTP do Gmail funcionando</p>
              <p style="margin: 5px 0 0; color: #6b5a53;">✅ Nodemailer integrado</p>
            </div>
            
            <p style="color: #2c3e50;">Se você está lendo isso, o sistema está <strong style="color: #10b981;">funcionando perfeitamente!</strong> 🎉</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9e0dd;">
            <p style="color: #9c837a; font-size: 0.9rem;">Enviado em: ${new Date().toLocaleString('pt-BR')}</p>
            <p style="color: #9c837a; font-size: 0.8rem;">Este é um e-mail automático de teste</p>
          </div>
        </div>
      `
    });
    
    console.log('✅ Resultado do teste:', result);
    
    return NextResponse.json({ 
      success: true, 
      message: 'E-mail de teste enviado com sucesso!',
      result 
    });
  } catch (error) {
    console.error('❌ Erro no teste de e-mail:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : null
    }, { status: 500 });
  }
}