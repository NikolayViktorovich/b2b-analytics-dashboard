import { useState, useEffect, lazy, Suspense } from 'react'
import { websiteApi } from '@/services/api'

const TrafficOverview = lazy(() => import('@/components/website/TrafficOverview'))
const TrafficSources = lazy(() => import('@/components/website/TrafficSources'))
const DevicesBreakdown = lazy(() => import('@/components/website/DevicesBreakdown'))
const PopularPages = lazy(() => import('@/components/website/PopularPages'))
const UserBehavior = lazy(() => import('@/components/website/UserBehavior'))

type WidgetOrder = string[]
const defaultOrder: WidgetOrder = ['overview', 'sources', 'devices', 'pages', 'behavior']

const WebsitePage = () => {
  const [isEditMode, setIsEditMode] = useState(false)
  const [order, setOrder] = useState<WidgetOrder>(defaultOrder)
  const [websiteData, setWebsiteData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [draggedItem, setDraggedItem] = useState<string | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('website-widget-order')
    if (saved) setOrder(JSON.parse(saved))
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [traffic, sources, devices, pages] = await Promise.all([
          websiteApi.getTraffic(),
          websiteApi.getSources(),
          websiteApi.getDevices(),
          websiteApi.getPages()
        ])
        setWebsiteData({traffic: (traffic as any[])[0], sources, devices, pages})
      } catch(error) {
        setWebsiteData({traffic: null, sources: [], devices: [], pages: []})
      } finally {
        setLoading(false)
      }
    }
    fetchData()
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

  const onDragEnd = () => setDraggedItem(null)

  const applyChanges = () => {
    localStorage.setItem('website-widget-order', JSON.stringify(order))
    setIsEditMode(false)
  }

  const resetOrder = () => {
    setOrder(defaultOrder)
    localStorage.removeItem('website-widget-order')
  }

  if (loading) {
    return (
      <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-secondary)' }}>
        Загрузка данных сайта...
      </div>
    )
  }

  if (!websiteData || !websiteData.traffic) {
    return (
      <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-secondary)' }}>
        <p>Нет данных для отображения</p>
      </div>
    )
  }

  const trafficData = websiteData?.traffic?.traffic ? {
    total: websiteData.traffic.traffic.sessions || 0,
    unique: websiteData.traffic.traffic.visitors || 0,
    pageviews: websiteData.traffic.traffic.pageViews || 0,
    avgDuration: Math.floor((websiteData.traffic.traffic.avgSessionDuration || 0) / 60) + ':' + ((websiteData.traffic.traffic.avgSessionDuration || 0) % 60).toString().padStart(2, '0'),
    bounceRate: websiteData.traffic.traffic.bounceRate || 0,
    change: 0,
  } : {
    total: 0,
    unique: 0,
    pageviews: 0,
    avgDuration: '0:00',
    bounceRate: 0,
    change: 0
  }

  const sourcesData = websiteData?.sources?.map((item: any, idx: number) => ({
    name: item.name,
    value: item.visitors,
    percent: item.percentage,
    color: ['#4ade80', '#60a5fa', '#a855f7', '#fbbf24'][idx % 4]
  })) || []

  const devicesData = websiteData?.devices?.map((item: any, idx: number) => ({
    name: item.type,
    value: item.visitors,
    percent: item.percentage,
    color: ['#6366f1', '#8b5cf6', '#a855f7'][idx % 3]
  })) || []

  const pagesData = websiteData?.pages?.map((item: any) => ({
    page: item.path,
    views: item.views,
    avgTime: Math.floor(item.avgTime / 60) + ':' + (item.avgTime % 60).toString().padStart(2, '0'),
    bounceRate: item.bounceRate,
    exitRate: 0
  })) || []

  const behaviorData = websiteData?.traffic?.behavior ? {
    avgPageDepth: websiteData.traffic.behavior.avgPagesPerSession || 0,
    avgSessionDuration: Math.floor((websiteData.traffic.behavior.avgTimeOnPage || 0) / 60) + ':' + ((websiteData.traffic.behavior.avgTimeOnPage || 0) % 60).toString().padStart(2, '0'),
    pagesPerSession: websiteData.traffic.behavior.avgPagesPerSession || 0,
    newVsReturning: { new: 62, returning: 38 },
  } : {
    avgPageDepth: 0,
    avgSessionDuration: '0:00',
    pagesPerSession: 0,
    newVsReturning: { new: 0, returning: 0 }
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
    display: window.innerWidth >= 1024 ? 'grid' : 'flex',
    gridTemplateColumns: window.innerWidth >= 1024 ? 'repeat(auto-fill, minmax(400px, 1fr))' : '1fr',
    flexDirection: 'column',
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

  const LoadingWidget = () => (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border-color)',
      borderRadius: '16px',
      padding: '16px',
      height: '400px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--text-muted)',
    }}>
      Загрузка...
    </div>
  )

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
            <Suspense fallback={<LoadingWidget />}>
              <TrafficOverview data={trafficData} />
            </Suspense>
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
            <Suspense fallback={<LoadingWidget />}>
              <TrafficSources data={sourcesData} />
            </Suspense>
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
            <Suspense fallback={<LoadingWidget />}>
              <DevicesBreakdown data={devicesData} />
            </Suspense>
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
            <Suspense fallback={<LoadingWidget />}>
              <PopularPages data={pagesData} />
            </Suspense>
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
            <Suspense fallback={<LoadingWidget />}>
              <UserBehavior data={behaviorData} />
            </Suspense>
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
