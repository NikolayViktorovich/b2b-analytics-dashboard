import { useAuthStore } from '@/store/authStore'

const Header = () => {
  const { user, logout } = useAuthStore()

  const getDate = () => {
    const d = new Date()
    return `${d.getDate()}, ${d.toLocaleString('ru', { month: 'long' })}`
  }

  const header: React.CSSProperties = {
    height: 'clamp(60px, 10vw, 80px)',
    background: 'var(--bg-primary)',
    borderBottom: '1px solid var(--border-color)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 clamp(12px, 3vw, 32px)',
  }

  const left: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 'clamp(12px, 2vw, 24px)',
  }

  const date: React.CSSProperties = {
    fontSize: 'clamp(16px, 3vw, 24px)',
    fontWeight: 600,
    color: 'var(--text-primary)',
  }

  const right: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 'clamp(8px, 1.5vw, 16px)',
  }

  const userBox: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 'clamp(8px, 1.5vw, 12px)',
    padding: 'clamp(6px, 1vw, 8px) clamp(8px, 1.5vw, 12px)',
    background: 'var(--bg-card)',
    borderRadius: 'clamp(10px, 1.5vw, 12px)',
    border: '1px solid var(--border-color)',
  }

  const avatar: React.CSSProperties = {
    width: 'clamp(32px, 5vw, 36px)',
    height: 'clamp(32px, 5vw, 36px)',
    borderRadius: '50%',
    background: 'var(--accent-primary)',
    color: 'var(--bg-primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    fontSize: 'clamp(12px, 2vw, 14px)',
  }

  const info: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'clamp(1px, 0.3vw, 2px)',
  }

  const name: React.CSSProperties = {
    fontSize: 'clamp(12px, 2vw, 14px)',
    fontWeight: 500,
    color: 'var(--text-primary)',
  }

  const btn: React.CSSProperties = {
    fontSize: 'clamp(10px, 1.5vw, 12px)',
    color: 'var(--text-muted)',
    background: 'transparent',
    padding: 0,
    textAlign: 'left',
    transition: 'color 0.2s',
    border: 'none',
    cursor: 'pointer',
  }

  return (
    <header style={header}>
      <div style={left}>
        <span style={date}>{getDate()}</span>
      </div>

      <div style={right}>
        <div style={userBox}>
          <div style={avatar}>
            {user?.name.charAt(0).toUpperCase()}
          </div>
          <div style={info}>
            <span style={name}>{user?.name}</span>
            <button onClick={logout} style={btn}>
              Выйти
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
