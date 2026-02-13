'use client'

import { Chapter } from '@/types'

interface BookmarksModalProps {
  isOpen: boolean
  onClose: () => void
  bookmarks: number[]
  chapters: Chapter[]
  onSelectChapter: (index: number) => void
}

export default function BookmarksModal({ 
  isOpen, 
  onClose, 
  bookmarks, 
  chapters,
  onSelectChapter 
}: BookmarksModalProps) {
  if (!isOpen) return null

  return (
    <div className="modal-overlay active" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Páginas Marcadas</h3>
          <button className="close-modal" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="modal-content">
          <ul className="bookmarks-list">
            {bookmarks.length === 0 ? (
              <li className="bookmark-item empty">
                Nenhuma página marcada ainda.
              </li>
            ) : (
              [...bookmarks].sort((a, b) => a - b).map(chapterIndex => {
                const chapter = chapters[chapterIndex]
                return (
                  <li 
                    key={chapterIndex}
                    className="bookmark-item"
                    onClick={() => {
                      onSelectChapter(chapterIndex)
                      onClose()
                    }}
                  >
                    <i className="fas fa-bookmark"></i>
                    <div>
                      <strong>{chapter.title}</strong>
                      <div style={{ fontSize: '0.9rem', color: '#718096' }}>
                        Página {chapterIndex + 1}
                      </div>
                    </div>
                  </li>
                )
              })
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}