//  Arquivo: src/app/livro-2/components/DownloadMenu.tsx

'use client'

import { useState } from 'react'

export default function DownloadMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const downloads = [
    { name: 'Ebook (PDF)', icon: 'fa-file-pdf', url: '#' },
    { name: 'Audiobook (MP3)', icon: 'fa-headphones', url: '#' },
    { name: 'Podcast', icon: 'fa-podcast', url: '#' },
    { name: 'Resumo (PDF)', icon: 'fa-file-alt', url: '#' },
  ]

  return (
    <div 
      className="menu-item" 
      onMouseEnter={() => setIsOpen(true)} 
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="menu-btn">
        <i className="fas fa-download"></i>
        <span>Downloads</span>
      </button>
      
      {isOpen && (
        <div className="submenu">
          {downloads.map((item, index) => (
            <a
              key={index}
              href={item.url}
              className="submenu-item"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className={`fas ${item.icon}`}></i>
              <span>{item.name}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}