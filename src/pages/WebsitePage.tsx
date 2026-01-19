import { useState, useEffect } from 'react'
import TrafficOverview from '@/components/website/TrafficOverview'
import TrafficSources from '@/components/website/TrafficSources'
import DevicesBreakdown from '@/components/website/DevicesBreakdown'
import PopularPages from '@/components/website/PopularPages'
import UserBehavior from '@/components/website/UserBehavior'

const trafficData = {
  total: 45678,
  unique: 32456,
  pageviews: 128934,
  avgDuration: '3:24',
  bounceRate: 42.3,
  change: 12.5,
}

const sourcesData = [
  { name: 'Organic', value: 18456, percent: 40, color: '#4ade80' },
  { name: 'Direct', value: 13703, percent: 30, color: '#60a5fa' },
  { name: 'Social', value: 9136, percent: 20, color: '#a855f7' },
  { name: 'Referral', value: 4568, percent: 10, color: '#fbbf24' },
]

const devicesData = [
  { name: 'Desktop', value: 25407, percent: 55.6, color: '#6366f1' },
  { name: 'Mobile', value: 16441, percent: 36, color: '#8b5cf6' },
  { name: 'Tablet', value: 3830, percent: 8.4, color: '#a855f7' },
]

const pagesData = [
  { page: '/products', views: 12456, avgTime: '4:32', bounceRate: 35.2, exitRate: 28.4 },
  { page: '/about', views: 8934, avgTime: '2:18', bounceRate: 52.1, exitRate: 45.3 },
  { page: '/blog', views: 7823, avgTime: '5:47', bounceRate: 28.9, exitRate: 22.1 },
  { page: '/contact', views: 5678, avgTime: '1:52', bounceRate: 61.3, exitRate: 58.7 },
  { page: '/pricing', views: 4567, avgTime: '3:15', bounceRate: 38.6, exitRate: 32.4 },
]

const behaviorData = {
  avgPageDepth: 3.8,
  avgSessionDuration: '3:24',
  pagesPerSession: 4.2,
  newVsReturning: { new: 62, returning: 38 },
}

type WidgetOrder = string[]
const defaultOrder: WidgetOrder = ['overview', 'sources', 'devices', 'pages', 'behavior']

