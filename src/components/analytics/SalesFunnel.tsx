import { useState } from 'react'

interface P {
  data: { stage: string; value: number; percent: number; color: string }[]
}

const SalesFunnel = ({ data }: P) => {
  const [hovIdx, setHovIdx] = useState<number | null>(null)

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
    flexDirection: 'column',
    gap: '8px',
    padding: '12px',
    background: hovIdx === idx ? 'var(--bg-secondary)' : 'transparent',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  })

  const top: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }

  const label: React.CSSProperties = {
    fontSize: '13px',
    fontWeight: 500,
    color: 'var(--text-primary)',
  }

  const value: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: 600,
    color: 'var(--text-primary)',
  }

  const barWrap: React.CSSProperties = {
    height: '32px',
    background: 'var(--bg-tertiary)',
    borderRadius: '6px',
    overflow: 'hidden',
    position: 'relative',
  }

  const barFill = (percent: number, color: string, isHov: boolean): React.CSSProperties => ({
    height: '100%',
    width: `${Math.max(percent, 15)}%`,
    background: color,
    opacity: isHov ? 1 : 0.8,
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: '12px',
  })

  const pct: React.CSSProperties = {
    fontSize: '12px',
    fontWeight: 600,
    color: 'var(--bg-primary)',
  }

  const conv: React.CSSProperties = {
    marginTop: '8px',
    padding: '12px',
    background: 'var(--bg-secondary)',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
  }

  const convLabel: React.CSSProperties = {
    fontSize: '13px',
    color: 'var(--text-muted)',
  }

  const convValue: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: 600,
    color: 'var(--accent-primary)',
  }

  return (
    <div style={card}>
      <div style={header}>
        <div style={title}>Воронка продаж</div>
        <div style={subtitle}>От просмотра до покупки</div>
      </div>

      <div style={chartWrap}>
        {data.map((d, i) => (
          <div
            key={i}
            style={row(i)}
            onMouseEnter={() => setHovIdx(i)}
            onMouseLeave={() => setHovIdx(null)}
          >
            <div style={top}>
              <span style={label}>{d.stage}</span>
              <span style={value}>{d.value.toLocaleString()}</span>
            </div>
            <div style={barWrap}>
              <div style={barFill(d.percent, d.color, hovIdx === i)}>
                <span style={pct}>{d.percent}%</span>
              </div>
            </div>
          </div>
        ))}

        <div style={conv}>
          <span style={convLabel}>Общая конверсия</span>
          <span style={convValue}>{data[data.length - 1].percent}%</span>
        </div>
      </div>
    </div>
  )
}

export default SalesFunnel
