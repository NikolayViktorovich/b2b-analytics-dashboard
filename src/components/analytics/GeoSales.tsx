interface P {
  data: { region: string; sales: number; orders: number; percent: number }[]
}

const GeoSales = ({ data }: P) => {
  const maxSales = Math.max(...data.map(d => d.sales))

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
  }

  const itemStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  }

  const topStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }

  const regionStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: 500,
    color: 'var(--text-primary)',
  }

  const statsStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  }

  const salesStyle: React.CSSProperties = {
    fontSize: '15px',
    fontWeight: 700,
    color: 'var(--text-primary)',
  }

  const ordersStyle: React.CSSProperties = {
    fontSize: '13px',
    color: 'var(--text-muted)',
  }

  const barWrap: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '8px',
    background: 'var(--bg-secondary)',
    borderRadius: '4px',
    overflow: 'hidden',
  }

  const barStyle = (sales: number): React.CSSProperties => ({
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    width: `${(sales / maxSales) * 100}%`,
    background: 'linear-gradient(90deg, var(--accent-primary) 0%, var(--accent-dark) 100%)',
    borderRadius: '4px',
    transition: 'width 0.3s ease',
  })

  const pctStyle: React.CSSProperties = {
    fontSize: '12px',
    fontWeight: 600,
    color: 'var(--accent-primary)',
  }

  return (
    <div style={cardStyle}>
      <div style={headerStyle}>
        <div style={titleStyle}>География продаж</div>
        <div style={subtitleStyle}>Топ регионов по продажам</div>
      </div>

      <div style={listStyle}>
        {data.map((item, idx) => (
          <div key={idx} style={itemStyle}>
            <div style={topStyle}>
              <span style={regionStyle}>{item.region}</span>
              <div style={statsStyle}>
                <span style={salesStyle}>${(item.sales / 1000).toFixed(0)}K</span>
                <span style={ordersStyle}>({item.orders})</span>
                <span style={pctStyle}>{item.percent}%</span>
              </div>
            </div>
            <div style={barWrap}>
              <div style={barStyle(item.sales)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GeoSales
