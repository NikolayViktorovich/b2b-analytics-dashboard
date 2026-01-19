import { useState, useRef, useEffect } from 'react'
import Calendar from '@/components/ui/Calendar'

interface Props {
  value: { start: string; end: string }
  onChange: (value: { start: string; end: string }) => void
}

const PeriodSelector = ({ value, onChange }: Props) => {
  const [showStartCalendar, setShowStartCalendar] = useState(false)
  const [showEndCalendar, setShowEndCalendar] = useState(false)
  const [showPresets, setShowPresets] = useState(false)
  const startBtnRef = useRef<HTMLButtonElement>(null)
  const endBtnRef = useRef<HTMLButtonElement>(null)
  const presetsBtnRef = useRef<HTMLButtonElement>(null)

  const fmt = (dateStr: string) => {
    if (!dateStr) return 'Выберите дату'
    const d = new Date(dateStr)
    return d.toLocaleDateString('ru-RU', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    })
  }

  const handlePreset = (preset: string) => {
    const now = new Date()
    const end = now.toISOString().split('T')[0]
    let start = ''

    switch (preset) {
      case 'today': {
        start = end
        break
      }
      case 'week': {
        const wk = new Date(now)
        wk.setDate(now.getDate() - 7)
        start = wk.toISOString().split('T')[0]
        break
      }
      case 'month': {
        const mo = new Date(now)
        mo.setMonth(now.getMonth() - 1)
        start = mo.toISOString().split('T')[0]
        break
      }
      case 'quarter': {
        const qtr = new Date(now)
        qtr.setMonth(now.getMonth() - 3)
        start = qtr.toISOString().split('T')[0]
        break
      }
      case 'year': {
        const yr = new Date(now)
        yr.setFullYear(now.getFullYear() - 1)
        start = yr.toISOString().split('T')[0]
        break
      }
    }

    onChange({ start, end })
    setShowPresets(false)
  }

  const handleReset = () => {
    onChange({ start: '', end: '' })
  }
  const containerStyle: React.CSSProperties = {
    background: 'transparent',
    border: 'none',
    borderRadius: '0',
    padding: '0 0 24px 0',
    marginBottom: '24px',
  }

  const titleStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: 500,
    marginBottom: '16px',
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  }

  const controlsStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '20px',
    flexWrap: 'wrap',
  }

  const datesStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flexWrap: 'wrap',
  }

  const inputStyle: React.CSSProperties = {
    background: 'var(--bg-card)',
    border: '1px solid var(--border-color)',
    borderRadius: '10px',
    padding: '10px 14px',
    color: 'var(--text-primary)',
    fontSize: '14px',
    minWidth: '160px',
    transition: 'border-color 0.2s',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '8px',
  }

  const actionsStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flexWrap: 'wrap',
  }

  const btnPrim: React.CSSProperties = {
    background: 'var(--accent-primary)',
    color: 'var(--bg-primary)',
    padding: '10px 20px',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: 600,
    transition: 'all 0.2s',
  }

  const btnSec: React.CSSProperties = {
    background: 'var(--bg-card)',
    border: '1px solid var(--border-color)',
    color: 'var(--text-secondary)',
    padding: '10px 16px',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: 500,
    transition: 'all 0.2s',
  }

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Выбрать период</h1>
      
      <div style={controlsStyle}>
        <div style={datesStyle}>
          <button 
            ref={startBtnRef}
            style={inputStyle}
            onClick={() => setShowStartCalendar(!showStartCalendar)}
          >
            <span>{fmt(value.start)}</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="2" y="3" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M5 1v3M11 1v3M2 6h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
          <span style={{ color: 'var(--text-secondary)', fontSize: '18px' }}>→</span>
          <button 
            ref={endBtnRef}
            style={inputStyle}
            onClick={() => setShowEndCalendar(!showEndCalendar)}
          >
            <span>{fmt(value.end)}</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="2" y="3" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M5 1v3M11 1v3M2 6h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div style={actionsStyle}>
          <button 
            ref={presetsBtnRef}
            style={btnSec}
            onClick={() => setShowPresets(!showPresets)}
            title="Быстрый выбор периода"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </button>
          <button style={btnPrim}>Применить</button>
          <button style={btnSec} onClick={handleReset}>Сбросить</button>
        </div>
      </div>

      {showPresets && (
        <PresetsMenu
          anchorEl={presetsBtnRef.current}
          onSelect={handlePreset}
          onClose={() => setShowPresets(false)}
        />
      )}

      {showStartCalendar && (
        <Calendar
          value={value.start}
          onChange={(date) => {
            onChange({ ...value, start: date })
            setShowStartCalendar(false)
          }}
          onClose={() => setShowStartCalendar(false)}
          anchorEl={startBtnRef.current}
        />
      )}

      {showEndCalendar && (
        <Calendar
          value={value.end}
          onChange={(date) => {
            onChange({ ...value, end: date })
            setShowEndCalendar(false)
          }}
          onClose={() => setShowEndCalendar(false)}
          anchorEl={endBtnRef.current}
        />
      )}
    </div>
  )
}

