import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import { useAuthStore } from '@/store/authStore'
import AccessCodeModal from '@/components/auth/AccessCodeModal'

const LoginPage = () => {
  const [err, setErr] = useState('')
  const [showCodeModal, setShowCodeModal] = useState(false)
  const [pendingCredential, setPendingCredential] = useState<string | null>(null)
  const [newUserAccessCode, setNewUserAccessCode] = useState<string | null>(null)
  const [loginMode, setLoginMode] = useState<'google' | 'credentials'>('credentials')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { loginWithGoogle } = useAuthStore()
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || 'demo-client-id'

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      await loginWithGoogle(credentialResponse.credential, '')
      navigate('/')
    } catch (error: any) {
      setErr(error.message || 'Ошибка авторизации')
    }
  }

  const handleCodeSubmit = async (code: string) => {
    if (!pendingCredential) return

    try {
      const result = await loginWithGoogle(pendingCredential, code)
      
      if (result.isNewUser && result.accessCode) {
        setNewUserAccessCode(result.accessCode)
      } else {
        navigate('/')
      }
    } catch (error) {
      setErr('Неверный код')
    }
  }

  const handleCodeCancel = () => {
    setShowCodeModal(false)
    setPendingCredential(null)
    setNewUserAccessCode(null)
    setErr('')
  }

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErr('')

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001'
      const res = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || 'Login failed')
      }

      const data = await res.json()
      
      localStorage.setItem('token', data.token)
      localStorage.setItem('auth-storage', JSON.stringify({
        state: {
          user: data.user,
          isAuth: true,
          token: data.token
        },
        version: 0
      }))

      navigate('/')
      window.location.reload()
    } catch (error: any) {
      setErr(error.message || 'Неверный email или пароль')
    } finally {
      setLoading(false)
    }
  }

  if (!clientId || clientId === 'demo-client-id') {
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
          maxWidth: '500px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: '16px',
          padding: '32px',
          textAlign: 'center',
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 700,
            marginBottom: '16px',
            color: 'var(--text-primary)',
          }}>
            Сервис временно недоступен
          </h2>
          <p style={{
            color: 'var(--text-secondary)',
            marginBottom: '20px',
            lineHeight: '1.6',
          }}>
            Пожалуйста, попробуйте позже
          </p>
        </div>
      </div>
    )
  }

  return (
    <GoogleOAuthProvider clientId={clientId}>
      {showCodeModal && (
        <AccessCodeModal
          onSubmit={handleCodeSubmit}
          onCancel={handleCodeCancel}
          error={err}
          newUserCode={newUserAccessCode || undefined}
        />
      )}

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
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            alignItems: 'center',
          }}>
            {loginMode === 'credentials' ? (
              <form onSubmit={handleCredentialsLogin} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '10px',
                    fontSize: '15px',
                    color: 'var(--text-primary)',
                    outline: 'none',
                  }}
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Пароль"
                  required
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '10px',
                    fontSize: '15px',
                    color: 'var(--text-primary)',
                    outline: 'none',
                  }}
                />
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '14px',
                    background: loading ? 'var(--bg-secondary)' : 'var(--accent-primary)',
                    color: loading ? 'var(--text-muted)' : 'var(--bg-primary)',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '15px',
                    fontWeight: 600,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {loading ? 'Вход...' : 'Войти'}
                </button>
              </form>
            ) : (
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => setErr('Ошибка Google OAuth')}
                useOneTap
                theme="filled_black"
                size="large"
                width="380"
              />
            )}

            <button
              onClick={() => {
                setLoginMode(loginMode === 'credentials' ? 'google' : 'credentials')
                setErr('')
              }}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--accent-primary)',
                fontSize: '14px',
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              {loginMode === 'credentials' ? 'Войти через Google' : 'Войти по email/паролю'}
            </button>

            {err && (
              <div style={{
                width: '100%',
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
          </div>


        </div>
      </div>
    </GoogleOAuthProvider>
  )
}

export default LoginPage
