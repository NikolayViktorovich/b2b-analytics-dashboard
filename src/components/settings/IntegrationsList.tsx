const integrations = [
  { name: 'Google Analytics', status: 'connected', color: '#4285f4' },
  { name: 'Stripe', status: 'connected', color: '#635bff' },
  { name: 'Slack', status: 'disconnected', color: '#4a154b' },
  { name: 'Mailchimp', status: 'disconnected', color: '#ffe01b' },
]

const IntegrationsList = () => {
  const cardStyle: React.CSSProperties = {
    background: 'var(--bg-card)',
    border: '1px solid var(--border-color)',
    borderRadius: '16px',
    padding: '16px',
    height: '400px',
    maxHeight: '400px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
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

  const listStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  }

  const itemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px',
    background: 'var(--bg-secondary)',
    borderRadius: '12px',
  }

  const leftStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  }

  const iconStyle = (color: string): React.CSSProperties => ({
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    background: color + '20',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
  })

  const nameStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: 500,
    color: 'var(--text-primary)',
  }

  const statusStyle = (status: string): React.CSSProperties => ({
    fontSize: '12px',
    padding: '4px 10px',
    borderRadius: '6px',
    fontWeight: 500,
    background: status === 'connected' ? 'rgba(74, 222, 128, 0.15)' : 'rgba(156, 163, 175, 0.15)',
    color: status === 'connected' ? '#4ade80' : 'var(--text-muted)',
  })

  return (
    <div style={cardStyle}>
      <div>
        <div style={titleStyle}>Интеграции</div>
        <div style={subtitleStyle}>Подключенные сервисы</div>
      </div>

      <div style={listStyle}>
        {integrations.map((int, idx) => (
          <div key={idx} style={itemStyle}>
            <div style={leftStyle}>
              <div style={iconStyle(int.color)}>🔗</div>
              <div style={nameStyle}>{int.name}</div>
            </div>
            <div style={statusStyle(int.status)}>
              {int.status === 'connected' ? 'Подключено' : 'Отключено'}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default IntegrationsList
