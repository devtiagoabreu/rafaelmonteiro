// src/app/components/SocialSidebar.tsx

'use client'

export default function SocialSidebar() {
  return (
    <div className="social-sidebar right">
      <a 
        href="https://facebook.com" 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="Facebook"
      >
        <i className="fab fa-facebook-f"></i>
      </a>
      <a 
        href="https://instagram.com" 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="Instagram"
      >
        <i className="fab fa-instagram"></i>
      </a>
      <a 
        href="https://tiktok.com" 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="TikTok"
      >
        <i className="fab fa-tiktok"></i>
      </a>
    </div>
  )
}