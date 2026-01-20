import { useState, useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'
import { api } from '@/services/api'

const NotificationSettings = () => {
  const { user } = useAuthStore()
  const [emailNotif, setEmailNotif] = useState(true)
  const [pushNotif, setPushNotif] = useState(false)
  const [weeklyReport, setWeeklyReport] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const loadSettings = async () => {
      if (!user?.id) return
      
      try {
        const settings = await api.get(`/users/${user.id}/notifications`) as any
        if (settings) {
          setEmailNotif(settings.emailNotifications ?? true)
          setPushNotif(settings.pushNotifications ?? false)
          setWeeklyReport(settings.weeklyReport ?? true)
        }
      } catch(error) {
        // silent
      }
    }
    if (user?.id) loadSettings()
  }, [user?.id])

  const updateSetting = async (key: string, value: boolean) => {
    if (!user?.id) return

    try {
      setSaving(true)
      await api.patch(`/users/${user.id}/notifications`, {[key]: value})
    } catch(error) {
      // silent
    } finally {
      setSaving(false)
    }
  }

  const handleEmailToggle = () => {
    const newValue = !emailNotif
    setEmailNotif(newValue)
    updateSetting('emailNotifications', newValue)
  }

  const handlePushToggle = () => {
    const newValue = !pushNotif
    setPushNotif(newValue)
    updateSetting('pushNotifications', newValue)
  }

  const handleWeeklyToggle = () => {
    const newValue = !weeklyReport
    setWeeklyReport(newValue)
    updateSetting('weeklyReport', newValue)
  }

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
    cursor: saving ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s',
    opacity: saving ? 0.6 : 1,
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
        <div style={toggleStyle(emailNotif)} onClick={handleEmailToggle}>
          <div style={toggleCircleStyle(emailNotif)} />
        </div>
      </div>

      <div style={itemStyle}>
        <div style={leftStyle}>
          <div style={lblStyle}>Push уведомления</div>
          <div style={descStyle}>Браузерные уведомления</div>
        </div>
        <div style={toggleStyle(pushNotif)} onClick={handlePushToggle}>
          <div style={toggleCircleStyle(pushNotif)} />
        </div>
      </div>

      <div style={itemStyle}>
        <div style={leftStyle}>
          <div style={lblStyle}>Еженедельный отчет</div>
          <div style={descStyle}>Сводка по понедельникам</div>
        </div>
        <div style={toggleStyle(weeklyReport)} onClick={handleWeeklyToggle}>
          <div style={toggleCircleStyle(weeklyReport)} />
        </div>
      </div>
    </div>
  )
}

export default NotificationSettings
