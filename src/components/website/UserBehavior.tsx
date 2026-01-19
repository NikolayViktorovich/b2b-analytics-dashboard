interface P {
  data: {
    avgPageDepth: number
    avgSessionDuration: string
    pagesPerSession: number
    newVsReturning: { new: number; returning: number }
  }
}

const UserBehavior = ({ data }: P) => {
  const { avgPageDepth, avgSessionDuration, pagesPerSession, newVsReturning } = data

  const cardStyle: React.CSSProperties = {
    background: 'var(--bg-card)',
    border: '1px solid var(--border-color)',
    borderRadius: '16px',
    padding: '16px',
    height: '400px',
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

  const contentWrap: React.CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
  }

  const metricsStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginBottom: '16px',
    flexShrink: 0,
  }

  const metricStyle: React.CSSProperties = {
    padding: '16px',
    background: 'var(--bg-secondary)',
    borderRadius: '12px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }

  const metricLblStyle: React.CSSProperties = {
    fontSize: '13px',
    color: 'var(--text-muted)',
  }

  const metricValStyle: React.CSSProperties = {
    fontSize: '20px',
    fontWeight: 700,
    color: 'var(--text-primary)',
  }

  const dividerStyle: React.CSSProperties = {
    height: '1px',
    background: 'var(--border-color)',
    marginBottom: '16px',
    flexShrink: 0,
  }

  const usersStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    flexShrink: 0,
  }

  const userTypeStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  }

  const topStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }

  const lblStyle: React.CSSProperties = {
    fontSize: '14px',
    color: 'var(--text-secondary)',
  }

  const pctStyle: React.CSSProperties = {
    fontSize: '16px',
    fontWeight: 700,
    color: 'var(--text-primary)',
  }

  const barWrap: React.CSSProperties = {
    width: '100%',
    height: '8px',
    background: 'var(--bg-secondary)',
    borderRadius: '4px',
    overflow: 'hidden',
  }

  const barStyle = (percent: number, color: string): React.CSSProperties => ({
    width: `${percent}%`,
    height: '100%',
    background: color,
    borderRadius: '4px',
    transition: 'width 0.3s ease',
  })

  return (
    <div style={cardStyle}>
      <div style={headerStyle}>
        <div style={titleStyle}>Поведение пользователей</div>
        <div style={subtitleStyle}>Метрики активности</div>
      </div>

      <div style={contentWrap}>
        <div style={metricsStyle}>
          <div style={metricStyle}>
            <span style={metricLblStyle}>Глубина просмотра</span>
            <span style={metricValStyle}>{avgPageDepth}</span>
          </div>
          <div style={metricStyle}>
            <span style={metricLblStyle}>Длительность сессии</span>
            <span style={metricValStyle}>{avgSessionDuration}</span>
          </div>
          <div style={metricStyle}>
            <span style={metricLblStyle}>Страниц за сессию</span>
            <span style={metricValStyle}>{pagesPerSession}</span>
          </div>
        </div>

        <div style={dividerStyle} />

        <div style={usersStyle}>
          <div style={userTypeStyle}>
            <div style={topStyle}>
              <span style={lblStyle}>Новые пользователи</span>
              <span style={pctStyle}>{newVsReturning.new}%</span>
            </div>
            <div style={barWrap}>
              <div style={barStyle(newVsReturning.new, '#60a5fa')} />
            </div>
          </div>

          <div style={userTypeStyle}>
            <div style={topStyle}>
              <span style={lblStyle}>Возвращающиеся</span>
              <span style={pctStyle}>{newVsReturning.returning}%</span>
            </div>
            <div style={barWrap}>
              <div style={barStyle(newVsReturning.returning, '#4ade80')} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserBehavior
