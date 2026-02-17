// src/app/livro-1/components/RegistrationModal.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import InputMask from 'react-input-mask'

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
  const [acceptedTerms, setAcceptedTerms] = useState(false)

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

    // Nome completo
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Nome é obrigatório'
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Nome deve ter pelo menos 3 caracteres'
    } else if (!formData.fullName.includes(' ')) {
      newErrors.fullName = 'Digite seu nome completo (com sobrenome)'
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email) {
      newErrors.email = 'Email é obrigatório'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Email inválido'
    }

    // Confirmar email
    if (formData.email !== formData.confirmEmail) {
      newErrors.confirmEmail = 'Os emails não coincidem'
    }

    // Telefone com máscara
    const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/
    if (!formData.phone) {
      newErrors.phone = 'Telefone é obrigatório'
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Telefone inválido. Use (99) 99999-9999'
    }

    // Termos
    if (!acceptedTerms) {
      newErrors.terms = 'Você precisa aceitar os termos para continuar'
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

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFormData(prev => ({ ...prev, phone: value }))
    if (errors.phone) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors.phone
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

      // Registrar usuário no sistema
      const res = await fetch('/api/livro-1/registrar-acesso', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone.replace(/\D/g, ''), // Remove máscara para salvar
          productId: selectedProduct?.id?.toString() || ''
        })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || `Erro ${res.status}: ${res.statusText}`)
      }

      // Fechar modal
      onClose()
      
      // 🔴 FLUXO CORRETO:
      // Se for o Livro 1 (grátis) - redireciona direto para o livro
      if (selectedProduct?.id === 1 || selectedProduct?.price === 0) {
        console.log('📘 Livro grátis - redirecionando para o livro')
        router.push('/livro-1')
      } 
      // Se for produto pago - criar preferência e redirecionar direto para o MP
      else {
        console.log('🔄 Produto pago - criando preferência no Mercado Pago...')
        
        const preferenceResponse = await fetch('/api/criar-preferencia', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            productId: selectedProduct?.id?.toString() || '',
            userEmail: formData.email,
            productTitle: selectedProduct?.title || 'Livro',
            productPrice: selectedProduct?.price || 29.90
          })
        })

        const preferenceData = await preferenceResponse.json()
        console.log('✅ Preferência criada:', preferenceData)

        if (preferenceData.init_point) {
          // 🔴 Usar window.open em vez de window.location.href
          // Isso abre em nova aba e evita que o app capture
          window.open(preferenceData.init_point, '_blank')
        } else {
          alert('Erro ao criar pagamento. Tente novamente.')
        }
      }

    } catch (error: any) {
      console.error('❌ Erro no cadastro:', error)
      setErrors({ submit: error.message || 'Erro ao processar cadastro. Tente novamente.' })
    } finally {
      setIsLoading(false)
    }
  }

  const isFree = selectedProduct?.id === 1 || selectedProduct?.price === 0

  return (
    <div className="modal-overlay active" onClick={onClose}>
      <div className="modal registration-modal" onClick={e => e.stopPropagation()}>
        {/* Header com gradiente */}
        <div className="modal-header" style={{
          background: isFree 
            ? 'linear-gradient(135deg, #10B981, #059669)' 
            : 'linear-gradient(135deg, #4a5fa8, #3a4c8f)',
        }}>
          <div>
            <h3>{isFree ? '🎁 Livro Grátis' : '📚 Finalizar Compra'}</h3>
            <p style={{ fontSize: '0.8rem', opacity: 0.9, marginTop: '3px' }}>
              {isFree 
                ? 'Para acessar o livro 1'
                : 'Crie sua conta e seja redirecionado para o pagamento'}
            </p>
          </div>
          <button className="close-modal" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="modal-content">
          {/* Benefícios em cards */}
          <div className="benefits-grid">
            <div className="benefit-card">
              <span className="benefit-icon">📚</span>
              <span className="benefit-text">Acesso Vitalício</span>
            </div>
            <div className="benefit-card">
              <span className="benefit-icon">🎧</span>
              <span className="benefit-text">Todos os Formatos</span>
            </div>
            <div className="benefit-card">
              <span className="benefit-icon">🔄</span>
              <span className="benefit-text">Atualizações Grátis</span>
            </div>
          </div>

          {/* Informação importante */}
          <div className="info-box">
            <i className="fas fa-info-circle"></i>
            <span>
              <strong>Importante:</strong> Seu email será usado para fazer login no portal. 
              Você receberá as instruções de acesso após a confirmação.
            </span>
          </div>

          {/* Mensagem de erro do servidor */}
          {errors.submit && (
            <div className="error-box">
              <i className="fas fa-exclamation-circle"></i>
              <span>{errors.submit}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Nome Completo */}
            <div className="form-group">
              <label htmlFor="fullName">
                Nome Completo <span className="required">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className={errors.fullName ? 'error' : ''}
                disabled={isLoading}
                placeholder="Digite seu nome completo"
              />
              {errors.fullName && <div className="error-message show">{errors.fullName}</div>}
              <small className="field-hint">Ex: João Silva Santos</small>
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">
                Email <span className="required">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                className={errors.email ? 'error' : ''}
                disabled={isLoading}
                placeholder="seu@email.com"
              />
              {errors.email && <div className="error-message show">{errors.email}</div>}
              <small className="field-hint">Usado para login no portal</small>
            </div>

            {/* Confirmar Email */}
            <div className="form-group">
              <label htmlFor="confirmEmail">
                Confirmar Email <span className="required">*</span>
              </label>
              <input
                type="email"
                id="confirmEmail"
                value={formData.confirmEmail}
                onChange={handleInputChange}
                className={errors.confirmEmail ? 'error' : ''}
                disabled={isLoading}
                placeholder="confirme seu email"
              />
              {errors.confirmEmail && <div className="error-message show">{errors.confirmEmail}</div>}
            </div>

            {/* Telefone com máscara */}
            <div className="form-group">
              <label htmlFor="phone">
                Celular com DDD <span className="required">*</span>
              </label>
              <InputMask
                mask="(99) 99999-9999"
                maskChar={null}
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={handlePhoneChange}
                className={errors.phone ? 'error' : ''}
                disabled={isLoading}
                placeholder="(11) 99999-9999"
              />
              {errors.phone && <div className="error-message show">{errors.phone}</div>}
              <small className="field-hint">Para contato e recuperação de senha</small>
            </div>

            {/* Termos de uso */}
            <div className="terms-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => {
                    setAcceptedTerms(e.target.checked)
                    if (errors.terms) {
                      setErrors(prev => {
                        const newErrors = { ...prev }
                        delete newErrors.terms
                        return newErrors
                      })
                    }
                  }}
                />
                <span>
                  Concordo com os <a href="/termos" target="_blank">termos de uso</a> e 
                  autorizo o recebimento de comunicações por email
                </span>
              </label>
              {errors.terms && <div className="error-message show">{errors.terms}</div>}
            </div>

            {/* Botões */}
            <div className="form-actions">
              <button 
                type="button" 
                className="btn-secondary" 
                onClick={onClose} 
                disabled={isLoading}
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                className="btn-primary" 
                disabled={isLoading || !acceptedTerms}
                style={{
                  background: isFree 
                    ? 'linear-gradient(135deg, #10B981, #059669)'
                    : 'linear-gradient(135deg, #4a5fa8, #3a4c8f)',
                  opacity: (!acceptedTerms || isLoading) ? 0.7 : 1,
                }}
              >
                {isLoading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    Processando...
                  </>
                ) : isFree ? (
                  '✅ Liberar Acesso Gratuito'
                ) : (
                  '💳 Ir para o Pagamento'
                )}
              </button>
            </div>

            {/* Aviso de segurança */}
            <div className="security-note">
              <i className="fas fa-lock"></i>
              <span>Seus dados estão seguros. Pagamento processado pelo Mercado Pago.</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}