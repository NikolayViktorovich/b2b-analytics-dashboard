import { useState } from 'react'

interface P {
  data: { name: string; sales: number; orders: number; growth: number; color: string }[]
}

const CategorySales = ({ data }: P) => {
  const [hovIdx, setHovIdx] = useState<number | null>(null)
  
  const maxSales = Math.max(...data.map(d => d.sales))

  const card: React.CSSProperties = {
    background: 'var(--bg-card)',
    border: '1px solid var(--border-color)',
    borderRadius: '16px',
    padding: '16px',
    height: '400px',
    display: 'flex',
    flexDirection: 'column',
  }

  const header: React.CSSProperties = {
    marginBottom: '16px',
    flexShrink: 0,
  }

  const title: React.CSSProperties = {
    fontSize: '16px',
    fontWeight: 600,
    color: 'var(--text-primary)',
    marginBottom: '4px',
  }

  const subtitle: React.CSSProperties = {
    fontSize: '13px',
    color: 'var(--text-muted)',
  }

  const chartWrap: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    flex: 1,
    overflowY: 'auto',
  }

  const row = (idx: number): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px',
    background: hovIdx === idx ? 'var(--bg-secondary)' : 'transparent',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  })

  const label: React.CSSProperties = {
    fontSize: '13px',
    fontWeight: 500,
    color: 'var(--text-primary)',
    minWidth: '100px',
  }

  const barWrap: React.CSSProperties = {
    flex: 1,
    height: '32px',
    background: 'var(--bg-tertiary)',
    borderRadius: '6px',
    overflow: 'hidden',
    position: 'relative',
  }

  const barFill = (sales: number, color: string, isHov: boolean): React.CSSProperties => ({
    height: '100%',
    width: `${(sales / maxSales) * 100}%`,
    background: color,
    opacity: isHov ? 1 : 0.8,
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: '12px',
  })

  const value: React.CSSProperties = {
    fontSize: '12px',
    fontWeight: 600,
    color: 'var(--bg-primary)',
  }

  const growth = (g: number): React.CSSProperties => ({
    fontSize: '12px',
    fontWeight: 600,
    color: g > 0 ? '#4ade80' : '#f87171',
    minWidth: '50px',
    textAlign: 'right',
  })

  return (
    <div style={card}>
      <div style={header}>
        <div style={title}>Продажи по категориям</div>
        <div style={subtitle}>Топ 5 категорий товаров</div>
      </div>

      <div style={chartWrap}>
        {data.map((d, i) => (
          <div
            key={i}
            style={row(i)}
            onMouseEnter={() => setHovIdx(i)}
            onMouseLeave={() => setHovIdx(null)}
          >
            <div style={label}>{d.name}</div>
            <div style={barWrap}>
              <div style={barFill(d.sales, d.color, hovIdx === i)}>
                <span style={value}>${(d.sales / 1000).toFixed(0)}k</span>
              </div>
            </div>
            <div style={growth(d.growth)}>
              {d.growth > 0 ? '+' : ''}{d.growth}%
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategorySales
