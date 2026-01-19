import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

interface Props {
  data: { name: string; sales: number; orders: number; growth: number; color: string }[]
}

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload || !payload.length) return null

  const data = payload[0].payload

  const ttStyle: React.CSSProperties = {
    background: 'var(--bg-card)',
    border: '1px solid var(--border-color)',
    borderRadius: '12px',
    padding: '12px 16px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
  }

  const nameStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: 600,
    color: 'var(--text-primary)',
    marginBottom: '8px',
  }

  const rowStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '16px',
    fontSize: '12px',
    marginBottom: '4px',
  }

  const lblStyle: React.CSSProperties = {
    color: 'var(--text-muted)',
  }

  const valStyle: React.CSSProperties = {
    fontWeight: 600,
    color: 'var(--text-primary)',
  }

  return (
    <div style={ttStyle}>
      <div style={nameStyle}>{data.name}</div>
      <div style={rowStyle}>
        <span style={lblStyle}>Продажи:</span>
        <span style={valStyle}>${(data.sales / 1000).toFixed(0)}K</span>
      </div>
      <div style={rowStyle}>
        <span style={lblStyle}>Заказы:</span>
        <span style={valStyle}>{data.orders}</span>
      </div>
      <div style={rowStyle}>
        <span style={lblStyle}>Рост:</span>
        <span style={{ ...valStyle, color: data.growth > 0 ? 'var(--accent-primary)' : 'var(--error)' }}>
          {data.growth > 0 ? '+' : ''}{data.growth}%
        </span>
      </div>
    </div>
  )
}

const CategorySales = ({ data }: Props) => {
  const cardStyle: React.CSSProperties = {
    background: 'var(--bg-card)',
    border: '1px solid var(--border-color)',
    borderRadius: '16px',
    padding: '24px',
  }

  const headerStyle: React.CSSProperties = {
    marginBottom: '24px',
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

  return (
    <div style={cardStyle}>
      <div style={headerStyle}>
        <div style={titleStyle}>Продажи по категориям</div>
        <div style={subtitleStyle}>Топ категорий товаров</div>
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
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(196, 255, 97, 0.1)' }} />
            <Bar dataKey="sales" radius={[8, 8, 0, 0]}>
              {data.map((entry, idx) => (
                <Cell key={`cell-${idx}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default CategorySales
