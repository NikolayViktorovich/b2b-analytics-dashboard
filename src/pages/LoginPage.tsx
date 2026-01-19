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

  const container = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    background: 'linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)',
  }

  const card = {
    background: 'var(--bg-card)',
    border: '1px solid var(--border-color)',
    borderRadius: '20px',
    padding: '48px',
    width: '100%',
    maxWidth: '420px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
  }

  const title = {
    fontSize: '32px',
    fontWeight: 700,
    textAlign: 'center' as const,
    marginBottom: '8px',
    background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-dark) 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  }

  const subtitle = {
    color: 'var(--text-muted)',
    textAlign: 'center' as const,
    marginBottom: '32px',
    fontSize: '15px',
  }

  const form = {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '20px',
  }

  const field = {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
  }

  const label = {
    fontSize: '14px',
    fontWeight: 500,
    color: 'var(--text-secondary)',
  }

  const input = {
    background: 'var(--bg-secondary)',
    border: '1px solid var(--border-color)',
    borderRadius: '10px',
    padding: '12px 16px',
    color: 'var(--text-primary)',
    fontSize: '15px',
    transition: 'border-color 0.2s',
  }

  const btn = {
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

  const error = {
    background: 'rgba(255,87,87,0.15)',
    border: '1px solid var(--error)',
    color: 'var(--error)',
    padding: '12px',
    borderRadius: '10px',
    fontSize: '14px',
    textAlign: 'center' as const,
  }

  return (
    <div style={container}>
      <div style={card}>
        <h1 style={title}>Reddix</h1>
        <p style={subtitle}>Войдите в систему</p>

        <form onSubmit={handleSubmit} style={form}>
          <div style={field}>
            <label htmlFor="email" style={label}>Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@example.com"
              style={input}
              required
            />
          </div>

          <div style={field}>
            <label htmlFor="pwd" style={label}>Пароль</label>
            <input
              id="pwd"
              type="password"
              value={pwd}
              onChange={e => setPwd(e.target.value)}
              placeholder="••••••••"
              style={input}
              required
            />
          </div>

          {err && <div style={error}>{err}</div>}

          <button type="submit" style={btn} disabled={loading}>
            {loading ? 'Вход...' : 'Войти'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
