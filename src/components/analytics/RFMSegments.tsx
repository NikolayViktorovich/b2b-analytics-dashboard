interface P {
  data: { segment: string; count: number; revenue: number; color: string; desc: string }[]
}

const RFMSegments = ({ data }: P) => {
  const total = data.reduce((sum, item) => sum + item.count, 0)

  const card = {
    background: 'var(--bg-card)',
    border: '1px solid var(--border-color)',
    borderRadius: '16px',
    padding: '16px',
    height: '400px',
    display: 'flex',
    flexDirection: 'column' as const,
  }

  const hdr = {
    marginBottom: '16px',
    flexShrink: 0,
  }

  const title = {
    fontSize: '16px',
    fontWeight: 600,
    color: 'var(--text-primary)',
    marginBottom: '4px',
  }

  const sub = {
    fontSize: '13px',
    color: 'var(--text-muted)',
  }

  const list = {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px',
    flex: 1,
    overflowY: 'auto' as const,
    overflowX: 'hidden' as const,
  }

  const item = {
    padding: '16px',
    background: 'var(--bg-secondary)',
    borderRadius: '12px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
  }

  const top = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }

  const left = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  }

  const dot = (color: string) => ({
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    background: color,
  })

  const name = {
    fontSize: '15px',
    fontWeight: 600,
    color: 'var(--text-primary)',
  }

  const desc = {
    fontSize: '12px',
    color: 'var(--text-muted)',
  }

  const stats = {
    display: 'flex',
    gap: '16px',
  }

  const stat = {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '4px',
  }

  const lbl = {
    fontSize: '11px',
    color: 'var(--text-muted)',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  }

  const val = {
    fontSize: '16px',
    fontWeight: 700,
    color: 'var(--text-primary)',
  }

  const pct = {
    fontSize: '14px',
    fontWeight: 600,
    color: 'var(--text-secondary)',
  }

  return (
    <div style={card}>
      <div style={hdr}>
        <div style={title}>RFM сегменты</div>
        <div style={sub}>Сегментация клиентов</div>
      </div>

      <div style={list}>
        {data.map((seg, idx) => {
          const p = ((seg.count / total) * 100).toFixed(0)
          return (
            <div key={idx} style={item}>
              <div style={top}>
                <div style={left}>
                  <div style={dot(seg.color)} />
                  <div>
                    <div style={name}>{seg.segment}</div>
                    <div style={desc}>{seg.desc}</div>
                  </div>
                </div>
                <div style={pct}>{p}%</div>
              </div>
              <div style={stats}>
                <div style={stat}>
                  <span style={lbl}>Клиенты</span>
                  <span style={val}>{seg.count}</span>
                </div>
                <div style={stat}>
                  <span style={lbl}>Доход</span>
                  <span style={val}>${(seg.revenue / 1000).toFixed(0)}K</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default RFMSegments
