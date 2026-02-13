'use client'

import { useState } from 'react'

export default function DownloadMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const downloads = [
    { name: 'Ebook (PDF)', icon: 'fa-file-pdf', url: process.env.NEXT_PUBLIC_BOOK1_PDF_URL },
    { name: 'Audiobook (MP3)', icon: 'fa-headphones', url: process.env.NEXT_PUBLIC_BOOK1_AUDIO_URL },
    { name: 'Podcast', icon: 'fa-podcast', url: process.env.NEXT_PUBLIC_BOOK1_PODCAST_URL },
    { name: 'Videocast', icon: 'fa-video', url: process.env.NEXT_PUBLIC_BOOK1_VIDEO_URL },
    { name: 'Resumo (PDF)', icon: 'fa-file-alt', url: process.env.NEXT_PUBLIC_BOOK1_RESUMO_URL },
    { name: 'Infográfico', icon: 'fa-chart-pie', url: process.env.NEXT_PUBLIC_BOOK1_INFOGRÁFICO_URL }
  ]

  return (
    <div className="menu-item" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
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