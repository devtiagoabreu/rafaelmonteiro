'use client'

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  bookTitle: string
}

export default function ShareModal({ isOpen, onClose, bookTitle }: ShareModalProps) {
  if (!isOpen) return null

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareText = `Estou lendo "${bookTitle}" - um livro incrível sobre relacionamentos e intimidade. Recomendo muito!`

  const handleShare = (network: string) => {
    let shareWindowUrl = ''

    switch(network) {
      case 'facebook':
        shareWindowUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
        break
      case 'twitter':
        shareWindowUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
        break
      case 'whatsapp':
        shareWindowUrl = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`
        break
      case 'instagram':
        navigator.clipboard.writeText(shareUrl)
        alert('Link copiado! Compartilhe no Instagram')
        return
    }

    if (shareWindowUrl) {
      window.open(shareWindowUrl, '_blank', 'width=600,height=400')
    }
    onClose()
  }

  return (
    <div className="modal-overlay active" onClick={onClose}>
      <div className="modal share-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Compartilhar nas Redes Sociais</h3>
          <button className="close-modal" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="modal-content">
          <p style={{ marginBottom: '20px' }}>Compartilhe este livro incrível com seus amigos!</p>
          
          <div className="share-options">
            <div className="share-option" onClick={() => handleShare('facebook')}>
              <div className="share-icon facebook">
                <i className="fab fa-facebook-f"></i>
              </div>
              <div className="share-text">
                <h4>Facebook</h4>
                <p>Compartilhe com seus amigos</p>
              </div>
            </div>
            
            <div className="share-option" onClick={() => handleShare('twitter')}>
              <div className="share-icon twitter">
                <i className="fab fa-twitter"></i>
              </div>
              <div className="share-text">
                <h4>Twitter</h4>
                <p>Compartilhe com seus seguidores</p>
              </div>
            </div>
            
            <div className="share-option" onClick={() => handleShare('whatsapp')}>
              <div className="share-icon whatsapp">
                <i className="fab fa-whatsapp"></i>
              </div>
              <div className="share-text">
                <h4>WhatsApp</h4>
                <p>Compartilhe com seus contatos</p>
              </div>
            </div>
            
            <div className="share-option" onClick={() => handleShare('instagram')}>
              <div className="share-icon instagram">
                <i className="fab fa-instagram"></i>
              </div>
              <div className="share-text">
                <h4>Instagram</h4>
                <p>Compartilhe em suas histórias</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}