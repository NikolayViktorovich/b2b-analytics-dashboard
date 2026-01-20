import { useState, useEffect, lazy, Suspense } from 'react'
import { dashboardApi } from '@/services/api'

const StatCard = lazy(() => import('../widgets/StatCard'))
const RevenueChart = lazy(() => import('../widgets/RevenueChart'))
const SourcesChart = lazy(() => import('../widgets/SourcesChart'))
const ProductTable = lazy(() => import('../widgets/ProductTable'))

type WidgetOrder = string[]

const defaultOrder: WidgetOrder = ['sales', 'orders', 'conversion', 'avg', 'revenue', 'sources', 'products']

const MainDashboard = () => {
  const [isEditMode, setIsEditMode] = useState(false)
  const [order, setOrder] = useState<WidgetOrder>(defaultOrder)
  const [draggedItem, setDraggedItem] = useState<string | null>(null)
  const [dashboardData, setDashboardData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [period] = useState('today')

  useEffect(() => {
    const saved = localStorage.getItem('widget-order')
    if (saved) setOrder(JSON.parse(saved))
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await dashboardApi.getStats(period)
        setDashboardData(data)
      } catch(error: any) {
        setError(error.message || 'Failed to load data')
        setDashboardData(null)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [period])

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
    localStorage.setItem('widget-order', JSON.stringify(newOrder))
    setDraggedItem(null)
  }

  const onDragEnd = () => setDraggedItem(null)

  const resetOrder = () => {
    setOrder(defaultOrder)
    localStorage.removeItem('widget-order')
  }

  const stats = dashboardData?.stats ? [
    { 
      id: 'sales', 
      label: 'Выручка', 
      value: `$${(dashboardData.stats.revenue?.value || 0).toLocaleString()}`, 
      change: dashboardData.stats.revenue?.change || 0, 
      subtitle: 'Общая выручка' 
    },
    { 
      id: 'orders', 
      label: 'Заказы', 
      value: (dashboardData.stats.orders?.value || 0).toLocaleString(), 
      change: dashboardData.stats.orders?.change || 0, 
      subtitle: 'Всего заказов' 
    },
    { 
      id: 'conversion', 
      label: 'Клиенты', 
      value: (dashboardData.stats.customers?.value || 0).toLocaleString(), 
      change: dashboardData.stats.customers?.change || 0, 
      subtitle: 'Всего клиентов' 
    },
    { 
      id: 'avg', 
      label: 'Конверсия', 
      value: `${dashboardData.stats.conversion?.value || 0}%`, 
      change: dashboardData.stats.conversion?.change || 0, 
      subtitle: 'Процент конверсии' 
    },
  ] : []

  const revData = Array.isArray(dashboardData?.revenueChart) ? dashboardData.revenueChart.map((item: any) => ({
    month: new Date(item.date).toLocaleDateString('ru', { month: 'short' }),
    value: item.revenue || 0
  })) : []

  const sourceData = Array.isArray(dashboardData?.trafficSources) ? dashboardData.trafficSources.map((item: any, idx: number) => ({
    name: item.source || 'Unknown',
    value: item.value || 0,
    color: ['#6366f1', '#3b82f6', '#8b5cf6', '#ec4899'][idx % 4]
  })) : []

  const products = Array.isArray(dashboardData?.topProducts) ? dashboardData.topProducts.map((item: any) => ({
    name: item.name || 'Unknown',
    brand: 'Brand',
    quantity: item.sales || 0,
    price: item.sales > 0 ? Number((item.revenue / item.sales).toFixed(2)) : 0,
    earning: item.revenue || 0
  })) : []

  const widgetStyle = (id: string): React.CSSProperties => ({
    cursor: isEditMode ? 'move' : 'default',
    opacity: draggedItem === id ? 0.5 : 1,
    transition: 'opacity 0.2s',
    outline: isEditMode ? '2px dashed var(--border-color)' : 'none',
    outlineOffset: isEditMode ? '4px' : '0',
    borderRadius: 'clamp(12px, 2vw, 16px)',
  })

  const LoadingCard = () => (
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
    const stat = stats.find(s => s.id === id)
    
    if (stat) {
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
          <Suspense fallback={<LoadingCard />}>
            <StatCard {...stat} />
          </Suspense>
        </div>
      )
    }

    const sectionStyle: React.CSSProperties = { marginBottom: 'clamp(16px, 2.5vw, 24px)' }

    switch (id) {
      case 'revenue':
        return (
          <div
            key={id}
            draggable={isEditMode}
            onDragStart={(e) => onDragStart(e, id)}
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, id)}
            onDragEnd={onDragEnd}
            style={{ ...widgetStyle(id), ...sectionStyle }}
          >
            <Suspense fallback={<LoadingCard />}>
              <RevenueChart data={revData} />
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
            style={{ ...widgetStyle(id), ...sectionStyle }}
          >
            <Suspense fallback={<LoadingCard />}>
              <SourcesChart data={sourceData} />
            </Suspense>
          </div>
        )
      case 'products':
        return (
          <div
            key={id}
            draggable={isEditMode}
            onDragStart={(e) => onDragStart(e, id)}
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, id)}
            onDragEnd={onDragEnd}
            style={{ ...widgetStyle(id), ...sectionStyle }}
          >
            <Suspense fallback={<LoadingCard />}>
              <ProductTable products={products} />
            </Suspense>
          </div>
        )
      default:
        return null
    }
  }

  const renderCharts = () => {
    const revIdx = order.indexOf('revenue')
    const srcIdx = order.indexOf('sources')
    const prodIdx = order.indexOf('products')
    
    const indices = [revIdx, srcIdx, prodIdx].filter(i => i !== -1).sort((a,b) => a - b)
    const together = indices.length === 3 && indices[1] === indices[0] + 1 && indices[2] === indices[1] + 1
    
    if(together && order[indices[0]] === 'revenue') {
      const chartsGrid: React.CSSProperties = {
        display: window.innerWidth >= 1024 ? 'grid' : 'flex',
        gridTemplateColumns: window.innerWidth >= 1024 ? '2fr 1fr' : '1fr',
        flexDirection: 'column',
        gap: 'clamp(12px, 2vw, 16px)',
        marginBottom: 'clamp(16px, 2.5vw, 24px)',
      }

      return (
        <div className="charts-grid" style={chartsGrid}>
          <div
            key="revenue"
            draggable={isEditMode}
            onDragStart={e => onDragStart(e, 'revenue')}
            onDragOver={onDragOver}
            onDrop={e => onDrop(e, 'revenue')}
            onDragEnd={onDragEnd}
            style={{...widgetStyle('revenue'), gridColumn: '1', gridRow: '1'}}
          >
            <Suspense fallback={<LoadingCard />}>
              <RevenueChart data={revData} />
            </Suspense>
          </div>
          <div
            key="sources"
            draggable={isEditMode}
            onDragStart={e => onDragStart(e, 'sources')}
            onDragOver={onDragOver}
            onDrop={e => onDrop(e, 'sources')}
            onDragEnd={onDragEnd}
            style={{...widgetStyle('sources'), gridColumn: '2', gridRow: '1 / 3'}}
          >
            <Suspense fallback={<LoadingCard />}>
              <SourcesChart data={sourceData} />
            </Suspense>
          </div>
          <div
            key="products"
            draggable={isEditMode}
            onDragStart={e => onDragStart(e, 'products')}
            onDragOver={onDragOver}
            onDrop={e => onDrop(e, 'products')}
            onDragEnd={onDragEnd}
            style={{...widgetStyle('products'), gridColumn: '1', gridRow: '2'}}
          >
            <Suspense fallback={<LoadingCard />}>
              <ProductTable products={products} />
            </Suspense>
          </div>
        </div>
      )
    }
    
    return null
  }

  if (loading) {
    return (
      <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-secondary)' }}>
        Загрузка данных...
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-secondary)' }}>
        <p style={{ color: '#f87171', marginBottom: '8px' }}>Ошибка: {error}</p>
        <button 
          onClick={() => window.location.reload()}
          style={{
            marginTop: '16px',
            padding: '8px 16px',
            background: 'var(--accent-primary)',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Попробовать снова
        </button>
      </div>
    )
  }

  if (!dashboardData) {
    return (
      <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-secondary)' }}>
        <p>Нет данных для отображения</p>
        <button 
          onClick={() => window.location.reload()}
          style={{
            marginTop: '16px',
            padding: '8px 16px',
            background: 'var(--accent-primary)',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Обновить
        </button>
      </div>
    )
  }

  try {
    return (
    <div style={{ padding: 'clamp(12px, 2.5vw, 24px)', maxWidth: '100%', width: '100%', boxSizing: 'border-box' }}>
      <div style={{ marginBottom: 'clamp(16px, 2.5vw, 24px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'clamp(12px, 2vw, 16px)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(4px, 1vw, 8px)' }}>
          <h1 style={{ fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 700, marginBottom: '0' }}>
            Аналитика продаж
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 'clamp(12px, 1.5vw, 14px)' }}>
            Полный отчет по аналитике и статистике
          </p>
          {isEditMode && (
            <p style={{ color: 'var(--accent-primary)', fontSize: 'clamp(11px, 1.2vw, 12px)', marginTop: 'clamp(2px, 0.5vw, 4px)' }}>
              Перетаскивайте виджеты для изменения порядка
            </p>
          )}
        </div>
        <div style={{ display: 'flex', gap: 'clamp(8px, 1.5vw, 12px)', alignItems: 'center' }}>
          <button 
            style={{
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
            }}
            onClick={() => setIsEditMode(!isEditMode)}
          >
            {isEditMode ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                <rect x="11" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                <rect x="2" y="11" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                <rect x="11" y="11" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            )}
          </button>
          {isEditMode && (
            <button 
              style={{
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
              }}
              onClick={resetOrder}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M21 2v6h-6M3 12a9 9 0 0115-6.7L21 8M3 22v-6h6M21 12a9 9 0 01-15 6.7L3 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
        </div>
      </div>

      {order.map(id => {
        const statIds = ['sales', 'orders', 'conversion', 'avg']
        
        if(statIds.includes(id)) {
          const statsInOrder = order.filter(orderId => statIds.includes(orderId))
          if(id === statsInOrder[0]) {
            return (
              <div key="stats-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(200px, 25vw, 240px), 1fr))',
                gap: 'clamp(12px, 2vw, 16px)',
                marginBottom: 'clamp(16px, 2.5vw, 24px)',
              }}>
                {statsInOrder.map(statId => renderWidget(statId))}
              </div>
            )
          }
          return null
        }

        if(id === 'revenue' || id === 'sources' || id === 'products') {
          const revIdx = order.indexOf('revenue')
          const srcIdx = order.indexOf('sources')
          const prodIdx = order.indexOf('products')
          
          const indices = [revIdx, srcIdx, prodIdx].filter(i => i !== -1).sort((a,b) => a - b)
          const together = indices.length === 3 && 
                          indices[1] === indices[0] + 1 && 
                          indices[2] === indices[1] + 1
          
          if(together && id === order[indices[0]]) {
            return renderCharts()
          }
          if(!together) {
            return renderWidget(id)
          }
          return null
        }
        return renderWidget(id)
      })}
    </div>
    )
  } catch(err: any) {
    return (
      <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-secondary)' }}>
        <p style={{ color: '#f87171', marginBottom: '8px' }}>Ошибка рендера: {err.message}</p>
        <button 
          onClick={() => window.location.reload()}
          style={{
            marginTop: '16px',
            padding: '8px 16px',
            background: 'var(--accent-primary)',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Перезагрузить
        </button>
      </div>
    )
  }
}

export default MainDashboard
