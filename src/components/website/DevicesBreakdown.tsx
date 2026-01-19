import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

interface P {
  data: { name: string; value: number; percent: number; color: string }[]
}

const DevicesBreakdown = ({ data }: P) => {
  const cardStyle: React.CSSProperties = {
    background: 'var(--bg-card)',
    border: '1px solid var(--border-color)',
    borderRadius: '16px',
    padding: '16px',
    height: '816px',
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

  const chartWrap: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    flex: 1,
    marginBottom: '16px',
    minHeight: '300px',
  }

  const legendStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    flexShrink: 0,
  }

  const legendItem: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 12px',
    background: 'var(--bg-secondary)',
    borderRadius: '8px',
  }

  const legendLbl: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    color: 'var(--text-secondary)',
  }

  const legendVal: React.CSSProperties = {
    fontSize: '16px',
    fontWeight: 600,
    color: 'var(--text-primary)',
  }

  return (
    <div style={cardStyle}>
      <div style={headerStyle}>
        <div style={titleStyle}>Устройства</div>
        <div style={subtitleStyle}>Распределение по типам</div>
      </div>

      <div style={chartWrap}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={85}
              paddingAngle={3}
              dataKey="value"
              isAnimationActive={false}
              cornerRadius={6}
              stroke="none"
            >
              {data.map((entry, idx) => (
                <Cell key={`cell-${idx}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div style={legendStyle}>
        {data.map((item, idx) => (
          <div key={idx} style={legendItem}>
            <div style={legendLbl}>
              <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: item.color }} />
              <span>{item.name}</span>
            </div>
            <div style={legendVal}>{item.percent}%</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DevicesBreakdown
