import { useState } from 'react'
import { useAuthStore } from '@/store/authStore'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState('')
  const { login } = useAuthStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErr('')
    setLoading(true)

    try {
      await login(email, pwd)
    } catch (error) {
      setErr('Ошибка авторизации')
    } finally {
      setLoading(false)
    }
  }

  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    background: 'linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)',
  }

  const cardStyle: React.CSSProperties = {
    background: 'var(--bg-secondary)',
    border: '1px solid var(--border-color)',
    borderRadius: 'clamp(12px, 2vw, 16px)',
    padding: 'clamp(24px, 5vw, 48px)',
    width: '100%',
    maxWidth: '420px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
  }

  const logoStyle: React.CSSProperties = {
    color: 'var(--accent-primary)',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '24px',
  }

  const titleStyle: React.CSSProperties = {
    fontSize: 'clamp(22px, 3vw, 28px)',
    fontWeight: 600,
    textAlign: 'center',
    marginBottom: 'clamp(6px, 1vw, 8px)',
  }

  const subtitleStyle: React.CSSProperties = {
    color: 'var(--text-secondary)',
    textAlign: 'center',
    marginBottom: 'clamp(20px, 3vw, 32px)',
    fontSize: 'clamp(14px, 1.5vw, 16px)',
  }

  const formStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'clamp(16px, 2vw, 20px)',
  }

  const fieldStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'clamp(6px, 1vw, 8px)',
  }

  const labelStyle: React.CSSProperties = {
    fontSize: 'clamp(13px, 1.2vw, 14px)',
    fontWeight: 500,
    color: 'var(--text-secondary)',
  }

  const inputStyle: React.CSSProperties = {
    background: 'var(--bg-tertiary)',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    padding: 'clamp(10px, 1.5vw, 12px) clamp(14px, 2vw, 16px)',
    color: 'var(--text-primary)',
    fontSize: 'clamp(14px, 1.5vw, 15px)',
  }

  const btnStyle: React.CSSProperties = {
    background: 'var(--accent-primary)',
    color: 'var(--bg-primary)',
    padding: 'clamp(12px, 2vw, 14px)',
    borderRadius: '8px',
    fontSize: 'clamp(14px, 1.5vw, 15px)',
    fontWeight: 600,
    marginTop: 'clamp(6px, 1vw, 8px)',
    opacity: loading ? 0.6 : 1,
    cursor: loading ? 'not-allowed' : 'pointer',
  }

  const errorStyle: React.CSSProperties = {
    background: 'rgba(255, 87, 87, 0.1)',
    border: '1px solid var(--error)',
    color: 'var(--error)',
    padding: '12px',
    borderRadius: '8px',
    fontSize: '14px',
    textAlign: 'center',
  }

  const hintStyle: React.CSSProperties = {
    marginTop: '24px',
    paddingTop: '24px',
    borderTop: '1px solid var(--border-color)',
    textAlign: 'center',
    fontSize: '13px',
    color: 'var(--text-secondary)',
  }

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={logoStyle}>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <rect x="8" y="8" width="32" height="32" rx="6" stroke="currentColor" strokeWidth="2.5" />
            <path d="M16 20h16M16 24h16M16 28h10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>
        
        <h1 style={titleStyle}>Reddix</h1>
        <p style={subtitleStyle}>Войдите в систему</p>

        <form onSubmit={handleSubmit} style={formStyle}>
          <div style={fieldStyle}>
            <label htmlFor="email" style={labelStyle}>Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              style={inputStyle}
              required
            />
          </div>

          <div style={fieldStyle}>
            <label htmlFor="pwd" style={labelStyle}>Пароль</label>
            <input
              id="pwd"
              type="password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              placeholder="••••••••"
              style={inputStyle}
              required
            />
          </div>

          {err && <div style={errorStyle}>{err}</div>}

          <button type="submit" style={btnStyle} disabled={loading}>
            {loading ? 'Вход...' : 'Войти'}
          </button>
        </form>

        <div style={hintStyle}>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
