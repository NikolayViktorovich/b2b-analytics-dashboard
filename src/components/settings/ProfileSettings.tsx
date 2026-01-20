import { useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import { api } from '@/services/api'

const ProfileSettings = () => {
  const { user, setUser } = useAuthStore()
  const [name, setName] = useState(user?.name || '')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  const handleSave = async () => {
    if (!name.trim()) {
      setMessage('Имя не может быть пустым')
      return
    }

    if (!user?.id) {
      setMessage('Ошибка: ID пользователя не найден')
      return
    }

    try {
      setSaving(true)
      setMessage('')
      await api.patch(`/users/${user.id}`, { name })
      setUser({ ...user, name })
      setMessage('Изменения сохранены')
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      setMessage('Ошибка сохранения')
    } finally {
      setSaving(false)
    }
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

  const avatarWrap: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  }

  const avatarStyle: React.CSSProperties = {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    background: 'var(--accent-primary)',
    color: 'var(--bg-primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    fontWeight: 700,
  }

  const avatarInfoStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  }

  const nameStyle: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: 600,
    color: 'var(--text-primary)',
  }

  const emailStyle: React.CSSProperties = {
    fontSize: '14px',
    color: 'var(--text-muted)',
  }

  const fieldStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  }

  const lblStyle: React.CSSProperties = {
    fontSize: '13px',
    fontWeight: 500,
    color: 'var(--text-secondary)',
  }

  const inputStyle: React.CSSProperties = {
    background: 'var(--bg-secondary)',
    border: '1px solid var(--border-color)',
    borderRadius: '10px',
    padding: '12px 16px',
    color: 'var(--text-primary)',
    fontSize: '14px',
  }

  const inputDisabledStyle: React.CSSProperties = {
    ...inputStyle,
    opacity: 0.6,
    cursor: 'not-allowed',
  }

  const btnStyle: React.CSSProperties = {
    background: saving ? 'var(--bg-tertiary)' : 'var(--accent-primary)',
    color: 'var(--bg-primary)',
    padding: '12px 24px',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: saving ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s',
    marginTop: '8px',
    border: 'none',
  }

  const messageStyle: React.CSSProperties = {
    fontSize: '13px',
    color: message.includes('Ошибка') ? '#f87171' : '#4ade80',
    marginTop: '-8px',
  }

  return (
    <div style={cardStyle}>
      <div>
        <div style={titleStyle}>Профиль</div>
        <div style={subtitleStyle}>Управление личными данными</div>
      </div>

      <div style={avatarWrap}>
        <div style={avatarStyle}>{user?.name.charAt(0).toUpperCase()}</div>
        <div style={avatarInfoStyle}>
          <div style={nameStyle}>{user?.name}</div>
          <div style={emailStyle}>{user?.email}</div>
        </div>
      </div>

      <div style={fieldStyle}>
        <label style={lblStyle}>Имя</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)}
          style={inputStyle} 
        />
      </div>

      <div style={fieldStyle}>
        <label style={lblStyle}>Email</label>
        <input 
          type="email" 
          value={user?.email || ''} 
          style={inputDisabledStyle} 
          disabled 
        />
      </div>

      <div style={fieldStyle}>
        <label style={lblStyle}>Роль</label>
        <input 
          type="text" 
          value={user?.role || ''} 
          style={inputDisabledStyle} 
          disabled 
        />
      </div>

      {message && <div style={messageStyle}>{message}</div>}

      <button style={btnStyle} onClick={handleSave} disabled={saving}>
        {saving ? 'Сохранение...' : 'Сохранить изменения'}
      </button>
    </div>
  )
}

export default ProfileSettings
