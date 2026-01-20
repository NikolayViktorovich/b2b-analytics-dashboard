import { useState, useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'
import { LayoutDashboard, UserCog, ClipboardList, TrendingUp, Globe, Star, Settings } from 'lucide-react'

interface Props {
  currView: string
  onViewChange: (view: string) => void
}

interface MenuItem {
  id: string
  label: string
  icon: JSX.Element
  requiredRole?: 'admin' | 'manager'
}

const menuItems: MenuItem[] = [
  { 
    id: 'desktop', 
    label: 'Рабочий стол',
    icon: <LayoutDashboard size={20} />
  },
  { 
    id: 'admin', 
    label: 'Админ панель',
    icon: <UserCog size={20} />,
    requiredRole: 'admin'
  },
  { 
    id: 'manager', 
    label: 'Менеджер панель',
    icon: <ClipboardList size={20} />,
    requiredRole: 'manager'
  },
  { 
    id: 'analytics', 
    label: 'Аналитика',
    icon: <TrendingUp size={20} />
  },
  { 
    id: 'website', 
    label: 'Веб-сайт',
    icon: <Globe size={20} />
  },
  { 
    id: 'nps', 
    label: 'NPS опросы',
    icon: <Star size={20} />
  },
  { 
    id: 'settings', 
    label: 'Настройки',
    icon: <Settings size={20} />
  },
]

const Sidebar = ({ currView, onViewChange }: Props) => {
  const [isMobile, setIsMobile] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const { user } = useAuthStore()

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const visibleItems = menuItems.filter(item => {
    if (!item.requiredRole) return true
    if (item.requiredRole === 'admin') return user?.role === 'admin'
    if (item.requiredRole === 'manager') return user?.role === 'admin' || user?.role === 'manager'
    return true
  })

  if (!isMobile) {
    return (
      <aside style={{
        width: '72px',
        background: 'var(--bg-secondary)',
        borderRight: '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '24px 0',
        gap: '8px',
      }}>
        <nav style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          width: '100%',
          padding: '0 12px',
        }}>
          {visibleItems.map(menuItem => (
            <button
              key={menuItem.id}
              style={{
                width: '48px',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: currView === menuItem.id ? 'var(--accent-primary)' : 'transparent',
                color: currView === menuItem.id ? 'var(--bg-primary)' : 'var(--text-secondary)',
                borderRadius: '12px',
                transition: 'all 0.2s',
                position: 'relative',
                cursor: 'pointer',
                border: 'none',
              }}
              onClick={() => onViewChange(menuItem.id)}
              onMouseEnter={e => {
                const tt = e.currentTarget.querySelector('.tooltip') as HTMLElement
                if(tt) {
                  tt.style.opacity = '1'
                  tt.style.transform = 'translateX(0)'
                }
              }}
              onMouseLeave={e => {
                const tt = e.currentTarget.querySelector('.tooltip') as HTMLElement
                if(tt) {
                  tt.style.opacity = '0'
                  tt.style.transform = 'translateX(-10px)'
                }
              }}
            >
              {menuItem.icon}
              <span className="tooltip" style={{
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
              }}>
                {menuItem.label}
              </span>
            </button>
          ))}
        </nav>
      </aside>
    )
  }

  return (
    <>
      <div 
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: expanded ? '100vh' : '0',
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)',
          zIndex: 998,
          opacity: expanded ? 1 : 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: expanded ? 'auto' : 'none',
        }}
        onClick={() => setExpanded(false)}
      />
      
      <nav style={{
        position: 'fixed',
        bottom: '16px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100% - 32px)',
        maxWidth: '420px',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: '24px',
        padding: '12px',
        zIndex: 999,
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px',
        }}>
          {visibleItems.slice(0, 4).map((menuItem) => {
            const isActive = currView === menuItem.id
            return (
              <button
                key={menuItem.id}
                style={{
                  flex: 1,
                  height: '52px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                  background: isActive ? 'var(--accent-primary)' : 'transparent',
                  color: isActive ? 'var(--bg-primary)' : 'var(--text-secondary)',
                  border: 'none',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  fontSize: '9px',
                  fontWeight: 600,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: isActive ? 'scale(1.05)' : 'scale(1)',
                  animation: isActive ? 'pulse 2s infinite' : 'none',
                }}
                onClick={() => {
                  onViewChange(menuItem.id)
                  setExpanded(false)
                }}
              >
                <div style={{
                  transform: isActive ? 'translateY(-2px)' : 'translateY(0)',
                  transition: 'transform 0.3s',
                }}>
                  {menuItem.icon}
                </div>
                <span style={{
                  opacity: isActive ? 1 : 0.7,
                  transition: 'opacity 0.3s',
                }}>
                  {menuItem.label.split(' ')[0]}
                </span>
              </button>
            )
          })}
          
          {visibleItems.length > 4 && (
            <button
              style={{
                width: '52px',
                height: '52px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: expanded ? 'var(--accent-primary)' : 'var(--bg-secondary)',
                color: expanded ? 'var(--bg-primary)' : 'var(--text-secondary)',
                border: 'none',
                borderRadius: '16px',
                cursor: 'pointer',
                transition: 'all 0.3s',
                transform: expanded ? 'rotate(45deg)' : 'rotate(0deg)',
              }}
              onClick={() => setExpanded(!expanded)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="6" r="1.5" fill="currentColor"/>
                <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
                <circle cx="12" cy="18" r="1.5" fill="currentColor"/>
              </svg>
            </button>
          )}
        </div>

        {expanded && visibleItems.length > 4 && (
          <div style={{
            marginTop: '12px',
            paddingTop: '12px',
            borderTop: '1px solid var(--border-color)',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '8px',
            animation: 'slideUp 0.3s ease',
          }}>
            {visibleItems.slice(4).map(menuItem => {
              const isActive = currView === menuItem.id
              return (
                <button
                  key={menuItem.id}
                  style={{
                    height: '64px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    background: isActive ? 'var(--accent-primary)' : 'var(--bg-secondary)',
                    color: isActive ? 'var(--bg-primary)' : 'var(--text-secondary)',
                    border: 'none',
                    borderRadius: '16px',
                    cursor: 'pointer',
                    fontSize: '10px',
                    fontWeight: 600,
                    transition: 'all 0.2s',
                  }}
                  onClick={() => {
                    onViewChange(menuItem.id)
                    setExpanded(false)
                  }}
                >
                  {menuItem.icon}
                  <span style={{ textAlign: 'center', lineHeight: '1.2' }}>
                    {menuItem.label}
                  </span>
                </button>
              )
            })}
          </div>
        )}
      </nav>

      <style>{`
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4); }
          50% { box-shadow: 0 0 0 8px rgba(99, 102, 241, 0); }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  )
}

export default Sidebar
