// Arquivo: src/app/livro-2/components/BookControls.tsx

'use client'

interface BookControlsProps {
  currentChapter: number
  totalChapters: number
  fontSize: 'small' | 'medium' | 'large'
  onPrevChapter: () => void
  onNextChapter: () => void
  onFontIncrease: () => void
  onFontDecrease: () => void
  onToggleNarration: () => void
  isNarrating: boolean
  onToggleBookmark: () => void
  isBookmarked: boolean
  onShowToc: () => void
}

export default function BookControls({
  currentChapter,
  totalChapters,
  fontSize,
  onPrevChapter,
  onNextChapter,
  onFontIncrease,
  onFontDecrease,
  onToggleNarration,
  isNarrating,
  onToggleBookmark,
  isBookmarked,
  onShowToc
}: BookControlsProps) {
  
  const fontSizeLabels = {
    small: 'Pequena',
    medium: 'Média',
    large: 'Grande'
  }

  return (
    <div className="controls">
      <div className="controls-wrapper">
        <button 
          className="btn" 
          onClick={onPrevChapter}
          disabled={currentChapter === 0}
        >
          <i className="fas fa-arrow-left"></i> Anterior
        </button>
        
        <button className="btn" onClick={onShowToc}>
          <i className="fas fa-list"></i> Sumário
        </button>
        
        <button className="btn" onClick={onToggleNarration}>
          <i className={`fas ${isNarrating ? 'fa-pause' : 'fa-play'}`}></i> 
          {isNarrating ? 'Pausar' : 'Narrar'}
        </button>
        
        <button className="btn" onClick={onToggleBookmark}>
          <i className={`fas ${isBookmarked ? 'fa-bookmark' : 'far fa-bookmark'}`}></i> 
          {isBookmarked ? 'Desmarcar' : 'Marcar'}
        </button>
        
        <div className="font-controls">
          <button onClick={onFontDecrease} title="Diminuir fonte">
            <i className="fas fa-minus"></i>
          </button>
          <span>{fontSizeLabels[fontSize]}</span>
          <button onClick={onFontIncrease} title="Aumentar fonte">
            <i className="fas fa-plus"></i>
          </button>
        </div>
        
        <button 
          className="btn" 
          onClick={onNextChapter}
          disabled={currentChapter === totalChapters - 1}
        >
          Próximo <i className="fas fa-arrow-right"></i>
        </button>
      </div>
    </div>
  )
}