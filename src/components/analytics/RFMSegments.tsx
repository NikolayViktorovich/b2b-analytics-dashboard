interface P {
  data: { segment: string; count: number; revenue: number; color: string; desc: string }[]
}

const RFMSegments = ({ data }: P) => {
  const total = data.reduce((sum, item) => sum + item.count, 0)

  const cardStyle: React.CSSProperties = {
    background: 'var(--bg-card)',
    border: '1px solid var(--border-color)',
    borderRadius: '16px',
    padding: '16px',
    height: '400px',
    display: 'flex',
    flexDirection: 'column',
  }

  const headerStyle: React.CSSProperties = {
    marginBottom: '16px',
    flexShrink: 0,
  }

  const titleStyle: React.CSSProperties = {
    fontSize: '16px',
    fontWeight: 600,
    color: 'var(--text-primary)',
    marginBottom: '4px',
  }

  const subtitleStyle: React.CSSProperties = {
    fontSize: '13px',
    color: 'var(--text-muted)',
  }

  const listStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    flex: 1,
    overflowY: 'auto',
    overflowX: 'hidden',
  }

  const itemStyle: React.CSSProperties = {
    padding: '16px',
    background: 'var(--bg-secondary)',
    borderRadius: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  }

  const topStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }

  const leftStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  }

  const dotStyle = (color: string): React.CSSProperties => ({
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    background: color,
    boxShadow: `0 0 8px ${color}`,
  })

  const nameStyle: React.CSSProperties = {
    fontSize: '15px',
    fontWeight: 600,
    color: 'var(--text-primary)',
  }

  const descStyle: React.CSSProperties = {
    fontSize: '12px',
    color: 'var(--text-muted)',
  }

  const statsStyle: React.CSSProperties = {
    display: 'flex',
    gap: '16px',
  }

  const statStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  }

  const statLblStyle: React.CSSProperties = {
    fontSize: '11px',
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  }

  const statValStyle: React.CSSProperties = {
    fontSize: '16px',
    fontWeight: 700,
    color: 'var(--text-primary)',
  }

  const pctStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: 600,
    color: 'var(--text-secondary)',
  }

  return (
    <div style={cardStyle}>
      <div style={headerStyle}>
        <div style={titleStyle}>RFM сегменты</div>
        <div style={subtitleStyle}>Сегментация клиентов</div>
      </div>

      <div style={listStyle}>
        {data.map((seg, idx) => {
          const pct = ((seg.count / total) * 100).toFixed(0)
          return (
            <div key={idx} style={itemStyle}>
              <div style={topStyle}>
                <div style={leftStyle}>
                  <div style={dotStyle(seg.color)} />
                  <div>
                    <div style={nameStyle}>{seg.segment}</div>
                    <div style={descStyle}>{seg.desc}</div>
                  </div>
                </div>
                <div style={pctStyle}>{pct}%</div>
              </div>
              <div style={statsStyle}>
                <div style={statStyle}>
                  <span style={statLblStyle}>Клиенты</span>
                  <span style={statValStyle}>{seg.count}</span>
                </div>
                <div style={statStyle}>
                  <span style={statLblStyle}>Доход</span>
                  <span style={statValStyle}>${(seg.revenue / 1000).toFixed(0)}K</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default RFMSegments
