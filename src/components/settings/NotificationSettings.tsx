import { useState } from 'react'

const NotificationSettings = () => {
  const [emailNotif, setEmailNotif] = useState(true)
  const [pushNotif, setPushNotif] = useState(false)
  const [weeklyReport, setWeeklyReport] = useState(true)

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
    flexDirection: 'column',
    gap: '4px',
  }

  const lblStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: 500,
    color: 'var(--text-primary)',
  }

  const descStyle: React.CSSProperties = {
    fontSize: '12px',
    color: 'var(--text-muted)',
  }

  const toggleStyle = (active: boolean): React.CSSProperties => ({
    width: '48px',
    height: '28px',
    borderRadius: '14px',
    background: active ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
    position: 'relative',
    cursor: 'pointer',
    transition: 'all 0.2s',
  })

  const toggleCircleStyle = (active: boolean): React.CSSProperties => ({
    width: '22px',
    height: '22px',
    borderRadius: '50%',
    background: 'var(--bg-primary)',
    position: 'absolute',
    top: '3px',
    left: active ? '23px' : '3px',
    transition: 'all 0.2s',
  })

  return (
    <div style={cardStyle}>
      <div>
        <div style={titleStyle}>Уведомления</div>
        <div style={subtitleStyle}>Настройка оповещений</div>
      </div>

      <div style={itemStyle}>
        <div style={leftStyle}>
          <div style={lblStyle}>Email уведомления</div>
          <div style={descStyle}>Получать письма о важных событиях</div>
        </div>
        <div style={toggleStyle(emailNotif)} onClick={() => setEmailNotif(!emailNotif)}>
          <div style={toggleCircleStyle(emailNotif)} />
        </div>
      </div>

      <div style={itemStyle}>
        <div style={leftStyle}>
          <div style={lblStyle}>Push уведомления</div>
          <div style={descStyle}>Браузерные уведомления</div>
        </div>
        <div style={toggleStyle(pushNotif)} onClick={() => setPushNotif(!pushNotif)}>
          <div style={toggleCircleStyle(pushNotif)} />
        </div>
      </div>

      <div style={itemStyle}>
        <div style={leftStyle}>
          <div style={lblStyle}>Еженедельный отчет</div>
          <div style={descStyle}>Сводка по понедельникам</div>
        </div>
        <div style={toggleStyle(weeklyReport)} onClick={() => setWeeklyReport(!weeklyReport)}>
          <div style={toggleCircleStyle(weeklyReport)} />
        </div>
      </div>
    </div>
  )
}

export default NotificationSettings
