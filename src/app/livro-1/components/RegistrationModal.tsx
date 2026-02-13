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
      newErrors.confirmEmail = 'Emails não coincidem'
    }

    const phoneRegex = /^\(?[1-9]{2}\)? ?9?[0-9]{4}-?[0-9]{4}$/
    const cleanPhone = formData.phone.replace(/\D/g, '')
    if (!formData.phone) {
      newErrors.phone = 'Telefone é obrigatório'
    } else if (cleanPhone.length < 10 || cleanPhone.length > 11) {
      newErrors.phone = 'Telefone inválido'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsLoading(true)
    setErrors({})

    try {
      console.log('Enviando dados:', {
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
      console.log('Resposta da API:', data)

      if (!res.ok) {
        throw new Error(data.error || `Erro ${res.status}: ${res.statusText}`)
      }

      // Sucesso - abrir link do Mercado Pago
      if (selectedProduct?.mpLink) {
        window.open(selectedProduct.mpLink, '_blank')
      }
      
      onClose()
      
      // Mostrar mensagem de sucesso
      alert('Cadastro realizado com sucesso! Você será redirecionado para o pagamento.')

    } catch (error: any) {
      console.error('Erro no cadastro:', error)
      setErrors({ submit: error.message || 'Erro ao processar cadastro. Tente novamente.' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
    // Limpar erro do campo quando começar a digitar
    if (errors[id]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[id]
        return newErrors
      })
    }
  }

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
            <div className="error-message show" style={{ marginBottom: '20px', color: '#EF4444', background: '#FEE2E2', padding: '10px', borderRadius: '4px' }}>
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
                {isLoading ? 'Processando...' : 'Confirmar Cadastro'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}