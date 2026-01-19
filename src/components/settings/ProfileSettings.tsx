import { useAuthStore } from '@/store/authStore'

const ProfileSettings = () => {
  const { user } = useAuthStore()

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

  const btnStyle: React.CSSProperties = {
    background: 'var(--accent-primary)',
    color: 'var(--bg-primary)',
    padding: '12px 24px',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
    marginTop: '8px',
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

      <button style={btnStyle}>Сохранить изменения</button>
    </div>
  )
}

export default ProfileSettings
