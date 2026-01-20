import React from 'react'

const integrations = [
  { 
    name: 'Яндекс.Метрика',
    status: 'connected',
    color: '#fc3f1d',
    description: 'Веб-аналитика',
    configurable: true,
    icon: <img src="/ymetrika.svg" style={{width: '20px', height: '20px'}} alt="Яндекс.Метрика" />
  },
  { 
    name: 'ЮKassa', 
    status: 'connected', 
    color: '#8b3ffd',
    description: 'Прием платежей',
    configurable: true,
    icon: <img src="/yookassa-sign-logo.svg" style={{width: '20px', height: '20px'}} alt="ЮKassa" />
  },
  { 
    name: 'Telegram Bot API', 
    status: 'connected', 
    color: '#0088cc',
    description: 'Уведомления в Telegram',
    configurable: true,
    icon: <img src="/telega.png" style={{width: '20px', height: '20px'}} alt="Telegram" />
  },
  { 
    name: 'VK API', 
    status: 'disconnected', 
    color: '#0077ff',
    description: 'Интеграция с ВКонтакте',
    configurable: true,
    icon: <img src="/vk.png" style={{width: '20px', height: '20px'}} alt="VK" />
  },
  { 
    name: 'Битрикс24', 
    status: 'disconnected', 
    color: '#2fc7f7',
    description: 'CRM и управление',
    configurable: true,
    icon: <img src="/bitrix24.png" style={{width: '20px', height: '20px'}} alt="Битрикс24" />
  },
]

