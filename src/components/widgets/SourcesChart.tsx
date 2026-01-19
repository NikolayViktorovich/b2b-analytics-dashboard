import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from 'recharts'
import { useState } from 'react'

interface Props {
  data: { name: string; value: number; color: string }[]
}

const SourcesChart = ({ data }: Props) => {
  const [activeIdx, setActiveIdx] = useState<number | null>(null)
  const [ttData, setTtData] = useState<{ name: string; value: number; percentage: string; color: string } | null>(null)
  const [clicked, setClicked] = useState(false)
  const total = data.reduce((sum, item) => sum + item.value, 0)

  const renderActive = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props

    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 10}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          cornerRadius={8}
        />
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={outerRadius + 12}
          outerRadius={outerRadius + 14}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          opacity={0.3}
          cornerRadius={8}
        />
      </g>
    )
  }

  const handleClick = (_: any, idx: number) => {
    const item = data[idx]
    const pct = ((item.value / total) * 100).toFixed(1)
    setActiveIdx(idx)
    setClicked(true)
    setTtData({
      name: item.name,
      value: item.value,
      percentage: pct,
      color: item.color,
    })
  }

  const handleEnter = (_: any, idx: number) => {
    if (!clicked) {
      setActiveIdx(idx)
    }
  }

  const handleLeave = () => {
    if (!clicked) {
      setActiveIdx(null)
    }
  }

  const onChartLeave = () => {
    setActiveIdx(null)
    setTtData(null)
    setClicked(false)
  }

  const cardStyle: React.CSSProperties = {
    background: 'var(--bg-card)',
    border: '1px solid var(--border-color)',
    borderRadius: '16px',
    padding: '16px',
    height: '816px',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    userSelect: 'none',
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
    outline: 'none',
    minHeight: '300px',
    flexShrink: 0,
  }

  const centerTxt: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    pointerEvents: 'none',
  }

  const centerVal: React.CSSProperties = {
    fontSize: '28px',
    fontWeight: 700,
    color: 'var(--text-primary)',
  }

  const centerLbl: React.CSSProperties = {
    fontSize: '12px',
    color: 'var(--text-muted)',
    marginTop: '4px',
  }

  const tooltipStyle: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    right: '20px',
    transform: 'translateY(-50%)',
    background: 'var(--bg-secondary)',
    border: `2px solid ${ttData?.color || 'var(--border-color)'}`,
    borderRadius: '12px',
    padding: '12px 16px',
    minWidth: '140px',
    boxShadow: `0 8px 24px ${ttData?.color || '#000'}40`,
    animation: 'slideIn 0.3s ease-out',
  }

  const ttName: React.CSSProperties = {
    fontSize: '12px',
    color: 'var(--text-muted)',
    marginBottom: '4px',
  }

  const ttVal: React.CSSProperties = {
    fontSize: '20px',
    fontWeight: 700,
    color: 'var(--text-primary)',
    marginBottom: '4px',
  }

  const ttPct: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: 600,
    color: ttData?.color || 'var(--text-primary)',
  }

  const legendStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    flex: 1,
    overflowY: 'auto',
  }

  const legendItem = (idx: number): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 12px',
    background: activeIdx === idx ? 'var(--bg-tertiary)' : 'var(--bg-secondary)',
    borderRadius: '8px',
    transition: 'all 0.2s',
    cursor: 'pointer',
    outline: 'none',
    border: 'none',
    width: '100%',
  })

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
        <div style={titleStyle}>Источники продаж</div>
        <div style={subtitleStyle}>Продажи за эту неделю</div>
      </div>

      <div style={chartWrap} onMouseLeave={onChartLeave}>
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
              activeIndex={activeIdx ?? undefined}
              activeShape={renderActive}
              onMouseEnter={handleEnter}
              onMouseLeave={handleLeave}
              onClick={handleClick}
              isAnimationActive={false}
              cornerRadius={8}
              stroke="none"
            >
              {data.map((entry, idx) => (
                <Cell 
                  key={`cell-${idx}`} 
                  fill={entry.color}
                  style={{ 
                    cursor: 'pointer',
                    outline: 'none',
                  }}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        
        <div style={centerTxt}>
          <div style={centerVal}>${(total * 15.5).toFixed(0)}</div>
          <div style={centerLbl}>Всего продаж</div>
        </div>

        {ttData && (
          <div style={tooltipStyle}>
            <div style={ttName}>{ttData.name}</div>
            <div style={ttVal}>{ttData.value}</div>
            <div style={ttPct}>{ttData.percentage}%</div>
          </div>
        )}
      </div>

      <div style={legendStyle}>
        {data.map((item, idx) => {
          return (
            <button
              key={idx} 
              style={legendItem(idx)}
              onMouseEnter={() => {
                if (!clicked) setActiveIdx(idx)
              }}
              onMouseLeave={() => {
                if (!clicked) setActiveIdx(null)
              }}
              onClick={() => handleClick(null, idx)}
              onFocus={(e) => e.currentTarget.style.outline = 'none'}
            >
              <div style={legendLbl}>
                <div style={{ 
                  width: '10px', 
                  height: '10px', 
                  borderRadius: '3px', 
                  background: item.color,
                  boxShadow: activeIdx === idx ? `0 0 8px ${item.color}` : 'none',
                  transition: 'all 0.2s',
                }} />
                <span>{item.name}</span>
              </div>
              <div style={legendVal}>{item.value}</div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default SourcesChart
