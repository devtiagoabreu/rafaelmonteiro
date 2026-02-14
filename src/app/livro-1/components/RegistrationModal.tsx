'use client'

import { useState } from 'react'
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
      newErrors.phone = 'Telefone inválido'
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
          phone: formData.phone,
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
          // Redirecionar para o Mercado Pago
          window.location.href = preferenceData.init_point
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
        <div className="modal-header">
          <h3>Cadastro Obrigatório</h3>
          <button className="close-modal" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="modal-content">
          <div className="form-info">
            <i className="fas fa-info-circle"></i>
            <strong>Importante:</strong> Seu email será utilizado para fazer login no portal e acessar seus livros.
          </div>

          {errors.submit && (
            <div className="error-message show" style={{ 
              marginBottom: '20px', 
              color: '#EF4444', 
              background: '#FEE2E2', 
              padding: '10px', 
              borderRadius: '4px' 
            }}>
              {errors.submit}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fullName">Nome Completo *</label>
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
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
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
            </div>

            <div className="form-group">
              <label htmlFor="confirmEmail">Confirmar Email *</label>
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

            <div className="form-group">
              <label htmlFor="phone">Celular com DDD *</label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="(11) 99999-9999"
                className={errors.phone ? 'error' : ''}
                disabled={isLoading}
              />
              {errors.phone && <div className="error-message show">{errors.phone}</div>}
            </div>

            <div className="form-actions">
              <button type="button" className="btn-secondary" onClick={onClose} disabled={isLoading}>
                Cancelar
              </button>
              <button type="submit" className="btn-primary" disabled={isLoading}>
                {isLoading ? 'Processando...' : isFree ? '✅ Liberar Acesso Gratuito' : '💳 Ir para o Pagamento'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}