const WebsitePage = () => {
  const [isEditMode, setIsEditMode] = useState(false)
  const [order, setOrder] = useState<WidgetOrder>(defaultOrder)
  const [draggedItem, setDraggedItem] = useState<string | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('website-widget-order')
    if (saved) {
      setOrder(JSON.parse(saved))
    }
  }, [])

  const onDragStart = (e: React.DragEvent, id: string) => {
    if (!isEditMode) return
    setDraggedItem(id)
    e.dataTransfer.effectAllowed = 'move'
  }

  const onDragOver = (e: React.DragEvent) => {
    if (!isEditMode) return
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const onDrop = (e: React.DragEvent, targetId: string) => {
    if (!isEditMode || !draggedItem) return
    e.preventDefault()

    const newOrder = [...order]
    const draggedIdx = newOrder.indexOf(draggedItem)
    const targetIdx = newOrder.indexOf(targetId)

    newOrder.splice(draggedIdx, 1)
    newOrder.splice(targetIdx, 0, draggedItem)

    setOrder(newOrder)
    setDraggedItem(null)
  }

  const onDragEnd = () => {
    setDraggedItem(null)
  }

  const applyChanges = () => {
    localStorage.setItem('website-widget-order', JSON.stringify(order))
    setIsEditMode(false)
  }

  const resetOrder = () => {
    setOrder(defaultOrder)
    localStorage.removeItem('website-widget-order')
  }
  const containerStyle: React.CSSProperties = {
    padding: 'clamp(12px, 2.5vw, 24px)',
    maxWidth: '100%',
    width: '100%',
    boxSizing: 'border-box',
  }

  const headerStyle: React.CSSProperties = {
    marginBottom: 'clamp(16px, 2.5vw, 24px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 'clamp(12px, 2vw, 16px)',
  }

  const titleBlk: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'clamp(4px, 1vw, 8px)',
  }

  const h1Style: React.CSSProperties = {
    fontSize: 'clamp(20px, 3vw, 28px)',
    fontWeight: 700,
    marginBottom: '0',
  }

  const subtitleStyle: React.CSSProperties = {
    color: 'var(--text-muted)',
    fontSize: 'clamp(12px, 1.5vw, 14px)',
  }

  const hintStyle: React.CSSProperties = {
    color: 'var(--accent-primary)',
    fontSize: 'clamp(11px, 1.2vw, 12px)',
    marginTop: 'clamp(2px, 0.5vw, 4px)',
    display: isEditMode ? 'block' : 'none',
  }

  const actionsStyle: React.CSSProperties = {
    display: 'flex',
    gap: 'clamp(8px, 1.5vw, 12px)',
    alignItems: 'center',
  }

  const iconBtnStyle: React.CSSProperties = {
    width: 'clamp(36px, 5vw, 44px)',
    height: 'clamp(36px, 5vw, 44px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 'clamp(8px, 1.2vw, 10px)',
    cursor: 'pointer',
    transition: 'all 0.2s',
    background: isEditMode ? 'var(--accent-primary)' : 'var(--bg-card)',
    color: isEditMode ? 'var(--bg-primary)' : 'var(--text-secondary)',
    border: isEditMode ? 'none' : '1px solid var(--border-color)',
    position: 'relative',
  }

  const tooltipStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: '-40px',
    right: '0',
    background: 'var(--bg-card)',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    padding: '8px 12px',
    whiteSpace: 'nowrap',
    fontSize: '12px',
    fontWeight: 500,
    color: 'var(--text-primary)',
    pointerEvents: 'none',
    opacity: 0,
    transform: 'translateY(-4px)',
    transition: 'all 0.2s',
    zIndex: 1000,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
  }

  const btnSec: React.CSSProperties = {
    width: 'clamp(36px, 5vw, 44px)',
    height: 'clamp(36px, 5vw, 44px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 'clamp(8px, 1.2vw, 10px)',
    cursor: 'pointer',
    transition: 'all 0.2s',
    background: 'var(--bg-card)',
    color: 'var(--text-secondary)',
    border: '1px solid var(--border-color)',
    position: 'relative',
  }

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(280px, 30vw, 400px), 1fr))',
    gridAutoRows: '400px',
    gap: 'clamp(12px, 2vw, 16px)',
  }

  const widgetStyle = (id: string): React.CSSProperties => {
    const isTall = id === 'devices'
    return {
      cursor: isEditMode ? 'move' : 'default',
      opacity: draggedItem === id ? 0.5 : 1,
      transition: 'opacity 0.2s',
      outline: isEditMode ? '2px dashed var(--border-color)' : 'none',
      outlineOffset: isEditMode ? '4px' : '0',
      borderRadius: 'clamp(12px, 2vw, 16px)',
      gridRow: isTall ? 'span 2' : 'span 1',
    }
  }

  const renderWidget = (id: string) => {
    switch (id) {
      case 'overview':
        return (
          <div
            key={id}
            draggable={isEditMode}
            onDragStart={(e) => onDragStart(e, id)}
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, id)}
            onDragEnd={onDragEnd}
            style={widgetStyle(id)}
          >
            <TrafficOverview data={trafficData} />
          </div>
        )
      case 'sources':
        return (
          <div
            key={id}
            draggable={isEditMode}
            onDragStart={(e) => onDragStart(e, id)}
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, id)}
            onDragEnd={onDragEnd}
            style={widgetStyle(id)}
          >
            <TrafficSources data={sourcesData} />
          </div>
        )
      case 'devices':
        return (
          <div
            key={id}
            draggable={isEditMode}
            onDragStart={(e) => onDragStart(e, id)}
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, id)}
            onDragEnd={onDragEnd}
            style={widgetStyle(id)}
          >
            <DevicesBreakdown data={devicesData} />
          </div>
        )
      case 'pages':
        return (
          <div
            key={id}
            draggable={isEditMode}
            onDragStart={(e) => onDragStart(e, id)}
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, id)}
            onDragEnd={onDragEnd}
            style={widgetStyle(id)}
          >
            <PopularPages data={pagesData} />
          </div>
        )
      case 'behavior':
        return (
          <div
            key={id}
            draggable={isEditMode}
            onDragStart={(e) => onDragStart(e, id)}
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, id)}
            onDragEnd={onDragEnd}
            style={widgetStyle(id)}
          >
            <UserBehavior data={behaviorData} />
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div style={titleBlk}>
          <h1 style={h1Style}>Аналитика веб-сайта</h1>
          <p style={subtitleStyle}>Трафик и поведение пользователей</p>
          <p style={hintStyle}>Перетаскивайте виджеты для изменения порядка</p>
        </div>
        <div style={actionsStyle}>
          <button 
            style={iconBtnStyle}
            onClick={() => isEditMode ? applyChanges() : setIsEditMode(true)}
            onMouseEnter={(e) => {
              const tooltip = e.currentTarget.querySelector('.tooltip') as HTMLElement
              if (tooltip) {
                tooltip.style.opacity = '1'
                tooltip.style.transform = 'translateY(0)'
              }
            }}
            onMouseLeave={(e) => {
              const tooltip = e.currentTarget.querySelector('.tooltip') as HTMLElement
              if (tooltip) {
                tooltip.style.opacity = '0'
                tooltip.style.transform = 'translateY(-4px)'
              }
            }}
          >
            {isEditMode ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
                <rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                <rect x="11" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                <rect x="2" y="11" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                <rect x="11" y="11" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            )}
            <span className="tooltip" style={tooltipStyle}>
              {isEditMode ? 'Применить изменения' : 'Изменить виджеты'}
            </span>
          </button>
          {isEditMode && (
            <button 
              style={btnSec}
              onClick={resetOrder}
              onMouseEnter={(e) => {
                const tooltip = e.currentTarget.querySelector('.tooltip') as HTMLElement
                if (tooltip) {
                  tooltip.style.opacity = '1'
                  tooltip.style.transform = 'translateY(0)'
                }
              }}
              onMouseLeave={(e) => {
                const tooltip = e.currentTarget.querySelector('.tooltip') as HTMLElement
                if (tooltip) {
                  tooltip.style.opacity = '0'
                  tooltip.style.transform = 'translateY(-4px)'
                }
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                <path d="M21 2v6h-6M3 12a9 9 0 0115-6.7L21 8M3 22v-6h6M21 12a9 9 0 01-15 6.7L3 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="tooltip" style={tooltipStyle}>
                Сбросить расположение
              </span>
            </button>
          )}
        </div>
      </div>

      <div style={gridStyle}>
        {order.map(id => renderWidget(id))}
      </div>
    </div>
  )
}

export default WebsitePage
