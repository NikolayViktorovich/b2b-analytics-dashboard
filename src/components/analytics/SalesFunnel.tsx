interface P {
  data: { stage: string; value: number; percent: number; color: string }[]
}

const SalesFunnel = ({ data }: P) => {
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

  const funnelWrap: React.CSSProperties = {
    flex: 1,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
  }

  const funnelStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  }

  const stageStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  }

  const topStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }

  const lblStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: 500,
    color: 'var(--text-primary)',
  }

  const valStyle: React.CSSProperties = {
    fontSize: '16px',
    fontWeight: 700,
    color: 'var(--text-primary)',
  }

  const barWrap: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '48px',
    background: 'var(--bg-secondary)',
    borderRadius: '8px',
    overflow: 'hidden',
  }

  const barStyle = (percent: number, color: string): React.CSSProperties => ({
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    width: `${percent}%`,
    background: color,
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 16px',
    transition: 'width 0.3s ease',
  })

  const pctStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: 700,
    color: 'var(--bg-primary)',
  }

  const conversionStyle: React.CSSProperties = {
    marginTop: '16px',
    padding: '16px',
    background: 'var(--bg-secondary)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
  }

  const convLblStyle: React.CSSProperties = {
    fontSize: '14px',
    color: 'var(--text-secondary)',
  }

  const convValStyle: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: 700,
    color: 'var(--accent-primary)',
  }

  const finalConversion = data[data.length - 1].percent

  return (
    <div style={cardStyle}>
      <div style={headerStyle}>
        <div style={titleStyle}>Воронка продаж</div>
        <div style={subtitleStyle}>От просмотра до покупки</div>
      </div>

      <div style={funnelWrap}>
        <div style={funnelStyle}>
          {data.map((stage, idx) => (
            <div key={idx} style={stageStyle}>
              <div style={topStyle}>
                <span style={lblStyle}>{stage.stage}</span>
                <span style={valStyle}>{stage.value.toLocaleString()}</span>
              </div>
              <div style={barWrap}>
                <div style={barStyle(stage.percent, stage.color)}>
                  <span style={pctStyle}>{stage.percent}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={conversionStyle}>
          <span style={convLblStyle}>Общая конверсия</span>
          <span style={convValStyle}>{finalConversion}%</span>
        </div>
      </div>
    </div>
  )
}

export default SalesFunnel
