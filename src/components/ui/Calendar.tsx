import { useState, useRef, useEffect } from 'react'

interface Props {
  value: string
  onChange: (date: string) => void
  onClose: () => void
  anchorEl: HTMLElement | null
}

const Calendar = ({ value, onChange, onClose, anchorEl }: Props) => {
  const calendarRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const [curr, setCurr] = useState(() => {
    return value ? new Date(value) : new Date()
  })

  useEffect(() => {
    if (anchorEl && calendarRef.current) {
      const anchorRect = anchorEl.getBoundingClientRect()
      const calRect = calendarRef.current.getBoundingClientRect()
      
      let top = anchorRect.bottom + 8
      let left = anchorRect.left
      
      if (left + calRect.width > window.innerWidth) {
        left = window.innerWidth - calRect.width - 16
      }
      
      if (top + calRect.height > window.innerHeight) {
        top = anchorRect.top - calRect.height - 8
      }
      
      setPosition({ top, left })
    }
  }, [anchorEl])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node) &&
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

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [onClose, anchorEl])

  const months = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ]

  const getDays = (d: Date) => {
    const yr = d.getFullYear()
    const mo = d.getMonth()
    const first = new Date(yr, mo, 1)
    const last = new Date(yr, mo + 1, 0)
    const days = last.getDate()
    const start = first.getDay() || 7
    
    return { days, start: start - 1 }
  }

  const { days, start } = getDays(curr)

  const prevMonth = () => {
    setCurr(new Date(curr.getFullYear(), curr.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurr(new Date(curr.getFullYear(), curr.getMonth() + 1))
  }

  const clickDay = (day: number) => {
    const sel = new Date(curr.getFullYear(), curr.getMonth(), day)
    const fmt = sel.toISOString().split('T')[0]
    onChange(fmt)
  }

  const isSel = (day: number) => {
    if (!value) return false
    const sel = new Date(value)
    return (
      sel.getDate() === day &&
      sel.getMonth() === curr.getMonth() &&
      sel.getFullYear() === curr.getFullYear()
    )
  }

  const isNow = (day: number) => {
    const now = new Date()
    return (
      now.getDate() === day &&
      now.getMonth() === curr.getMonth() &&
      now.getFullYear() === curr.getFullYear()
    )
  }

  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
  }

  const calendarStyle: React.CSSProperties = {
    position: 'fixed',
    top: `${position.top}px`,
    left: `${position.left}px`,
    background: 'var(--bg-card)',
    border: '1px solid var(--border-color)',
    borderRadius: '16px',
    padding: '20px',
    width: '320px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)',
    animation: 'slideDown 0.2s ease-out',
    zIndex: 1000,
  }

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '20px',
  }

  const monthYearStyle: React.CSSProperties = {
    fontSize: '16px',
    fontWeight: 600,
    color: 'var(--text-primary)',
  }

  const navBtnStyle: React.CSSProperties = {
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'var(--bg-secondary)',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    transition: 'all 0.2s',
  }

  const weekdaysStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '4px',
    marginBottom: '8px',
  }

  const weekdayStyle: React.CSSProperties = {
    textAlign: 'center',
    fontSize: '12px',
    fontWeight: 500,
    color: 'var(--text-muted)',
    padding: '8px 0',
  }

  const daysGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '4px',
  }

  const dayStyle: React.CSSProperties = {
    aspectRatio: '1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: 500,
    color: 'var(--text-primary)',
    background: 'transparent',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  }

  const emptyDayStyle: React.CSSProperties = {
    ...dayStyle,
    cursor: 'default',
  }

  const selectedDayStyle: React.CSSProperties = {
    ...dayStyle,
    background: 'var(--accent-primary)',
    color: 'var(--bg-primary)',
    fontWeight: 700,
  }

  const todayStyle: React.CSSProperties = {
    ...dayStyle,
    border: '1px solid var(--accent-primary)',
  }

  return (
    <>
      <div style={overlayStyle} />
      <div ref={calendarRef} style={calendarStyle}>
        <div style={headerStyle}>
          <button style={navBtnStyle} onClick={prevMonth}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <span style={monthYearStyle}>
            {months[curr.getMonth()]} {curr.getFullYear()}
          </span>
          <button style={navBtnStyle} onClick={nextMonth}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 12l4-4-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div style={weekdaysStyle}>
          {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day) => (
            <div key={day} style={weekdayStyle}>
              {day}
            </div>
          ))}
        </div>

        <div style={daysGridStyle}>
          {Array.from({ length: start }).map((_, i) => (
            <div key={`empty-${i}`} style={emptyDayStyle} />
          ))}
          {Array.from({ length: days }).map((_, i) => {
            const day = i + 1
            const sel = isSel(day)
            const now = isNow(day)
            
            let style = dayStyle
            if (sel) style = selectedDayStyle
            else if (now) style = todayStyle

            return (
              <button
                key={day}
                style={style}
                onClick={() => clickDay(day)}
                onMouseEnter={(e) => {
                  if (!sel) {
                    e.currentTarget.style.background = 'var(--bg-secondary)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!sel) {
                    e.currentTarget.style.background = 'transparent'
                  }
                }}
              >
                {day}
              </button>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Calendar
