import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from 'recharts'
import { useState } from 'react'

interface Props {
  data: { name: string; value: number; color: string }[]
}

const DonutChart = ({ data }: Props) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const total = data.reduce((sum, item) => sum + item.value, 0)

  const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props

    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 8}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
      </g>
    )
  }

  const cardStyle: React.CSSProperties = {
    background: 'var(--bg-card)',
    border: '1px solid var(--border-color)',
    borderRadius: '16px',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
  }

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '24px',
  }

  const titleStyle: React.CSSProperties = {
    fontSize: '16px',
    fontWeight: 600,
    color: 'var(--text-primary)',
  }

  const subtitleStyle: React.CSSProperties = {
    fontSize: '13px',
    color: 'var(--text-muted)',
  }

  const chartContainerStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '200px',
    marginBottom: '24px',
  }

  const centerTextStyle: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
  }

  const centerValueStyle: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: 700,
    color: 'var(--text-primary)',
  }

  const centerLabelStyle: React.CSSProperties = {
    fontSize: '12px',
    color: 'var(--text-muted)',
  }

  const legendStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  }

  const legendItemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }

  const legendLabelStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    color: 'var(--text-secondary)',
  }

  const legendValueStyle: React.CSSProperties = {
    fontSize: '16px',
    fontWeight: 600,
    color: 'var(--text-primary)',
  }

  return (
    <div style={cardStyle}>
      <div style={headerStyle}>
        <div>
          <div style={titleStyle}>Источники продаж</div>
          <div style={subtitleStyle}>Продажи за эту неделю</div>
        </div>
      </div>

      <div style={chartContainerStyle}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              activeIndex={activeIndex ?? undefined}
              activeShape={renderActiveShape}
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color}
                  style={{ 
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                  }}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div style={centerTextStyle}>
          <div style={centerValueStyle}>${(total * 15.5).toFixed(0)}</div>
          <div style={centerLabelStyle}>Всего продаж</div>
        </div>
      </div>

      <div style={legendStyle}>
        {data.map((item, index) => (
          <div key={index} style={legendItemStyle}>
            <div style={legendLabelStyle}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.color }} />
              <span>{item.name}</span>
            </div>
            <div style={legendValueStyle}>{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DonutChart
