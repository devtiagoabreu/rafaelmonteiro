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

    try {
      const res = await fetch('/api/livro-1/registrar-acesso', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          productId: selectedProduct?.id
        })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Erro ao registrar')
      }

      window.open(selectedProduct?.mpLink, '_blank')
      onClose()
      router.push('/obrigado')

    } catch (error: any) {
      setErrors({ submit: error.message })
    } finally {
      setIsLoading(false)
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
            <div className="error-message show" style={{ marginBottom: '20px' }}>
              {errors.submit}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nome Completo *</label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className={errors.fullName ? 'error' : ''}
              />
              {errors.fullName && <div className="error-message show">{errors.fullName}</div>}
            </div>

            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <div className="error-message show">{errors.email}</div>}
            </div>

            <div className="form-group">
              <label>Confirmar Email *</label>
              <input
                type="email"
                value={formData.confirmEmail}
                onChange={(e) => setFormData({ ...formData, confirmEmail: e.target.value })}
                className={errors.confirmEmail ? 'error' : ''}
              />
              {errors.confirmEmail && <div className="error-message show">{errors.confirmEmail}</div>}
            </div>

            <div className="form-group">
              <label>Celular com DDD *</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="(11) 99999-9999"
                className={errors.phone ? 'error' : ''}
              />
              {errors.phone && <div className="error-message show">{errors.phone}</div>}
            </div>

            <div className="form-actions">
              <button type="button" className="btn-secondary" onClick={onClose}>
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