export default PeriodSelector

interface PresetsMenuProps {
  anchorEl: HTMLElement | null
  onSelect: (preset: string) => void
  onClose: () => void
}

const PresetsMenu = ({ anchorEl, onSelect, onClose }: PresetsMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ top: 0, left: 0 })

  useEffect(() => {
    if (anchorEl && menuRef.current) {
      const anchorRect = anchorEl.getBoundingClientRect()
      const menuRect = menuRef.current.getBoundingClientRect()
      
      let top = anchorRect.bottom + 8
      let left = anchorRect.left
      
      if (left + menuRect.width > window.innerWidth) {
        left = anchorRect.right - menuRect.width
      }
      
      if (top + menuRect.height > window.innerHeight) {
        top = anchorRect.top - menuRect.height - 8
      }
      
      setPosition({ top, left })
    }
  }, [anchorEl])

  useEffect(() => {
    const onClickOut = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        anchorEl &&
        !anchorEl.contains(event.target as Node)
      ) {
        onClose()
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('mousedown', onClickOut)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', onClickOut)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [onClose, anchorEl])

  const presets = [
    { 
      id: 'today', 
      label: 'Сегодня',
      icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="3" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M5 1v3M13 1v3M2 7h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="9" cy="11" r="1.5" fill="currentColor"/></svg>
    },
    { 
      id: 'week', 
      label: 'Последние 7 дней',
      icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="3" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M5 1v3M13 1v3M2 7h14M5 10h2M9 10h2M13 10h2M5 13h2M9 13h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
    },
    { 
      id: 'month', 
      label: 'Последний месяц',
      icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="3" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M5 1v3M13 1v3M2 7h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M5 10h8M5 13h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
    },
    { 
      id: 'quarter', 
      label: 'Последние 3 месяца',
      icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2 9l4-4 3 3 7-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 2v4m0-4h-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 16h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
    },
    { 
      id: 'year', 
      label: 'Последний год',
      icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2 13l3-3 3 2 4-4 4 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 16h14M2 4h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="5" cy="7" r="1" fill="currentColor"/><circle cx="9" cy="5" r="1" fill="currentColor"/><circle cx="13" cy="8" r="1" fill="currentColor"/></svg>
    },
  ]

  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
  }

  const menuStyle: React.CSSProperties = {
    position: 'fixed',
    top: `${position.top}px`,
    left: `${position.left}px`,
    background: 'var(--bg-card)',
    border: '1px solid var(--border-color)',
    borderRadius: '12px',
    padding: '8px',
    minWidth: '220px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)',
    animation: 'slideDown 0.2s ease-out',
    zIndex: 1000,
  }

  const itemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px 12px',
    background: 'transparent',
    border: 'none',
    borderRadius: '8px',
    color: 'var(--text-primary)',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s',
    width: '100%',
    textAlign: 'left',
  }

  const iconWrap: React.CSSProperties = {
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--text-secondary)',
  }

  return (
    <>
      <div style={overlayStyle} />
      <div ref={menuRef} style={menuStyle}>
        {presets.map((preset) => (
          <button
            key={preset.id}
            style={itemStyle}
            onClick={() => onSelect(preset.id)}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--bg-secondary)'
              const icon = e.currentTarget.querySelector('.icon-wrapper') as HTMLElement
              if (icon) icon.style.color = 'var(--accent-primary)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              const icon = e.currentTarget.querySelector('.icon-wrapper') as HTMLElement
              if (icon) icon.style.color = 'var(--text-secondary)'
            }}
          >
            <span className="icon-wrapper" style={iconWrap}>{preset.icon}</span>
            <span>{preset.label}</span>
          </button>
        ))}
      </div>
    </>
  )
}
