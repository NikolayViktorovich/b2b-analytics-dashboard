import { useState } from 'react'

interface P {
  data: any[]
}

const RevenueChart = ({ data }: P) => {
  const [hovIdx, setHovIdx] = useState<number | null>(null)
  
  const max = Math.max(...data.map(d => d.value))
  const min = Math.min(...data.map(d => d.value))
  const range = max - min
  const totalVal = data.reduce((sum, d) => sum + d.value, 0)

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
    marginBottom: '8px',
  }

  const total: React.CSSProperties = {
    fontSize: '28px',
    fontWeight: 700,
    color: 'var(--text-primary)',
    marginBottom: '4px',
  }

  const change: React.CSSProperties = {
    fontSize: '13px',
    color: '#4ade80',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
  }

  const chartWrap: React.CSSProperties = {
    position: 'relative',
    display: 'flex',
    alignItems: 'flex-end',
    gap: '6px',
    padding: '0 4px',
    flex: 1,
  }

  const bar = (idx: number, val: number): React.CSSProperties => {
    const h = ((val - min) / range) * 100
    const isHov = hovIdx === idx
    return {
      flex: 1,
      height: `${Math.max(h, 10)}%`,
      background: isHov ? '#8b5cf6' : 'rgba(139, 92, 246, 0.5)',
      borderRadius: '4px 4px 0 0',
      cursor: 'pointer',
      transition: 'all 0.15s',
      position: 'relative',
    }
  }

  const tooltip: React.CSSProperties = {
    position: 'absolute',
    bottom: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'var(--bg-primary)',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    padding: '8px 12px',
    marginBottom: '8px',
    whiteSpace: 'nowrap',
    fontSize: '12px',
    pointerEvents: 'none',
    zIndex: 10,
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
  }

  const labels: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '12px',
    fontSize: '11px',
    color: 'var(--text-muted)',
    flexShrink: 0,
  }

  return (
    <div style={card}>
      <div style={header}>
        <div style={title}>Общий доход</div>
        <div style={subtitle}>Последние 12 месяцев</div>
        <div style={total}>${(totalVal / 1000).toFixed(0)}k</div>
        <div style={change}>
          ↑ +12.5%
        </div>
      </div>
      
      <div style={chartWrap}>
        {data.map((d, i) => (
          <div
            key={i}
            style={bar(i, d.value)}
            onMouseEnter={() => setHovIdx(i)}
            onMouseLeave={() => setHovIdx(null)}
          >
            {hovIdx === i && (
              <div style={tooltip}>
                <div style={{ color: 'var(--text-muted)', marginBottom: '4px', fontSize: '11px' }}>
                  {d.month}
                </div>
                <div style={{ color: '#8b5cf6', fontWeight: 600, fontSize: '14px' }}>
                  ${(d.value / 1000).toFixed(1)}k
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div style={labels}>
        <span>{data[0]?.month}</span>
        <span>{data[Math.floor(data.length / 2)]?.month}</span>
        <span>{data[data.length - 1]?.month}</span>
      </div>
    </div>
  )
}

export default RevenueChart
