'use client'

interface NavbarControlsProps {
  onThemeToggle: () => void
  onFontIncrease: () => void
  onFontDecrease: () => void
  onNarrate: () => void
  isNarrating: boolean
  currentTheme: 'dark' | 'light'
}

export default function NavbarControls({
  onThemeToggle,
  onFontIncrease,
  onFontDecrease,
  onNarrate,
  isNarrating,
  currentTheme
}: NavbarControlsProps) {
  return (
    <div className="navbar-controls">
      <button
        onClick={onThemeToggle}
        className="navbar-btn"
        title={currentTheme === 'dark' ? 'Mudar para modo claro' : 'Mudar para modo escuro'}
      >
        <i className={`fas fa-${currentTheme === 'dark' ? 'sun' : 'moon'}`}></i>
      </button>

      <button
        onClick={onFontIncrease}
        className="navbar-btn"
        title="Aumentar fonte"
      >
        <i className="fas fa-search-plus"></i>
      </button>

      <button
        onClick={onFontDecrease}
        className="navbar-btn"
        title="Diminuir fonte"
      >
        <i className="fas fa-search-minus"></i>
      </button>

      <button
        onClick={onNarrate}
        className="navbar-btn"
        title={isNarrating ? 'Parar narração' : 'Narrar página'}
      >
        <i className={`fas fa-${isNarrating ? 'stop' : 'volume-up'}`}></i>
      </button>
    </div>
  )
}