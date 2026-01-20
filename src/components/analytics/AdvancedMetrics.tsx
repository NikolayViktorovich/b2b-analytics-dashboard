import { useState, useEffect } from 'react'
import { analyticsApi } from '@/services/api'

const AdvancedMetrics = () => {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try{
        const result = await analyticsApi.getAll()
        setData((result as any[])[0])
      }catch(error){
        setData(null)
      }finally{
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const card: React.CSSProperties = {
    background: 'var(--bg-card)',
    border: '1px solid var(--border-color)',
    borderRadius: '16px',
    padding: '16px',
    height: '400px',
    display: 'flex',
    flexDirection: 'column',
  }

  const header: React.CSSProperties = {
    marginBottom: '16px',
    flexShrink: 0,
  }

  const title: React.CSSProperties = {
    fontSize: '16px',
    fontWeight: 600,
    color: 'var(--text-primary)',
    marginBottom: '4px',
  }

  const subtitle: React.CSSProperties = {
    fontSize: '13px',
    color: 'var(--text-muted)',
  }

  const content: React.CSSProperties = {
    flex: 1,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  }

  if(loading) {
    return (
      <div style={card}>
        <div style={{...content, alignItems: 'center', justifyContent: 'center'}}>
          <span style={{color: 'var(--text-muted)', fontSize: '14px'}}>Загрузка...</span>
        </div>
      </div>
    )
  }

  if(!data) {
    return (
      <div style={card}>
        <div style={{...content, alignItems: 'center', justifyContent: 'center'}}>
          <span style={{color: 'var(--text-muted)', fontSize: '14px'}}>Нет данных</span>
        </div>
      </div>
    )
  }

  const metrics = [
    {
      label: 'Общая выручка',
      value: data.revenue?.total || 0,
      displayValue: `${((data.revenue?.total || 0) / 1000).toFixed(0)}k ₽`,
      change: data.revenue?.growth || 0,
      color: '#6366f1'
    },
    {
      label: 'Средний чек',
      value: data.revenue?.avgOrderValue || 0,
      displayValue: `${((data.revenue?.avgOrderValue || 0) / 1000).toFixed(1)}k ₽`,
      change: 0,
      color: '#8b5cf6'
    },
    {
      label: 'Конверсия',
      value: data.conversion?.rate || 0,
      displayValue: `${(data.conversion?.rate || 0).toFixed(1)}%`,
      change: data.conversion?.change || 0,
      color: '#a855f7'
    },
    {
      label: 'Новых клиентов',
      value: data.customers?.new || 0,
      displayValue: String(data.customers?.new || 0),
      change: 0,
      color: '#4ade80'
    },
    {
      label: 'LTV клиента',
      value: data.customers?.ltv || 0,
      displayValue: `${((data.customers?.ltv || 0) / 1000).toFixed(0)}k ₽`,
      change: 0,
      color: '#60a5fa'
    }
  ]

  const maxValue = Math.max(...metrics.map(m => m.value))

  const row: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '140px 1fr 60px',
    alignItems: 'center',
    gap: '16px',
  }

  const label: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: 500,
    color: 'var(--text-primary)',
  }

  const barContainer: React.CSSProperties = {
    height: '32px',
    background: 'var(--bg-tertiary)',
    borderRadius: '8px',
    overflow: 'hidden',
    position: 'relative',
  }

  const barFill = (value: number, color: string): React.CSSProperties => ({
    height: '100%',
    width: `${(value / maxValue) * 100}%`,
    background: color,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: '12px',
    transition: 'width 0.3s ease',
  })

  const barText: React.CSSProperties = {
    fontSize: '13px',
    fontWeight: 600,
    color: 'var(--bg-primary)',
  }

  const changeText = (change: number): React.CSSProperties => ({
    fontSize: '13px',
    fontWeight: 600,
    color: change > 0 ? '#f87171' : change < 0 ? '#4ade80' : 'var(--text-muted)',
    textAlign: 'right',
  })

  return (
    <div style={card}>
      <div style={header}>
        <div style={title}>Расширенная аналитика</div>
        <div style={subtitle}>Ключевые показатели эффективности</div>
      </div>

      <div style={content}>
        {metrics.map((m, idx) => (
          <div key={idx} style={row}>
            <div style={label}>{m.label}</div>
            <div style={barContainer}>
              <div style={barFill(m.value, m.color)}>
                <span style={barText}>{m.displayValue}</span>
              </div>
            </div>
            <div style={changeText(m.change)}>
              {m.change !== 0 ? `${m.change > 0 ? '' : '+'}${Math.abs(m.change)}%` : '0%'}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdvancedMetrics
