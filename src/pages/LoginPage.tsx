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
      setErr('Неверный email или пароль')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg-primary)',
      padding: '20px',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '380px',
      }}>
        <div style={{
          marginBottom: '40px',
          textAlign: 'center',
        }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: 800,
            color: 'var(--accent-primary)',
            marginBottom: '8px',
            letterSpacing: '-1px',
          }}>
            Reddix
          </h1>
          <p style={{
            color: 'var(--text-muted)',
            fontSize: '14px',
          }}>
            Панель аналитики
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}>
          <div>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email"
              style={{
                width: '100%',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '14px 16px',
                color: 'var(--text-primary)',
                fontSize: '15px',
                outline: 'none',
                transition: 'border 0.2s',
              }}
              onFocus={e => e.target.style.borderColor = 'var(--accent-primary)'}
              onBlur={e => e.target.style.borderColor = 'var(--border-color)'}
              required
            />
          </div>

          <div>
            <input
              type="password"
              value={pwd}
              onChange={e => setPwd(e.target.value)}
              placeholder="Пароль"
              style={{
                width: '100%',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '14px 16px',
                color: 'var(--text-primary)',
                fontSize: '15px',
                outline: 'none',
                transition: 'border 0.2s',
              }}
              onFocus={e => e.target.style.borderColor = 'var(--accent-primary)'}
              onBlur={e => e.target.style.borderColor = 'var(--border-color)'}
              required
            />
          </div>

          {err && (
            <div style={{
              background: 'rgba(255,87,87,0.1)',
              border: '1px solid rgba(255,87,87,0.3)',
              color: 'var(--error)',
              padding: '12px',
              borderRadius: '8px',
              fontSize: '14px',
            }}>
              {err}
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            style={{
              background: 'var(--accent-primary)',
              color: 'var(--bg-primary)',
              padding: '14px',
              borderRadius: '8px',
              fontSize: '15px',
              fontWeight: 600,
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              transition: 'opacity 0.2s',
            }}
          >
            {loading ? 'Вход...' : 'Войти'}
          </button>
        </form>

        <div style={{
          marginTop: '24px',
          padding: '16px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          fontSize: '13px',
          color: 'var(--text-muted)',
        }}>
          <div style={{marginBottom: '8px', fontWeight: 500, color: 'var(--text-secondary)'}}>
            Тестовый доступ:
          </div>
          <div>Email: admin@reddix.com</div>
          <div>Пароль: admin123</div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
