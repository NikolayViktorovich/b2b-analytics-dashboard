import { useState } from 'react'

interface P {
  data: { month: string; score: number }[]
}

const NPSTrend = ({ data }: P) => {
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
    position: 'relative',
    height: '160px',
    marginBottom: '16px',
    overflow: 'hidden',
  }

  const grid: React.CSSProperties = {
    position: 'absolute',
    top: '20px',
    left: '20px',
    right: '20px',
    bottom: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  }

  const gridLine: React.CSSProperties = {
    height: '1px',
    background: 'var(--border-color)',
    opacity: 0.3,
  }

  const points: React.CSSProperties = {
    position: 'relative',
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: '20px 20px 20px 20px',
  }

  const pointWrap = (score: number): React.CSSProperties => ({
    position: 'relative',
    flex: 1,
    height: '120px',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingBottom: `${(score / 100) * 100}px`,
  })

  const point = (idx: number): React.CSSProperties => {
    const isHov = hovIdx === idx
    return {
      width: isHov ? '14px' : '10px',
      height: isHov ? '14px' : '10px',
      borderRadius: '50%',
      background: '#c4ff61',
      border: '2px solid var(--bg-card)',
      cursor: 'pointer',
      transition: 'all 0.2s',
      position: 'relative',
      zIndex: 2,
    }
  }

  const connector: React.CSSProperties = {
    position: 'absolute',
    height: '2px',
    background: 'rgba(196, 255, 97, 0.4)',
    top: '50%',
    left: '100%',
    width: '100%',
    transformOrigin: 'left center',
  }

  const tooltip: React.CSSProperties = {
    position: 'absolute',
    bottom: '120%',
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'var(--bg-primary)',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    padding: '8px 12px',
    whiteSpace: 'nowrap',
    fontSize: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
    zIndex: 10,
  }

  const labels: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '11px',
    color: 'var(--text-muted)',
    padding: '0 20px',
    flexShrink: 0,
  }

  return (
    <div style={card}>
      <div style={header}>
        <div style={title}>Динамика NPS</div>
        <div style={subtitle}>Последние 6 месяцев</div>
      </div>

      <div style={chartWrap}>
        <div style={grid}>
          <div style={gridLine} />
          <div style={gridLine} />
          <div style={gridLine} />
        </div>

        <div style={points}>
          {data.map((d, i) => (
            <div key={i} style={pointWrap(d.score)}>
              <div
                style={point(i)}
                onMouseEnter={() => setHovIdx(i)}
                onMouseLeave={() => setHovIdx(null)}
              >
                {i < data.length - 1 && <div style={connector} />}
                
                {hovIdx === i && (
                  <div style={tooltip}>
                    <div style={{ color: 'var(--text-muted)', marginBottom: '4px', fontSize: '11px' }}>
                      {d.month}
                    </div>
                    <div style={{ color: '#c4ff61', fontWeight: 600, fontSize: '14px' }}>
                      NPS {d.score}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={labels}>
        {data.map((d, i) => (
          <span key={i}>{d.month}</span>
        ))}
      </div>
    </div>
  )
}

export default NPSTrend
