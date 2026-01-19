import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface Props {
  title: string
  data: any[]
}

const ChartWidget = ({ title, data }: Props) => {
  const cardStyle: React.CSSProperties = {
    background: 'var(--bg-secondary)',
    border: '1px solid var(--border-color)',
    borderRadius: 'clamp(8px, 1.5vw, 12px)',
    padding: 'clamp(16px, 3vw, 24px)',
  }

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 'clamp(16px, 3vw, 24px)',
    flexWrap: 'wrap',
    gap: 'clamp(12px, 2vw, 16px)',
  }

  const titleStyle: React.CSSProperties = {
    fontSize: 'clamp(16px, 2vw, 18px)',
    fontWeight: 600,
  }

  const tabsStyle: React.CSSProperties = {
    display: 'flex',
    gap: '8px',
    background: 'var(--bg-tertiary)',
    padding: '4px',
    borderRadius: '8px',
  }

  const tabStyle: React.CSSProperties = {
    background: 'transparent',
    color: 'var(--text-secondary)',
    padding: 'clamp(6px, 1vw, 8px) clamp(12px, 2vw, 16px)',
    borderRadius: '6px',
    fontSize: 'clamp(12px, 1.2vw, 13px)',
    fontWeight: 500,
  }

  const tabActiveStyle: React.CSSProperties = {
    ...tabStyle,
    background: 'var(--accent-primary)',
    color: 'var(--bg-primary)',
  }

  return (
    <div style={cardStyle}>
      <div style={headerStyle}>
        <h3 style={titleStyle}>{title}</h3>
        <div style={tabsStyle}>
          <button style={tabActiveStyle}>По месяцам</button>
          <button style={tabStyle}>По дням</button>
        </div>
      </div>

      <div style={{ width: '100%', height: 'clamp(250px, 40vw, 300px)' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
            <XAxis
              dataKey="name"
              stroke="var(--text-secondary)"
              style={{ fontSize: 'clamp(10px, 1vw, 12px)' }}
            />
            <YAxis
              stroke="var(--text-secondary)"
              style={{ fontSize: 'clamp(10px, 1vw, 12px)' }}
            />
            <Tooltip
              contentStyle={{
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                color: 'var(--text-primary)',
                fontSize: 'clamp(12px, 1.2vw, 14px)',
              }}
            />
            <Bar dataKey="value" fill="var(--accent-primary)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default ChartWidget
