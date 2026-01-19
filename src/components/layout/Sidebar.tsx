import { useState } from 'react'

interface Props {
  currView: string
  onViewChange: (view: string) => void
}

const menuItems = [
  { 
    id: 'desktop', 
    label: 'Рабочий стол',
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="3" width="16" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><path d="M7 17h6M10 14v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
  },
  { 
    id: 'club-stats', 
    label: 'Статистика клуба',
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 14l4-4 3 3 7-7M17 6v4m0-4h-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
  },
  { 
    id: 'mobile', 
    label: 'Мобильное приложение',
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="5" y="2" width="10" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M9 15h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
  },
  { 
    id: 'website', 
    label: 'Веб-сайт',
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5"/><path d="M3 10h14M10 3c-2 2.5-2 7.5 0 14m0-14c2 2.5 2 7.5 0 14" stroke="currentColor" strokeWidth="1.5"/></svg>
  },
  { 
    id: 'nps', 
    label: 'NPS опросы',
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2l2.5 5 5.5.5-4 4 1 5.5-5-3-5 3 1-5.5-4-4 5.5-.5L10 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>
  },
  { 
    id: 'docs', 
    label: 'Документы',
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12 2H5a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7l-5-5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 2v5h5M7 11h6M7 14h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
  },
]

const mgmtItems = [
  { 
    id: 'discounts', 
    label: 'Скидки',
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M16 6l-8 8-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/></svg>
  },
  { 
    id: 'admin', 
    label: 'Администрирование',
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5"/><path d="M10 6v4l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
  },
  { 
    id: 'settings', 
    label: 'Настройки сайта',
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" stroke="currentColor" strokeWidth="1.5"/><path d="M16.5 10a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z" stroke="currentColor" strokeWidth="1.5"/><path d="M10 2v2m0 12v2M2 10h2m12 0h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
  },
]

const Sidebar = ({ currView, onViewChange }: Props) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    analysis: true,
    mgmt: true,
  })

  const toggleSection = (section: string) => {
    setExpanded(prev => ({ ...prev, [section]: !prev[section] }))
  }

  const sidebarStyle: React.CSSProperties = {
    width: 'clamp(200px, 20vw, 260px)',
    background: 'var(--bg-secondary)',
    borderRight: '1px solid var(--border-color)',
    display: 'flex',
    flexDirection: 'column',
    padding: 'clamp(12px, 2vw, 20px) 0',
  }

  const logoStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 'clamp(8px, 1vw, 12px)',
    padding: '0 clamp(12px, 2vw, 20px) clamp(12px, 2vw, 20px)',
    color: 'var(--accent-primary)',
    fontSize: 'clamp(16px, 1.5vw, 18px)',
    fontWeight: 600,
  }

  const navStyle: React.CSSProperties = {
    flex: 1,
    overflowY: 'auto',
  }

  const sectionHeaderStyle: React.CSSProperties = {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 'clamp(8px, 1vw, 12px) clamp(12px, 2vw, 20px)',
    background: 'transparent',
    color: 'var(--text-secondary)',
    fontSize: 'clamp(10px, 1vw, 12px)',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  }

  const itemsStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    padding: '0 12px',
  }

  const itemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 'clamp(8px, 1vw, 12px)',
    padding: 'clamp(8px, 1vw, 10px) clamp(10px, 1vw, 12px)',
    background: 'transparent',
    color: 'var(--text-secondary)',
    fontSize: 'clamp(13px, 1.2vw, 14px)',
    borderRadius: '8px',
    textAlign: 'left',
  }

  const itemActiveStyle: React.CSSProperties = {
    ...itemStyle,
    background: 'var(--accent-primary)',
    color: 'var(--bg-primary)',
    fontWeight: 500,
  }

  const iconStyle: React.CSSProperties = {
    fontSize: '18px',
    width: '20px',
    textAlign: 'center',
  }

  const arrowStyle: React.CSSProperties = {
    fontSize: '16px',
    transition: 'transform 0.2s',
    display: 'inline-block',
  }

  const arrowExpandedStyle: React.CSSProperties = {
    ...arrowStyle,
    transform: 'rotate(90deg)',
  }

  return (
    <aside style={sidebarStyle}>
      <div style={logoStyle}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect x="4" y="4" width="24" height="24" rx="4" stroke="currentColor" strokeWidth="2.5" />
          <path d="M10 14h12M10 18h12M10 22h8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
        <span>Reddix</span>
      </div>

      <nav style={navStyle}>
        <div style={{ marginBottom: '8px' }}>
          <button
            style={sectionHeaderStyle}
            onClick={() => toggleSection('analysis')}
          >
            <span>Аналитика</span>
            <span style={expanded.analysis ? arrowExpandedStyle : arrowStyle}>
              ›
            </span>
          </button>
          {expanded.analysis && (
            <div style={itemsStyle}>
              {menuItems.map(item => (
                <button
                  key={item.id}
                  style={currView === item.id ? itemActiveStyle : itemStyle}
                  onClick={() => onViewChange(item.id)}
                >
                  <span style={iconStyle}>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div style={{ marginBottom: '8px' }}>
          <button
            style={sectionHeaderStyle}
            onClick={() => toggleSection('mgmt')}
          >
            <span>Управление</span>
            <span style={expanded.mgmt ? arrowExpandedStyle : arrowStyle}>
              ›
            </span>
          </button>
          {expanded.mgmt && (
            <div style={itemsStyle}>
              {mgmtItems.map(item => (
                <button
                  key={item.id}
                  style={currView === item.id ? itemActiveStyle : itemStyle}
                  onClick={() => onViewChange(item.id)}
                >
                  <span style={iconStyle}>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>
    </aside>
  )
}

export default Sidebar
