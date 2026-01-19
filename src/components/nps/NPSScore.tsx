interface Props {
  data: {
    curr: number
    prev: number
    change: number
    total: number
    promoters: number
    passives: number
    detractors: number
  }
}

const NPSScore = ({ data }: Props) => {
  const { curr, change, total, promoters, passives, detractors } = data

  const cardStyle: React.CSSProperties = {
    background: 'var(--bg-card)',
    border: '1px solid var(--border-color)',
    borderRadius: '16px',
    padding: '32px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  }

  const mainStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '24px',
  }

  const leftStyle: React.CSSProperties = {
    flex: 1,
  }

  const labelStyle: React.CSSProperties = {
    fontSize: '14px',
    color: 'var(--text-muted)',
    marginBottom: '12px',
    fontWeight: 500,
  }

  const scoreStyle: React.CSSProperties = {
    fontSize: 'clamp(48px, 8vw, 72px)',
    fontWeight: 800,
    color: 'var(--accent-primary)',
    lineHeight: 1,
    marginBottom: '12px',
  }

  const changeStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 12px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 600,
    background: change > 0 ? 'rgba(196, 255, 97, 0.15)' : 'rgba(248, 113, 113, 0.15)',
    color: change > 0 ? 'var(--accent-primary)' : 'var(--error)',
  }

  const rightStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    minWidth: '180px',
  }

  const statStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px',
    background: 'var(--bg-secondary)',
    borderRadius: '10px',
  }

  const statLblStyle: React.CSSProperties = {
    fontSize: '13px',
    color: 'var(--text-secondary)',
  }

  const statValStyle: React.CSSProperties = {
    fontSize: '16px',
    fontWeight: 700,
    color: 'var(--text-primary)',
  }

  const dividerStyle: React.CSSProperties = {
    height: '1px',
    background: 'var(--border-color)',
  }

  const bottomStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }

  const infoStyle: React.CSSProperties = {
    fontSize: '13px',
    color: 'var(--text-muted)',
  }

  const totalStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: 600,
    color: 'var(--text-primary)',
  }

  return (
    <div style={cardStyle}>
      <div style={mainStyle}>
        <div style={leftStyle}>
          <div style={labelStyle}>Текущий NPS Score</div>
          <div style={scoreStyle}>{curr}</div>
          <div style={changeStyle}>
            {change > 0 ? '↑' : '↓'} {Math.abs(change)} за месяц
          </div>
        </div>

        <div style={rightStyle}>
          <div style={statStyle}>
            <span style={statLblStyle}>Промоутеры</span>
            <span style={statValStyle}>{promoters}</span>
          </div>
          <div style={statStyle}>
            <span style={statLblStyle}>Нейтралы</span>
            <span style={statValStyle}>{passives}</span>
          </div>
          <div style={statStyle}>
            <span style={statLblStyle}>Критики</span>
            <span style={statValStyle}>{detractors}</span>
          </div>
        </div>
      </div>

      <div style={dividerStyle} />

      <div style={bottomStyle}>
        <span style={infoStyle}>Всего ответов</span>
        <span style={totalStyle}>{total.toLocaleString()}</span>
      </div>
    </div>
  )
}

export default NPSScore
