interface Props {
  currView: string
  onViewChange: (view: string) => void
}

interface MenuItem {
  id: string
  label: string
  icon: JSX.Element
}

const menuItems: MenuItem[] = [
  { 
    id: 'desktop', 
    label: 'Рабочий стол',
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/><rect x="11" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/><rect x="3" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/><rect x="11" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/></svg>
  },
  { 
    id: 'analytics', 
    label: 'Аналитика',
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="12" width="3" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/><rect x="8.5" y="8" width="3" height="9" rx="1" stroke="currentColor" strokeWidth="1.5"/><rect x="14" y="4" width="3" height="13" rx="1" stroke="currentColor" strokeWidth="1.5"/></svg>
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
]

const Sidebar = ({ currView, onViewChange }: Props) => {
  const sidebarStyle: React.CSSProperties = {
    width: '72px',
    background: 'var(--bg-secondary)',
    borderRight: '1px solid var(--border-color)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '24px 0',
    gap: '8px',
  }

  const navStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    width: '100%',
    padding: '0 12px',
  }

  const itemStyle: React.CSSProperties = {
    width: '48px',
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent',
    color: 'var(--text-secondary)',
    borderRadius: '12px',
    transition: 'none',
    position: 'relative',
    cursor: 'pointer',
  }

  const itemActive: React.CSSProperties = {
    ...itemStyle,
    background: 'var(--accent-primary)',
    color: 'var(--bg-primary)',
  }

  const tooltipStyle: React.CSSProperties = {
    position: 'absolute',
    left: '64px',
    background: 'var(--bg-card)',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    padding: '8px 12px',
    whiteSpace: 'nowrap',
    fontSize: '13px',
    fontWeight: 500,
    color: 'var(--text-primary)',
    pointerEvents: 'none',
    opacity: 0,
    transform: 'translateX(-10px)',
    transition: 'all 0.2s',
    zIndex: 1000,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
  }

  return (
    <aside style={sidebarStyle}>
      <nav style={navStyle}>
        {menuItems.map(item => (
          <button
            key={item.id}
            style={currView === item.id ? itemActive : itemStyle}
            onClick={() => onViewChange(item.id)}
            onMouseEnter={(e) => {
              const tt = e.currentTarget.querySelector('.tooltip') as HTMLElement
              if (tt) {
                tt.style.opacity = '1'
                tt.style.transform = 'translateX(0)'
              }
            }}
            onMouseLeave={(e) => {
              const tt = e.currentTarget.querySelector('.tooltip') as HTMLElement
              if (tt) {
                tt.style.opacity = '0'
                tt.style.transform = 'translateX(-10px)'
              }
            }}
          >
            {item.icon}
            <span className="tooltip" style={tooltipStyle}>
              {item.label}
            </span>
          </button>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
