import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'
import { useState } from 'react'

interface Props {
  data: any[]
}

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload || !payload.length) return null

  const tooltipStyle: React.CSSProperties = {
    background: 'var(--bg-card)',
    border: '1px solid var(--border-color)',
    borderRadius: '12px',
    padding: '12px 16px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
  }

  const labelStyle: React.CSSProperties = {
    fontSize: '12px',
    color: 'var(--text-muted)',
    marginBottom: '4px',
  }

  const valueStyle: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: 700,
    color: 'var(--chart-purple)',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  }

  const badgeStyle: React.CSSProperties = {
    background: 'rgba(139, 92, 246, 0.2)',
    color: 'var(--chart-purple)',
    padding: '2px 8px',
    borderRadius: '6px',
    fontSize: '11px',
    fontWeight: 600,
  }

  return (
    <div style={tooltipStyle}>
      <div style={labelStyle}>{payload[0].payload.month}</div>
      <div style={valueStyle}>
        ${payload[0].value.toLocaleString()}
        <span style={badgeStyle}>Доход</span>
      </div>
    </div>
  )
}

const RevenueChart = ({ data }: Props) => {
  const [activeIdx, setActiveIdx] = useState<number | null>(null)
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
    marginBottom: '16px',
  }

  const valueStyle: React.CSSProperties = {
    fontSize: '32px',
    fontWeight: 700,
    color: 'var(--text-primary)',
    marginBottom: '4px',
  }

  const changeStyle: React.CSSProperties = {
    fontSize: '14px',
    color: 'var(--chart-green)',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
  }

  return (
    <div style={cardStyle}>
      <div style={headerStyle}>
        <div style={titleStyle}>Общий доход</div>
        <div style={subtitleStyle}>Последние 30 дней</div>
        <div style={valueStyle}>$588,250.00</div>
        <div style={changeStyle}>
          ↑ +12%
        </div>
      </div>

      <div style={{ width: '100%', height: '280px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart 
            data={data}
            onMouseMove={(state) => {
              if (state.isTooltipActive) {
                setActiveIdx(state.activeTooltipIndex ?? null)
              } else {
                setActiveIdx(null)
              }
            }}
            onMouseLeave={() => setActiveIdx(null)}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--chart-purple)" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="var(--chart-purple)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
            <XAxis
              dataKey="month"
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
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: 'var(--chart-purple)', strokeWidth: 2, strokeDasharray: '5 5' }}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="var(--chart-purple)" 
              strokeWidth={3}
              fill="url(#colorValue)"
              dot={(props: any) => {
                const { cx, cy, index } = props
                const isActive = index === activeIdx
                return (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isActive ? 6 : 4}
                    fill="var(--chart-purple)"
                    stroke="var(--bg-card)"
                    strokeWidth={2}
                    style={{ transition: 'all 0.2s' }}
                  />
                )
              }}
              activeDot={{
                r: 8,
                fill: 'var(--chart-purple)',
                stroke: 'var(--bg-card)',
                strokeWidth: 3,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default RevenueChart
