import { useState, useEffect } from 'react'
import NPSScore from '@/components/nps/NPSScore'
import NPSTrend from '@/components/nps/NPSTrend'
import NPSDistribution from '@/components/nps/NPSDistribution'
import NPSReviews from '@/components/nps/NPSReviews'
import NPSCategories from '@/components/nps/NPSCategories'

const npsData = {
  curr: 42,
  prev: 38,
  change: 4,
  total: 1247,
  promoters: 587,
  passives: 423,
  detractors: 237,
}

const trendData = [
  { month: 'Янв', score: 35 },
  { month: 'Фев', score: 38 },
  { month: 'Мар', score: 36 },
  { month: 'Апр', score: 40 },
  { month: 'Май', score: 39 },
  { month: 'Июн', score: 42 },
]

const distData = [
  { name: 'Промоутеры', value: 587, color: '#4ade80', percent: 47 },
  { name: 'Нейтралы', value: 423, color: '#fbbf24', percent: 34 },
  { name: 'Критики', value: 237, color: '#f87171', percent: 19 },
]

const reviews = [
  { id: 1, score: 9, name: 'Алексей М.', date: '2 часа назад', text: 'Отличный сервис, все работает быстро и понятно. Рекомендую!', category: 'Качество' },
  { id: 2, score: 3, name: 'Мария К.', date: '5 часов назад', text: 'Долгая загрузка страниц, часто зависает. Нужно улучшать производительность.', category: 'Производительность' },
  { id: 3, score: 10, name: 'Дмитрий П.', date: '1 день назад', text: 'Лучшая панель аналитики, которую я использовал. Все интуитивно понятно.', category: 'Удобство' },
  { id: 4, score: 7, name: 'Елена С.', date: '1 день назад', text: 'В целом хорошо, но не хватает некоторых функций экспорта данных.', category: 'Функционал' },
  { id: 5, score: 2, name: 'Игорь В.', date: '2 дня назад', text: 'Слишком дорого для такого функционала. Есть более дешевые аналоги.', category: 'Цена' },
]

const categories = [
  { name: 'Качество', count: 342, sentiment: 'positive' as const },
  { name: 'Удобство', count: 298, sentiment: 'positive' as const },
  { name: 'Производительность', count: 187, sentiment: 'negative' as const },
  { name: 'Функционал', count: 156, sentiment: 'neutral' as const },
  { name: 'Цена', count: 143, sentiment: 'negative' as const },
  { name: 'Поддержка', count: 121, sentiment: 'positive' as const },
]

type WidgetOrder = string[]
const defaultOrder: WidgetOrder = ['score', 'trend', 'distribution', 'reviews', 'categories']

const NPSPage = () => {
  const [isEditMode, setIsEditMode] = useState(false)
  const [order, setOrder] = useState<WidgetOrder>(defaultOrder)
  const [draggedItem, setDraggedItem] = useState<string | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('nps-widget-order')
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
    localStorage.setItem('nps-widget-order', JSON.stringify(order))
    setIsEditMode(false)
  }

  const resetOrder = () => {
    setOrder(defaultOrder)
    localStorage.removeItem('nps-widget-order')
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
    const isTall = id === 'distribution'
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
      case 'score':
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
            <NPSScore data={npsData} />
          </div>
        )
      case 'trend':
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
            <NPSTrend data={trendData} />
          </div>
        )
      case 'distribution':
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
            <NPSDistribution data={distData} />
          </div>
        )
      case 'reviews':
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
            <NPSReviews reviews={reviews} />
          </div>
        )
      case 'categories':
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
            <NPSCategories categories={categories} />
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
          <h1 style={h1Style}>NPS опросы</h1>
          <p style={subtitleStyle}>Анализ удовлетворенности клиентов</p>
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

export default NPSPage
