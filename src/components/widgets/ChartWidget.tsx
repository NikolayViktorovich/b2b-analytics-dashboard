import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface Props {
  title: string
  data: any[]
}

const ChartWidget = ({ title, data }: Props) => {
  const cardStyle: React.CSSProperties = {
    background: 'var(--bg-card)',
    border: '1px solid var(--border-color)',
    borderRadius: '16px',
    padding: '24px',
  }

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '24px',
    flexWrap: 'wrap',
    gap: '16px',
  }

  const titleStyle: React.CSSProperties = {
    fontSize: '16px',
    fontWeight: 600,
    color: 'var(--text-primary)',
  }

  const tabsStyle: React.CSSProperties = {
    display: 'flex',
    gap: '8px',
    background: 'var(--bg-secondary)',
    padding: '4px',
    borderRadius: '10px',
  }

  const tabStyle: React.CSSProperties = {
    background: 'transparent',
    color: 'var(--text-secondary)',
    padding: '8px 16px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: 500,
    transition: 'all 0.2s',
  }

  const tabActiveStyle: React.CSSProperties = {
    ...tabStyle,
    background: 'var(--bg-card)',
    color: 'var(--text-primary)',
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

      <div style={{ width: '100%', height: '300px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
            <XAxis
              dataKey="name"
              stroke="var(--text-muted)"
              style={{ fontSize: '12px' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              stroke="var(--text-muted)"
              style={{ fontSize: '12px' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: '10px',
                color: 'var(--text-primary)',
                fontSize: '14px',
              }}
              cursor={{ fill: 'rgba(196, 255, 97, 0.1)' }}
            />
            <Bar dataKey="value" fill="var(--chart-green)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default ChartWidget
