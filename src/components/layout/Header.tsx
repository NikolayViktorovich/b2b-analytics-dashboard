import { useAuthStore } from '@/store/authStore'

const Header = () => {
  const { user, logout } = useAuthStore()

  const headerStyle: React.CSSProperties = {
    height: 'clamp(60px, 8vw, 72px)',
    background: 'var(--bg-secondary)',
    borderBottom: '1px solid var(--border-color)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 clamp(16px, 2vw, 24px)',
    flexWrap: 'wrap',
    gap: 'clamp(12px, 2vw, 20px)',
  }

  const leftStyle: React.CSSProperties = {
    fontSize: 'clamp(16px, 2vw, 20px)',
    fontWeight: 600,
  }

  const rightStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 'clamp(12px, 2vw, 20px)',
    flexWrap: 'wrap',
  }

  const supportStyle: React.CSSProperties = {
    fontSize: 'clamp(11px, 1.2vw, 13px)',
    color: 'var(--text-secondary)',
  }

  const iconBtnStyle: React.CSSProperties = {
    width: 'clamp(36px, 4vw, 40px)',
    height: 'clamp(36px, 4vw, 40px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent',
    color: 'var(--text-secondary)',
    borderRadius: '8px',
    transition: 'all 0.2s',
  }

  const userStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 'clamp(8px, 1vw, 12px)',
    padding: 'clamp(6px, 1vw, 8px) clamp(10px, 1.5vw, 12px)',
    background: 'var(--bg-tertiary)',
    borderRadius: '12px',
  }

  const avatarStyle: React.CSSProperties = {
    width: 'clamp(32px, 4vw, 36px)',
    height: 'clamp(32px, 4vw, 36px)',
    borderRadius: '50%',
    background: 'var(--accent-primary)',
    color: 'var(--bg-primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 600,
    fontSize: 'clamp(12px, 1.5vw, 14px)',
  }

  const userInfoStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  }

  const nameStyle: React.CSSProperties = {
    fontSize: 'clamp(13px, 1.2vw, 14px)',
    fontWeight: 500,
  }

  const logoutStyle: React.CSSProperties = {
    fontSize: 'clamp(11px, 1vw, 12px)',
    color: 'var(--text-secondary)',
    background: 'transparent',
    padding: 0,
    textAlign: 'left',
  }

  return (
    <header style={headerStyle}>
      <div style={leftStyle}>
        <h2>Клуб</h2>
      </div>

      <div style={rightStyle}>
        <span style={supportStyle}>
          Техническая поддержка:
        </span>

        <button style={iconBtnStyle}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M15 6.66667C15 5.34058 14.4732 4.06881 13.5355 3.13113C12.5979 2.19345 11.3261 1.66667 10 1.66667C8.67392 1.66667 7.40215 2.19345 6.46447 3.13113C5.52678 4.06881 5 5.34058 5 6.66667C5 12.5 2.5 14.1667 2.5 14.1667H17.5C17.5 14.1667 15 12.5 15 6.66667Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M11.4417 17.5C11.2952 17.7526 11.0849 17.9622 10.8319 18.1079C10.5789 18.2537 10.292 18.3304 10 18.3304C9.70802 18.3304 9.42116 18.2537 9.16816 18.1079C8.91515 17.9622 8.70486 17.7526 8.55835 17.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <button style={iconBtnStyle}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M10 1.66667V3.33334M10 16.6667V18.3333M3.33333 10H1.66667M5.25 5.25L4.10833 4.10833M14.75 5.25L15.8917 4.10833M5.25 14.75L4.10833 15.8917M14.75 14.75L15.8917 15.8917M18.3333 10H16.6667M13.3333 10C13.3333 11.8409 11.8409 13.3333 10 13.3333C8.15905 13.3333 6.66667 11.8409 6.66667 10C6.66667 8.15905 8.15905 6.66667 10 6.66667C11.8409 6.66667 13.3333 8.15905 13.3333 10Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div style={userStyle}>
          <div style={avatarStyle}>
            {user?.name.charAt(0).toUpperCase()}
          </div>
          <div style={userInfoStyle}>
            <span style={nameStyle}>{user?.name}</span>
            <button onClick={logout} style={logoutStyle}>
              Выйти
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
