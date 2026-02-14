'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface RegistrationModalProps {
  isOpen: boolean
  onClose: () => void
  selectedProduct: any
}

export default function RegistrationModal({ isOpen, onClose, selectedProduct }: RegistrationModalProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    confirmEmail: '',
    phone: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  // Prevenir scroll do body quando modal está aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Nome é obrigatório'
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Nome deve ter pelo menos 3 caracteres'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email) {
      newErrors.email = 'Email é obrigatório'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Email inválido'
    }

    if (formData.email !== formData.confirmEmail) {
      newErrors.confirmEmail = 'Os emails não coincidem'
    }

    const cleanPhone = formData.phone.replace(/\D/g, '')
    if (!formData.phone) {
      newErrors.phone = 'Telefone é obrigatório'
    } else if (cleanPhone.length < 10 || cleanPhone.length > 11) {
      newErrors.phone = 'Telefone inválido. Use (11) 99999-9999'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
    if (errors[id]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[id]
        return newErrors
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsLoading(true)
    setErrors({})

    try {
      console.log('📝 Enviando dados de cadastro:', {
        ...formData,
        productId: selectedProduct?.id
      })

      const res = await fetch('/api/livro-1/registrar-acesso', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          productId: selectedProduct?.id?.toString() || ''
        })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || `Erro ${res.status}: ${res.statusText}`)
      }

      onClose()
      
      // Se for produto grátis (id=1 ou price=0 ou isFree=true)
      if (selectedProduct?.id === 1 || selectedProduct?.price === 0 || selectedProduct?.isFree) {
        console.log('📘 Produto grátis - redirecionando para o livro')
        router.push('/livro-1')
      } else {
        // Se for produto pago, abre link do Mercado Pago
        console.log('💳 Produto pago - abrindo link de pagamento')
        if (selectedProduct?.mpLink) {
          window.open(selectedProduct.mpLink, '_blank')
        } else {
          console.error('❌ Link de pagamento não encontrado')
        }
      }

    } catch (error: any) {
      console.error('❌ Erro no cadastro:', error)
      setErrors({ submit: error.message || 'Erro ao processar cadastro. Tente novamente.' })
    } finally {
      setIsLoading(false)
    }
  }

  // Determinar se é produto grátis ou pago
  const isFree = selectedProduct?.price === 0 || selectedProduct?.id === 1 || selectedProduct?.isFree

  return (
    <div 
      className="modal-overlay active" 
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '20px'
      }}
    >
      <div 
        className="modal registration-modal" 
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: '550px',
          width: '100%',
          maxHeight: 'calc(100vh - 40px)',
          backgroundColor: 'white',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* HEADER DO MODAL - FIXO */}
        <div style={{
          background: isFree 
            ? 'linear-gradient(145deg, #10B981 0%, #059669 100%)' 
            : 'linear-gradient(145deg, #4f46e5 0%, #7c3aed 100%)',
          padding: '24px 30px',
          position: 'relative',
          overflow: 'hidden',
          flexShrink: 0
        }}>
          {/* Elementos decorativos de fundo */}
          <div style={{
            position: 'absolute',
            top: -20,
            right: -20,
            width: 150,
            height: 150,
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '50%'
          }} />
          <div style={{
            position: 'absolute',
            bottom: -30,
            left: -30,
            width: 200,
            height: 200,
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '50%'
          }} />
          
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {isFree ? (
                  <span style={{
                    background: 'rgba(255,255,255,0.2)',
                    padding: '6px 14px',
                    borderRadius: '30px',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    backdropFilter: 'blur(5px)',
                    color: 'white'
                  }}>
                    🎁 COMPLETAMENTE GRÁTIS
                  </span>
                ) : (
                  <span style={{
                    background: 'rgba(255,255,255,0.2)',
                    padding: '6px 14px',
                    borderRadius: '30px',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    backdropFilter: 'blur(5px)',
                    color: 'white'
                  }}>
                    💳 OFERTA ESPECIAL
                  </span>
                )}
              </div>
              <button 
                onClick={onClose}
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  border: 'none',
                  color: 'white',
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '1.2rem',
                  backdropFilter: 'blur(5px)',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <h3 style={{ 
              fontSize: '1.8rem', 
              fontWeight: 'bold', 
              marginBottom: 5,
              color: 'white',
              textShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}>
              {isFree ? '📘 Livro Grátis' : '🛒 Finalizar Compra'}
            </h3>
            
            <p style={{ 
              fontSize: '1rem', 
              opacity: 0.95,
              color: 'white'
            }}>
              {isFree 
                ? 'Crie seu perfil para acessar o livro gratuitamente'
                : 'Crie seu perfil e seja redirecionado para o pagamento'}
            </p>
          </div>
        </div>
        
        {/* CONTEÚDO DO MODAL - COM SCROLL */}
        <div style={{
          padding: '24px 30px',
          overflowY: 'auto',
          flex: 1
        }}>
          
          {/* BENEFÍCIOS EM CARDS */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '8px',
            marginBottom: '20px'
          }}>
            <div style={{
              background: '#f0f9ff',
              padding: '10px',
              borderRadius: '10px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '22px', marginBottom: '3px' }}>📚</div>
              <div style={{ fontSize: '12px', fontWeight: '600', color: '#0369a1' }}>Acesso Vitalício</div>
            </div>
            <div style={{
              background: '#f0f9ff',
              padding: '10px',
              borderRadius: '10px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '22px', marginBottom: '3px' }}>🎧</div>
              <div style={{ fontSize: '12px', fontWeight: '600', color: '#0369a1' }}>Todos os Formatos</div>
            </div>
            <div style={{
              background: '#f0f9ff',
              padding: '10px',
              borderRadius: '10px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '22px', marginBottom: '3px' }}>🔄</div>
              <div style={{ fontSize: '12px', fontWeight: '600', color: '#0369a1' }}>Atualizações Grátis</div>
            </div>
          </div>

          {/* EXPLICAÇÃO DETALHADA */}
          <div style={{
            background: '#f8fafc',
            borderLeft: '4px solid #4f46e5',
            padding: '14px',
            borderRadius: '8px',
            marginBottom: '20px'
          }}>
            <p style={{ margin: 0, color: '#334155', fontSize: '0.9rem', lineHeight: '1.5' }}>
              <strong>📌 Por que se cadastrar?</strong><br />
              Seu cadastro cria um perfil onde você poderá acessar todos os seus livros adquiridos, fazer download dos materiais e acompanhar sua jornada. Mesmo sendo <strong>gratuito e vitalício</strong>, precisamos do seu email para liberar seu acesso exclusivo.
            </p>
          </div>

          {/* MENSAGEM DE ERRO */}
          {errors.submit && (
            <div style={{
              background: '#fee2e2',
              borderLeft: '4px solid #dc2626',
              padding: '12px',
              borderRadius: '6px',
              marginBottom: '20px'
            }}>
              <p style={{ color: '#991b1b', margin: 0, fontSize: '0.9rem' }}>
                <strong>❌ Erro:</strong> {errors.submit}
              </p>
            </div>
          )}

          {/* FORMULÁRIO */}
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '16px' }}>
              <label htmlFor="fullName" style={{
                display: 'block',
                marginBottom: '6px',
                fontWeight: '600',
                color: '#1e293b',
                fontSize: '0.9rem'
              }}>
                Nome Completo <span style={{ color: '#dc2626' }}>*</span>
              </label>
              <input
                type="text"
                id="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                disabled={isLoading}
                placeholder="Digite seu nome completo"
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  border: `2px solid ${errors.fullName ? '#dc2626' : '#e2e8f0'}`,
                  borderRadius: '8px',
                  fontSize: '0.95rem',
                  transition: 'all 0.3s ease',
                  outline: 'none'
                }}
              />
              {errors.fullName && (
                <div style={{ color: '#dc2626', fontSize: '0.8rem', marginTop: '4px' }}>
                  {errors.fullName}
                </div>
              )}
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label htmlFor="email" style={{
                display: 'block',
                marginBottom: '6px',
                fontWeight: '600',
                color: '#1e293b',
                fontSize: '0.9rem'
              }}>
                Email <span style={{ color: '#dc2626' }}>*</span>
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={isLoading}
                placeholder="seu@email.com"
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  border: `2px solid ${errors.email ? '#dc2626' : '#e2e8f0'}`,
                  borderRadius: '8px',
                  fontSize: '0.95rem',
                  transition: 'all 0.3s ease',
                  outline: 'none'
                }}
              />
              {errors.email && (
                <div style={{ color: '#dc2626', fontSize: '0.8rem', marginTop: '4px' }}>
                  {errors.email}
                </div>
              )}
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label htmlFor="confirmEmail" style={{
                display: 'block',
                marginBottom: '6px',
                fontWeight: '600',
                color: '#1e293b',
                fontSize: '0.9rem'
              }}>
                Confirmar Email <span style={{ color: '#dc2626' }}>*</span>
              </label>
              <input
                type="email"
                id="confirmEmail"
                value={formData.confirmEmail}
                onChange={handleInputChange}
                disabled={isLoading}
                placeholder="confirme seu email"
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  border: `2px solid ${errors.confirmEmail ? '#dc2626' : '#e2e8f0'}`,
                  borderRadius: '8px',
                  fontSize: '0.95rem',
                  transition: 'all 0.3s ease',
                  outline: 'none'
                }}
              />
              {errors.confirmEmail && (
                <div style={{ color: '#dc2626', fontSize: '0.8rem', marginTop: '4px' }}>
                  {errors.confirmEmail}
                </div>
              )}
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="phone" style={{
                display: 'block',
                marginBottom: '6px',
                fontWeight: '600',
                color: '#1e293b',
                fontSize: '0.9rem'
              }}>
                Celular com DDD <span style={{ color: '#dc2626' }}>*</span>
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="(11) 99999-9999"
                disabled={isLoading}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  border: `2px solid ${errors.phone ? '#dc2626' : '#e2e8f0'}`,
                  borderRadius: '8px',
                  fontSize: '0.95rem',
                  transition: 'all 0.3s ease',
                  outline: 'none'
                }}
              />
              {errors.phone && (
                <div style={{ color: '#dc2626', fontSize: '0.8rem', marginTop: '4px' }}>
                  {errors.phone}
                </div>
              )}
            </div>

            {/* TERMOS E CONDIÇÕES */}
            <div style={{
              background: '#f1f5f9',
              padding: '12px',
              borderRadius: '8px',
              marginBottom: '20px',
              fontSize: '0.85rem',
              color: '#475569'
            }}>
              <input type="checkbox" id="terms" defaultChecked style={{ marginRight: '8px' }} />
              <label htmlFor="terms">
                Concordo em receber novidades e conteúdos exclusivos por email. (Você pode cancelar a qualquer momento)
              </label>
            </div>

            {/* BOTÕES - AGORA SEMPRE VISÍVEIS */}
            <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
              <button 
                type="button" 
                onClick={onClose} 
                disabled={isLoading}
                style={{
                  flex: 1,
                  padding: '14px',
                  background: '#e2e8f0',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: '#475569',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  opacity: isLoading ? 0.7 : 1
                }}
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                disabled={isLoading}
                style={{
                  flex: 2,
                  padding: '14px',
                  background: isFree 
                    ? 'linear-gradient(145deg, #10B981 0%, #059669 100%)'
                    : 'linear-gradient(145deg, #4f46e5 0%, #7c3aed 100%)',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: 'white',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  opacity: isLoading ? 0.7 : 1,
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}
              >
                {isLoading ? 'Processando...' : isFree ? '✅ Liberar Acesso Gratuito' : '💳 Ir para o Pagamento'}
              </button>
            </div>

            {/* AVISO DE SEGURANÇA */}
            <div style={{
              marginTop: '16px',
              textAlign: 'center',
              fontSize: '0.8rem',
              color: '#94a3b8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}>
              <span>🔒</span>
              <span>Seus dados estão seguros. Não compartilhamos informações.</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}