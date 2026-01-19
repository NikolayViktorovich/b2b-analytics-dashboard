import { useState } from 'react'
import { useAuthStore } from '@/store/authStore'

const SettingsPage = () => {
  const { user } = useAuthStore()
  const [emailNotif, setEmailNotif] = useState(true)
  const [pushNotif, setPushNotif] = useState(false)
  const [weeklyReport, setWeeklyReport] = useState(true)

  const containerStyle: React.CSSProperties = {
    padding: 'clamp(16px, 3vw, 32px)',
    maxWidth: '900px',
    margin: '0 auto',
    width: '100%',
    boxSizing: 'border-box',
  }

  const headerStyle: React.CSSProperties = {
    marginBottom: 'clamp(20px, 3vw, 32px)',
  }

  const h1Style: React.CSSProperties = {
    fontSize: 'clamp(20px, 3vw, 28px)',
    fontWeight: 700,
    marginBottom: 'clamp(4px, 1vw, 8px)',
  }

  const subtitleStyle: React.CSSProperties = {
    color: 'var(--text-muted)',
    fontSize: 'clamp(12px, 1.5vw, 14px)',
  }

  const sectionStyle: React.CSSProperties = {
    background: 'var(--bg-card)',
    border: '1px solid var(--border-color)',
    borderRadius: '16px',
    padding: '16px',
    marginBottom: '20px',
  }

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: '16px',
    fontWeight: 600,
    color: 'var(--text-primary)',
    marginBottom: '16px',
    paddingBottom: '12px',
    borderBottom: '1px solid var(--border-color)',
  }

  const fieldStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '140px 1fr',
    gap: '16px',
    alignItems: 'center',
    marginBottom: '16px',
  }

  const lblStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: 500,
    color: 'var(--text-secondary)',
  }

  const inputStyle: React.CSSProperties = {
    background: 'var(--bg-secondary)',
    border: '1px solid var(--border-color)',
    borderRadius: '10px',
    padding: '10px 14px',
    color: 'var(--text-primary)',
    fontSize: '14px',
  }

  const toggleWrap: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 0',
    borderBottom: '1px solid var(--border-color)',
  }

  const toggleLeftStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  }

  const toggleLblStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: 500,
    color: 'var(--text-primary)',
  }

  const toggleDescStyle: React.CSSProperties = {
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

  const btnWrap: React.CSSProperties = {
    display: 'flex',
    gap: '12px',
    justifyContent: 'flex-end',
    marginTop: '20px',
  }

  const btnPrimStyle: React.CSSProperties = {
    background: 'var(--accent-primary)',
    color: 'var(--bg-primary)',
    padding: '10px 24px',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
  }

  const btnSecStyle: React.CSSProperties = {
    background: 'var(--bg-secondary)',
    border: '1px solid var(--border-color)',
    color: 'var(--text-secondary)',
    padding: '10px 24px',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s',
  }

  const integrationStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px',
    background: 'var(--bg-secondary)',
    borderRadius: '10px',
    marginBottom: '12px',
  }

  const intLeftStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  }

  const intIconStyle: React.CSSProperties = {
    width: '36px',
    height: '36px',
    borderRadius: '8px',
    background: 'var(--bg-tertiary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
  }

  const intNameStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: 500,
    color: 'var(--text-primary)',
  }

  const statusStyle = (connected: boolean): React.CSSProperties => ({
    fontSize: '12px',
    padding: '4px 10px',
    borderRadius: '6px',
    fontWeight: 500,
    background: connected ? 'rgba(74, 222, 128, 0.15)' : 'rgba(156, 163, 175, 0.15)',
    color: connected ? '#4ade80' : 'var(--text-muted)',
  })

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={h1Style}>Настройки</h1>
        <p style={subtitleStyle}>Управление профилем и интеграциями</p>
      </div>

      <div style={sectionStyle}>
        <div style={sectionTitleStyle}>Профиль</div>
        
        <div style={fieldStyle}>
          <label style={lblStyle}>Имя</label>
          <input type="text" defaultValue={user?.name} style={inputStyle} />
        </div>

        <div style={fieldStyle}>
          <label style={lblStyle}>Email</label>
          <input type="email" defaultValue={user?.email} style={inputStyle} />
        </div>

        <div style={fieldStyle}>
          <label style={lblStyle}>Роль</label>
          <input type="text" defaultValue={user?.role} style={inputStyle} disabled />
        </div>

        <div style={btnWrap}>
          <button style={btnSecStyle}>Отмена</button>
          <button style={btnPrimStyle}>Сохранить</button>
        </div>
      </div>

      <div style={sectionStyle}>
        <div style={sectionTitleStyle}>Уведомления</div>
        
        <div style={toggleWrap}>
          <div style={toggleLeftStyle}>
            <div style={toggleLblStyle}>Email уведомления</div>
            <div style={toggleDescStyle}>Получать письма о важных событиях</div>
          </div>
          <div style={toggleStyle(emailNotif)} onClick={() => setEmailNotif(!emailNotif)}>
            <div style={toggleCircleStyle(emailNotif)} />
          </div>
        </div>

        <div style={toggleWrap}>
          <div style={toggleLeftStyle}>
            <div style={toggleLblStyle}>Push уведомления</div>
            <div style={toggleDescStyle}>Браузерные уведомления</div>
          </div>
          <div style={toggleStyle(pushNotif)} onClick={() => setPushNotif(!pushNotif)}>
            <div style={toggleCircleStyle(pushNotif)} />
          </div>
        </div>

        <div style={{ ...toggleWrap, borderBottom: 'none' }}>
          <div style={toggleLeftStyle}>
            <div style={toggleLblStyle}>Еженедельный отчет</div>
            <div style={toggleDescStyle}>Сводка по понедельникам</div>
          </div>
          <div style={toggleStyle(weeklyReport)} onClick={() => setWeeklyReport(!weeklyReport)}>
            <div style={toggleCircleStyle(weeklyReport)} />
          </div>
        </div>
      </div>

      <div style={sectionStyle}>
        <div style={sectionTitleStyle}>Интеграции</div>
        
        <div style={integrationStyle}>
          <div style={intLeftStyle}>
            <div style={intIconStyle}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            </div>
            <div style={intNameStyle}>Google Analytics</div>
          </div>
          <div style={statusStyle(true)}>Подключено</div>
        </div>

        <div style={integrationStyle}>
          <div style={intLeftStyle}>
            <div style={intIconStyle}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z" fill="#635BFF"/>
              </svg>
            </div>
            <div style={intNameStyle}>Stripe</div>
          </div>
          <div style={statusStyle(true)}>Подключено</div>
        </div>

        <div style={integrationStyle}>
          <div style={intLeftStyle}>
            <div style={intIconStyle}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" fill="#E01E5A"/>
              </svg>
            </div>
            <div style={intNameStyle}>Slack</div>
          </div>
          <div style={statusStyle(false)}>Отключено</div>
        </div>

        <div style={{ ...integrationStyle, marginBottom: 0 }}>
          <div style={intLeftStyle}>
            <div style={intIconStyle}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" fill="#FFE01B"/>
                <path d="M15.5 12c0 1.933-1.567 3.5-3.5 3.5S8.5 13.933 8.5 12 10.067 8.5 12 8.5s3.5 1.567 3.5 3.5z" fill="#241C15"/>
                <ellipse cx="9.5" cy="10.5" rx="1" ry="1.5" fill="#241C15"/>
                <ellipse cx="14.5" cy="10.5" rx="1" ry="1.5" fill="#241C15"/>
              </svg>
            </div>
            <div style={intNameStyle}>Mailchimp</div>
          </div>
          <div style={statusStyle(false)}>Отключено</div>
        </div>
      </div>

      <div style={sectionStyle}>
        <div style={sectionTitleStyle}>Безопасность</div>
        
        <div style={fieldStyle}>
          <label style={lblStyle}>Текущий пароль</label>
          <input type="password" placeholder="••••••••" style={inputStyle} />
        </div>

        <div style={fieldStyle}>
          <label style={lblStyle}>Новый пароль</label>
          <input type="password" placeholder="••••••••" style={inputStyle} />
        </div>

        <div style={fieldStyle}>
          <label style={lblStyle}>Подтвердите</label>
          <input type="password" placeholder="••••••••" style={inputStyle} />
        </div>

        <div style={btnWrap}>
          <button style={btnSecStyle}>Отмена</button>
          <button style={btnPrimStyle}>Изменить пароль</button>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
