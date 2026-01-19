import { useState } from 'react'

interface P {
  data: { name: string; value: number; percent: number; color: string }[]
}

const TrafficSources = ({ data }: P) => {
  const [hovIdx, setHovIdx] = useState<number | null>(null)
  
  const maxVal = Math.max(...data.map(d => d.value))

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
  }

  const row: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  }

  const label: React.CSSProperties = {
    fontSize: '13px',
    fontWeight: 500,
    color: 'var(--text-primary)',
    minWidth: '80px',
  }

  const barWrap: React.CSSProperties = {
    flex: 1,
    height: '40px',
    background: 'var(--bg-tertiary)',
    borderRadius: '8px',
    overflow: 'hidden',
    position: 'relative',
  }

  const barFill = (val: number, color: string, isHov: boolean): React.CSSProperties => ({
    height: '100%',
    width: `${(val / maxVal) * 100}%`,
    background: color,
    opacity: isHov ? 1 : 0.85,
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 12px',
  })

  const valTxt: React.CSSProperties = {
    fontSize: '13px',
    fontWeight: 600,
    color: 'var(--bg-primary)',
  }

  const pct: React.CSSProperties = {
    fontSize: '12px',
    fontWeight: 600,
    color: 'var(--text-muted)',
    minWidth: '40px',
    textAlign: 'right',
  }

  return (
    <div style={card}>
      <div style={header}>
        <div style={title}>Источники трафика</div>
        <div style={subtitle}>Откуда приходят пользователи</div>
      </div>

      <div style={chartWrap}>
        {data.map((d, i) => (
          <div
            key={i}
            style={row}
            onMouseEnter={() => setHovIdx(i)}
            onMouseLeave={() => setHovIdx(null)}
          >
            <div style={label}>{d.name}</div>
            <div style={barWrap}>
              <div style={barFill(d.value, d.color, hovIdx === i)}>
                <span style={valTxt}>{d.value.toLocaleString()}</span>
              </div>
            </div>
            <div style={pct}>{d.percent}%</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TrafficSources
