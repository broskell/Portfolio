export function MaterialIcon({ name, className = '' }) {
  return (
    <span className={`material-symbols-outlined ${className}`} aria-hidden="true">
      {name}
    </span>
  )
}

export function ChipLogo({ chip }) {
  if (chip.custom === 'kaggle') {
    return (
      <div className="chip-logo flex items-center justify-center bg-[#20BEFF]/10 rounded text-[#20BEFF] font-bold text-xs">
        K
      </div>
    )
  }
  if (chip.custom === 'orange') {
    return (
      <div className="chip-logo flex items-center justify-center rounded" style={{ background: 'rgba(255,120,0,0.12)' }}>
        <svg viewBox="0 0 28 28" width="22" height="22">
          <circle cx="14" cy="14" r="10" fill="none" stroke="#ff7800" strokeWidth="2.5" />
          <circle cx="14" cy="14" r="4" fill="#ff7800" />
        </svg>
      </div>
    )
  }
  if (chip.custom === 'groq') {
    return (
      <div className="chip-logo flex items-center justify-center rounded text-xs font-black" style={{ background: 'rgba(249,115,22,0.15)', color: '#f97316' }}>
        G
      </div>
    )
  }
  if (chip.custom === 'burp') {
    return (
      <div className="chip-logo flex items-center justify-center rounded" style={{ background: 'rgba(255,102,0,0.15)' }}>
        <svg viewBox="0 0 28 28" width="22" height="22">
          <path d="M14 4 L22 10 L22 20 L14 24 L6 20 L6 10 Z" fill="none" stroke="#ff6600" strokeWidth="2" />
          <circle cx="14" cy="14" r="3" fill="#ff6600" />
        </svg>
      </div>
    )
  }
  if (chip.custom === 'owasp') {
    return (
      <div className="chip-logo flex items-center justify-center rounded bg-blue-900/20">
        <span className="text-[10px] font-black text-blue-400">OW</span>
      </div>
    )
  }
  return (
    <img
      className="chip-logo"
      src={chip.icon}
      alt={chip.name}
      style={chip.bright ? { filter: 'grayscale(0%) brightness(2)' } : undefined}
    />
  )
}

export function SkillChip({ chip }) {
  return (
    <div
      className={`chip bg-neutral-900 rounded-xl px-4 py-3 flex items-center gap-3 ${chip.dashed ? 'chip-dashed' : ''}`}
    >
      <ChipLogo chip={chip} />
      <span className="font-bold text-sm text-white">{chip.name}</span>
      {chip.learning && (
        <span className="font-mono text-[10px] text-yellow-700 bg-yellow-400/8 border border-yellow-900/30 px-2 py-0.5 rounded ml-1">
          Learning
        </span>
      )}
    </div>
  )
}
