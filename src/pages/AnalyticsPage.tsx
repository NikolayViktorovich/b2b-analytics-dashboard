import { useState, useEffect, lazy, Suspense } from 'react'
import { analyticsApi } from '@/services/api'

const SalesFunnel = lazy(() => import('@/components/analytics/SalesFunnel'))
const PeriodComparison = lazy(() => import('@/components/analytics/PeriodComparison'))
const CategorySales = lazy(() => import('@/components/analytics/CategorySales'))
const RFMSegments = lazy(() => import('@/components/analytics/RFMSegments'))
const GeoSales = lazy(() => import('@/components/analytics/GeoSales'))
const AdvancedMetrics = lazy(() => import('@/components/analytics/AdvancedMetrics'))

type WidgetOrder = string[]
const defaultOrder: WidgetOrder = ['advanced', 'funnel', 'comparison', 'category', 'rfm', 'geo']

const AnalyticsPage = () => {
  const [isEditMode, setIsEditMode] = useState(false)
  const [order, setOrder] = useState<WidgetOrder>(defaultOrder)
  const [draggedItem, setDraggedItem] = useState<string | null>(null)
  const [analyticsData, setAnalyticsData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('analytics-widget-order')
    if (saved) setOrder(JSON.parse(saved))
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [latest, funnel, rfm, categories, geo] = await Promise.all([
          analyticsApi.getAll(),
          analyticsApi.getFunnel(),
          analyticsApi.getRFM(),
          analyticsApi.getCategories(),
          analyticsApi.getGeography()
        ])
        setAnalyticsData({latest: (latest as any[])[0], funnel, rfm, categories, geo})
      } catch(error) {
        setAnalyticsData({latest: null, funnel: [], rfm: [], categories: [], geo: []})
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-secondary)' }}>
        Загрузка аналитики...
      </div>
    )
  }

  if (!analyticsData || !analyticsData.latest) {
    return (
      <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-secondary)' }}>
        <p>Нет данных для отображения</p>
      </div>
    )
  }

  const funnelData = analyticsData?.funnel?.map((item: any) => ({
    stage: item.stage,
    value: item.value,
    percent: item.percentage,
    color: ['#6366f1', '#8b5cf6', '#a855f7', '#c084fc'][analyticsData.funnel.indexOf(item) % 4]
  })) || []

  const comparisonData = analyticsData?.latest?.comparison ? {
    curr: {
      revenue: analyticsData.latest.comparison.current || 0,
      orders: analyticsData.latest.revenue?.orders || 0,
      conversion: 0,
      avgCheck: analyticsData.latest.revenue?.avgOrderValue || 0
    },
    prev: {
      revenue: analyticsData.latest.comparison.previous || 0,
      orders: 0,
      conversion: 0,
      avgCheck: 0
    }
  } : {
    curr: { revenue: 0, orders: 0, conversion: 0, avgCheck: 0 },
    prev: { revenue: 0, orders: 0, conversion: 0, avgCheck: 0 }
  }

  const categoryData = analyticsData?.categories?.map((item: any, idx: number) => ({
    name: item.name,
    sales: item.revenue,
    orders: item.sales,
    growth: 0,
    color: ['#6366f1', '#8b5cf6', '#a855f7', '#c084fc', '#d8b4fe'][idx % 5]
  })) || []

  const rfmData = analyticsData?.rfm?.map((item: any, idx: number) => ({
    segment: item.segment,
    count: item.customers,
    revenue: item.revenue,
    color: ['#4ade80', '#22c55e', '#fbbf24', '#60a5fa', '#f87171'][idx % 5],
    desc: ''
  })) || []

  const geoData = analyticsData?.geo?.map((item: any) => ({
    region: item.country,
    sales: item.revenue,
    orders: item.sales,
    percent: Math.round((item.revenue / analyticsData.geo.reduce((sum: number, g: any) => sum + g.revenue, 0)) * 100)
  })) || []

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
    localStorage.setItem('analytics-widget-order', JSON.stringify(order))
    setIsEditMode(false)
  }

  const resetOrder = () => {
    setOrder(defaultOrder)
    localStorage.removeItem('analytics-widget-order')
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
    const isWide = id === 'rfm'
    return {
      cursor: isEditMode ? 'move' : 'default',
      opacity: draggedItem === id ? 0.5 : 1,
      transition: 'opacity 0.2s',
      outline: isEditMode ? '2px dashed var(--border-color)' : 'none',
      outlineOffset: isEditMode ? '4px' : '0',
      borderRadius: 'clamp(12px, 2vw, 16px)',
      gridColumn: isWide ? 'span 2' : 'span 1',
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
      case 'advanced':
        return (
          <div
            key={id}
            draggable={isEditMode}
            onDragStart={(e) => onDragStart(e, id)}
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, id)}
            onDragEnd={onDragEnd}
            style={{...widgetStyle(id), gridColumn: 'span 2'}}
          >
            <Suspense fallback={<LoadingWidget />}>
              <AdvancedMetrics />
            </Suspense>
          </div>
        )
      case 'funnel':
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
              <SalesFunnel data={funnelData} />
            </Suspense>
          </div>
        )
      case 'comparison':
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
              <PeriodComparison data={comparisonData} />
            </Suspense>
          </div>
        )
      case 'category':
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
              <CategorySales data={categoryData} />
            </Suspense>
          </div>
        )
      case 'rfm':
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
              <RFMSegments data={rfmData} />
            </Suspense>
          </div>
        )
      case 'geo':
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
              <GeoSales data={geoData} />
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
          <h1 style={h1Style}>Детальная аналитика</h1>
          <p style={subtitleStyle}>Глубокий анализ продаж и клиентов</p>
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

export default AnalyticsPage
