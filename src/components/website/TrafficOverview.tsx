interface P {
  data: {
    total: number
    unique: number
    pageviews: number
    avgDuration: string
    bounceRate: number
    change: number
  }
}

const TrafficOverview = ({ data }: P) => {
  const { total, unique, pageviews, avgDuration, bounceRate, change } = data

  const cardStyle: React.CSSProperties = {
    background: 'var(--bg-card)',
    border: '1px solid var(--border-color)',
    borderRadius: '16px',
    padding: '16px',
    height: '400px',
    maxHeight: '400px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  }

  const mainStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '16px',
  }

  const leftStyle: React.CSSProperties = {
    flex: 1,
  }

  const labelStyle: React.CSSProperties = {
    fontSize: '14px',
    color: 'var(--text-muted)',
    marginBottom: '8px',
    fontWeight: 500,
  }

  const totalStyle: React.CSSProperties = {
    fontSize: 'clamp(48px, 8vw, 72px)',
    fontWeight: 800,
    color: 'var(--accent-primary)',
    lineHeight: 1,
    marginBottom: '8px',
  }

  const changeStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 12px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 600,
    background: change > 0 ? 'rgba(196, 255, 97, 0.15)' : 'rgba(248, 113, 113, 0.15)',
    color: change > 0 ? 'var(--accent-primary)' : 'var(--error)',
  }

  const statsGrid: React.CSSProperties = {
    display: window.innerWidth >= 768 ? 'grid' : 'flex',
    gridTemplateColumns: window.innerWidth >= 768 ? 'repeat(auto-fit, minmax(140px, 1fr))' : '1fr',
    flexDirection: 'column',
    gap: 'clamp(12px, 2vw, 16px)',
  }

  const statStyle: React.CSSProperties = {
    padding: '16px',
    background: 'var(--bg-secondary)',
    borderRadius: '12px',
  }

  const statLblStyle: React.CSSProperties = {
    fontSize: '12px',
    color: 'var(--text-muted)',
    marginBottom: '8px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  }

  const statValStyle: React.CSSProperties = {
    fontSize: '20px',
    fontWeight: 700,
    color: 'var(--text-primary)',
  }

  return (
    <div style={cardStyle}>
      <div style={mainStyle}>
        <div style={leftStyle}>
          <div style={labelStyle}>Всего посещений</div>
          <div style={totalStyle}>{total.toLocaleString()}</div>
          <div style={changeStyle}>
            {change > 0 ? '↑' : '↓'} {Math.abs(change)}% за месяц
          </div>
        </div>
      </div>

      <div style={statsGrid}>
        <div style={statStyle}>
          <div style={statLblStyle}>Уникальные</div>
          <div style={statValStyle}>{unique.toLocaleString()}</div>
        </div>
        <div style={statStyle}>
          <div style={statLblStyle}>Просмотры</div>
          <div style={statValStyle}>{pageviews.toLocaleString()}</div>
        </div>
        <div style={statStyle}>
          <div style={statLblStyle}>Ср. время</div>
          <div style={statValStyle}>{avgDuration}</div>
        </div>
        <div style={statStyle}>
          <div style={statLblStyle}>Отказы</div>
          <div style={statValStyle}>{bounceRate}%</div>
        </div>
      </div>
    </div>
  )
}

export default TrafficOverview
