interface Props {
  data: {
    curr: { revenue: number; orders: number; conversion: number; avgCheck: number }
    prev: { revenue: number; orders: number; conversion: number; avgCheck: number }
  }
}

const PeriodComparison = ({ data }: Props) => {
  const { curr, prev } = data

  const calcChange = (currVal: number, prevVal: number) => {
    return ((currVal - prevVal) / prevVal) * 100
  }

  const metrics = [
    { 
      label: 'Доход', 
      curr: `$${(curr.revenue / 1000).toFixed(0)}K`, 
      change: calcChange(curr.revenue, prev.revenue) 
    },
    { 
      label: 'Заказы', 
      curr: curr.orders.toString(), 
      change: calcChange(curr.orders, prev.orders) 
    },
    { 
      label: 'Конверсия', 
      curr: `${curr.conversion}%`, 
      change: calcChange(curr.conversion, prev.conversion) 
    },
    { 
      label: 'Средний чек', 
      curr: `$${curr.avgCheck.toFixed(0)}`, 
      change: calcChange(curr.avgCheck, prev.avgCheck) 
    },
  ]

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
    gap: '8px',
  }

  const lblStyle: React.CSSProperties = {
    fontSize: '12px',
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  }

  const valStyle: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: 700,
    color: 'var(--text-primary)',
  }

  const changeStyle = (change: number): React.CSSProperties => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '13px',
    fontWeight: 600,
    color: change > 0 ? 'var(--accent-primary)' : 'var(--error)',
  })

  return (
    <div style={cardStyle}>
      <div style={headerStyle}>
        <div style={titleStyle}>Сравнение периодов</div>
        <div style={subtitleStyle}>Текущий vs предыдущий месяц</div>
      </div>

      <div style={listStyle}>
        {metrics.map((metric, idx) => (
          <div key={idx} style={itemStyle}>
            <span style={lblStyle}>{metric.label}</span>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={valStyle}>{metric.curr}</span>
              <span style={changeStyle(metric.change)}>
                {metric.change > 0 ? '↑' : '↓'} {Math.abs(metric.change).toFixed(1)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PeriodComparison
