'use client'

import { useState } from 'react'

export default function DownloadMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const downloads = [
    { name: 'Ebook (PDF)', icon: 'fa-file-pdf', url: 'https://drive.google.com/file/d/1WqAqdz4hoVTGd1ZPTRzYTw5rSxBjUAAA/view' },
    { name: 'Audiobook (MP3)', icon: 'fa-headphones', url: 'https://drive.google.com/file/d/1GA4WEwRwR0jVXv6YT2xEPGYrbgOIcTTk/view' },
    { name: 'Podcast', icon: 'fa-podcast', url: 'https://drive.google.com/file/d/1TvsqSzbafuAzsDQSJPLbke1krHRmlvpl/view' },
    { name: 'Videocast', icon: 'fa-video', url: 'https://drive.google.com/file/d/15kphZuS991O-bJrxS07jaP37tjldr0kQ/view' },
    { name: 'Resumo (PDF)', icon: 'fa-file-alt', url: 'https://drive.google.com/file/d/1-gGQO5QQDQsuB5_CVPzDuuQ2YA809dod/view' },
    { name: 'Infográfico', icon: 'fa-chart-pie', url: 'https://drive.google.com/file/d/1fq31WVqTLskDU50Bk9qYmkeIXQu8OIro/view' }
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