const IntegrationsList = () => {
  const [selectedIntegration, setSelectedIntegration] = React.useState<string | null>(null)
  const [formData, setFormData] = React.useState<Record<string, string>>({})
  const [loading, setLoading] = React.useState(false)
  const [notification, setNotification] = React.useState<{message: string, type: 'success' | 'error'} | null>(null)
  const cardStyle: React.CSSProperties = {
    background: 'var(--bg-card)',
    border: '1px solid var(--border-color)',
    borderRadius: '16px',
    padding: '16px',
    overflow: 'visible',
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

  const buttonStyle: React.CSSProperties = {
    padding: '6px 12px',
    borderRadius: '6px',
    border: '1px solid var(--border-color)',
    background: 'var(--bg-secondary)',
    color: 'var(--text-primary)',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s',
  }

  const getIntegrationConfig = (name: string) => {
    const configs: Record<string, any> = {
      'Яндекс.Метрика': {
        fields: [
          { label: 'ID счетчика', key: 'counterId', placeholder: '12345678' },
          { label: 'OAuth токен', key: 'token', placeholder: 'y0_AgA...', type: 'password' }
        ]
      },
      'ЮKassa': {
        fields: [
          { label: 'Shop ID', key: 'shopId', placeholder: '123456' },
          { label: 'Secret Key', key: 'secretKey', placeholder: 'live_...', type: 'password' }
        ]
      },
      'Telegram Bot API': {
        fields: [
          { label: 'Bot Token', key: 'botToken', placeholder: '123456:ABC-DEF...', type: 'password' },
          { label: 'Chat ID', key: 'chatId', placeholder: '-1001234567890' }
        ]
      },
      'VK API': {
        fields: [
          { label: 'Access Token', key: 'accessToken', placeholder: 'vk1.a...', type: 'password' },
          { label: 'Group ID', key: 'groupId', placeholder: '123456789' }
        ]
      },
      'Битрикс24': {
        fields: [
          {label: 'Webhook URL', key: 'webhook', placeholder: 'https://portal.bitrix24.ru/rest/...'}
        ]
      }
    }
    return configs[name]
  }

  const handleConfigure = (name: string) => {
    setSelectedIntegration(name)
    setFormData({})
  }

  const handleSave = async () => {
    if(!selectedIntegration) return
    
    setLoading(true)
    try{
      const response = await fetch(`/api/integrations/${encodeURIComponent(selectedIntegration)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({config: formData})
      })
      
      if(response.ok) {
        setNotification({message: 'Интеграция настроена успешно!', type: 'success'})
        setTimeout(() => {
          setSelectedIntegration(null)
          setFormData({})
          setNotification(null)
        }, 2000)
      }else{
        setNotification({message: 'Ошибка сохранения настроек', type: 'error'})
        setTimeout(() => setNotification(null), 3000)
      }
    }catch(error){
      setNotification({message: 'Ошибка подключения к серверу', type: 'error'})
      setTimeout(() => setNotification(null), 3000)
    }finally{
      setLoading(false)
    }
  }

  const handleInputChange = (key: string, value: string) => {
    setFormData(prev => ({...prev, [key]: value}))
  }

  return (
    <>
      {notification && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 10000,
          background: notification.type === 'success' ? 'rgba(74, 222, 128, 0.95)' : 'rgba(248, 113, 113, 0.95)',
          color: 'white',
          padding: '16px 24px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontSize: '14px',
          fontWeight: 500,
          animation: 'slideIn 0.3s ease-out',
        }}>
          {notification.type === 'success' ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
          {notification.message}
        </div>
      )}
      <div style={cardStyle}>
        <div>
          <div style={titleStyle}>Интеграции</div>
          <div style={subtitleStyle}>Внешние сервисы</div>
        </div>

      <div style={listStyle}>
        {integrations.map((int, idx) => (
          <div key={idx} style={itemStyle}>
            <div style={leftStyle}>
              <div style={iconStyle(int.color)}>{int.icon}</div>
              <div>
                <div style={nameStyle}>{int.name}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                  {int.description}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: int.status === 'connected' ? 'rgba(74, 222, 128, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                color: int.status === 'connected' ? '#4ade80' : '#ef4444',
                fontSize: '14px',
                fontWeight: 'bold'
              }}>
                {int.status === 'connected' ? '✓' : '✕'}
              </div>
              {int.configurable && (
                <button 
                  style={buttonStyle}
                  onClick={() => handleConfigure(int.name)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--bg-card)'
                    e.currentTarget.style.borderColor = 'var(--primary)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'var(--bg-secondary)'
                    e.currentTarget.style.borderColor = 'var(--border-color)'
                  }}
                >
                  Настроить
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedIntegration && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }} onClick={() => setSelectedIntegration(null)}>
          <div style={{
            background: 'var(--bg-card)',
            borderRadius: '16px',
            padding: '24px',
            width: '90%',
            maxWidth: '500px',
            border: '1px solid var(--border-color)',
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{
              fontSize: '18px',
              fontWeight: 600,
              color: 'var(--text-primary)',
              marginBottom: '8px',
            }}>
              Настройка: {selectedIntegration}
            </div>
            <div style={{
              fontSize: '13px',
              color: 'var(--text-muted)',
              marginBottom: '20px',
            }}>
              Введите данные для подключения
            </div>

            <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
              {getIntegrationConfig(selectedIntegration)?.fields.map((field: any, idx: number) => (
                <div key={idx}>
                  <label style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: 500,
                    color: 'var(--text-primary)',
                    marginBottom: '6px',
                  }}>
                    {field.label}
                  </label>
                  <input
                    type={field.type || 'text'}
                    placeholder={field.placeholder}
                    value={formData[field.key] || ''}
                    onChange={(e) => handleInputChange(field.key, e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg-secondary)',
                      color: 'var(--text-primary)',
                      fontSize: '14px',
                      outline: 'none',
                    }}
                  />
                </div>
              ))}
            </div>

            <div style={{
              display: 'flex',
              gap: '12px',
              marginTop: '24px',
            }}>
              <button
                onClick={handleSave}
                disabled={loading}
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: '8px',
                  border: 'none',
                  background: loading ? 'var(--text-muted)' : 'var(--primary)',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: 500,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.6 : 1,
                }}
              >
                {loading ? 'Сохранение...' : 'Сохранить'}
              </button>
              <button
                onClick={() => setSelectedIntegration(null)}
                disabled={loading}
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  fontSize: '14px',
                  fontWeight: 500,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.6 : 1,
                }}
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </>
  )
}

export default IntegrationsList
