import { useState, useEffect } from 'react'
import StatCard from '../widgets/StatCard'
import RevenueChart from '../widgets/RevenueChart'
import SourcesChart from '../widgets/SourcesChart'
import ProductTable from '../widgets/ProductTable'

const mockStats = [
  { id: 'sales', label: 'Общие продажи', value: '$210,578', change: 12.5, subtitle: 'Среднее значение продаж' },
  { id: 'orders', label: 'Всего заказов', value: '1245', change: -3.5, subtitle: 'Среднее количество заказов' },
  { id: 'conversion', label: 'Конверсия', value: '8.5%', change: 4.3, subtitle: 'Средний процент конверсии' },
  { id: 'avg', label: 'Средний чек', value: '$150.40', change: 8.2, subtitle: 'Средняя стоимость заказа' },
]

const revData = [
  { month: 'Янв', value: 45000 },
  { month: 'Фев', value: 52000 },
  { month: 'Мар', value: 48000 },
  { month: 'Апр', value: 61000 },
  { month: 'Май', value: 55000 },
  { month: 'Июн', value: 67000 },
  { month: 'Июл', value: 58000 },
  { month: 'Авг', value: 72000 },
  { month: 'Сен', value: 65000 },
  { month: 'Окт', value: 58000 },
  { month: 'Ноя', value: 70000 },
  { month: 'Дек', value: 68000 },
]

const mockSourceData = [
  { name: 'Электронная коммерция', value: 1376, color: '#6366f1' },
  { name: 'Веб-сайт', value: 234, color: '#3b82f6' },
  { name: 'Социальные сети', value: 850, color: '#8b5cf6' },
]

const mockProducts = [
  { name: 'Nike Air Max Shoe', brand: 'Nike', quantity: 1250, price: 95.00, earning: 95.00 },
  { name: 'MacBook Pro', brand: 'Apple', quantity: 1850, price: 27.00, earning: 95.00 },
  { name: 'Nike Air Jordan', brand: 'Nike', quantity: 40, price: 34.00, earning: 95.00 },
  { name: 'Amazon Echo', brand: 'Amazon', quantity: 95, price: 85.00, earning: 95.00 },
  { name: 'iPhone 16 Pro Max', brand: 'Apple', quantity: 80, price: 36.00, earning: 95.00 },
]

type WidgetOrder = string[]

const defaultOrder: WidgetOrder = ['sales', 'orders', 'conversion', 'avg', 'revenue', 'sources', 'products']

const MainDashboard = () => {
  const [isEditMode, setIsEditMode] = useState(false)
  const [order, setOrder] = useState<WidgetOrder>(defaultOrder)
  const [draggedItem, setDraggedItem] = useState<string | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('widget-order')
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
    localStorage.setItem('widget-order', JSON.stringify(newOrder))
    setDraggedItem(null)
  }

  const onDragEnd = () => {
    setDraggedItem(null)
  }

  const resetOrder = () => {
    setOrder(defaultOrder)
    localStorage.removeItem('widget-order')
  }

  const containerStyle: React.CSSProperties = {
    padding: 'clamp(16px, 3vw, 32px)',
    maxWidth: '100%',
    width: '100%',
    boxSizing: 'border-box',
  }

  const headerStyle: React.CSSProperties = {
    marginBottom: 'clamp(20px, 3vw, 32px)',
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

  const widgetStyle = (id: string): React.CSSProperties => ({
    cursor: isEditMode ? 'move' : 'default',
    opacity: draggedItem === id ? 0.5 : 1,
    transition: 'opacity 0.2s',
    outline: isEditMode ? '2px dashed var(--border-color)' : 'none',
    outlineOffset: isEditMode ? '4px' : '0',
    borderRadius: 'clamp(12px, 2vw, 16px)',
  })

  const statsGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(200px, 25vw, 240px), 1fr))',
    gap: 'clamp(16px, 2.5vw, 20px)',
    marginBottom: 'clamp(20px, 3vw, 24px)',
  }

  const chartsGrid: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 400px',
    gridAutoRows: '400px',
    gap: 'clamp(16px, 2.5vw, 20px)',
    marginBottom: 'clamp(20px, 3vw, 24px)',
  }

  const sectionStyle: React.CSSProperties = {
    marginBottom: 'clamp(20px, 3vw, 24px)',
  }

  const renderWidget = (id: string) => {
    const stat = mockStats.find(s => s.id === id)
    
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
          <StatCard {...stat} />
        </div>
      )
    }

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
            <RevenueChart data={revData} />
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
            <SourcesChart data={mockSourceData} />
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
            <ProductTable products={mockProducts} />
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
            <RevenueChart data={revData} />
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
            <SourcesChart data={mockSourceData} />
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
            <ProductTable products={mockProducts} />
          </div>
        </div>
      )
    }
    
    return null
  }

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div style={titleBlk}>
          <h1 style={h1Style}>Аналитика продаж</h1>
          <p style={subtitleStyle}>Полный отчет по аналитике и статистике</p>
          <p style={hintStyle}>Перетаскивайте виджеты для изменения порядка</p>
        </div>
        <div style={actionsStyle}>
          <button 
            style={iconBtnStyle}
            onClick={() => setIsEditMode(!isEditMode)}
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
              {isEditMode ? 'Сохранить изменения' : 'Изменить виджеты'}
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

      {order.map(id => {
        const statIds = ['sales', 'orders', 'conversion', 'avg']
        
        if(statIds.includes(id)) {
          const statsInOrder = order.filter(orderId => statIds.includes(orderId))
          if(id === statsInOrder[0]) {
            return (
              <div key="stats-grid" className="stats-grid" style={statsGridStyle}>
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
}

export default MainDashboard
