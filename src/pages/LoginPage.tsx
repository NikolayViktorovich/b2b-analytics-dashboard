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
    background: 'var(--bg-card)',
    border: '1px solid var(--border-color)',
    borderRadius: '20px',
    padding: '48px',
    width: '100%',
    maxWidth: '420px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
  }



  const titleStyle: React.CSSProperties = {
    fontSize: '32px',
    fontWeight: 700,
    textAlign: 'center',
    marginBottom: '8px',
    background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-dark) 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  }

  const subtitleStyle: React.CSSProperties = {
    color: 'var(--text-muted)',
    textAlign: 'center',
    marginBottom: '32px',
    fontSize: '15px',
  }

  const formStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  }

  const fieldStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  }

  const labelStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: 500,
    color: 'var(--text-secondary)',
  }

  const inputStyle: React.CSSProperties = {
    background: 'var(--bg-secondary)',
    border: '1px solid var(--border-color)',
    borderRadius: '10px',
    padding: '12px 16px',
    color: 'var(--text-primary)',
    fontSize: '15px',
    transition: 'border-color 0.2s',
  }

  const btnStyle: React.CSSProperties = {
    background: 'var(--accent-primary)',
    color: 'var(--bg-primary)',
    padding: '14px',
    borderRadius: '10px',
    fontSize: '15px',
    fontWeight: 700,
    marginTop: '8px',
    opacity: loading ? 0.6 : 1,
    cursor: loading ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s',
  }

  const errorStyle: React.CSSProperties = {
    background: 'rgba(255, 87, 87, 0.15)',
    border: '1px solid var(--error)',
    color: 'var(--error)',
    padding: '12px',
    borderRadius: '10px',
    fontSize: '14px',
    textAlign: 'center',
  }

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
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
      </div>
    </div>
  )
}

export default LoginPage
