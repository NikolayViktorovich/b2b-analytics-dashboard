import { useState, useRef, useEffect } from 'react'

interface Props {
  onSubmit: (code: string) => void
  onCancel: () => void
  error?: string
  newUserCode?: string
}

const AccessCodeModal = ({ onSubmit, onCancel, error, newUserCode }: Props) => {
  const [code, setCode] = useState('')
  const [copied, setCopied] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!newUserCode) {
      inputRef.current?.focus()
    }
  }, [newUserCode])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newUserCode) {
      onSubmit('')
    } else if (code.trim()) {
      onSubmit(code.trim())
    }
  }

  const handleCopy = () => {
    if (newUserCode) {
      navigator.clipboard.writeText(newUserCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const overlay: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    padding: '20px',
  }

  const modal: React.CSSProperties = {
    background: 'var(--bg-card)',
    borderRadius: '16px',
    padding: '32px',
    width: '100%',
    maxWidth: '420px',
    animation: 'slideUp 0.3s ease-out',
  }

  const title: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: 700,
    color: 'var(--text-primary)',
    marginBottom: '8px',
  }

  const subtitle: React.CSSProperties = {
    fontSize: '14px',
    color: 'var(--text-muted)',
    marginBottom: '24px',
    lineHeight: 1.5,
  }

  const form: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  }

  const input: React.CSSProperties = {
    width: '100%',
    padding: '14px 16px',
    background: 'var(--bg-secondary)',
    border: '2px solid var(--border-color)',
    borderRadius: '10px',
    fontSize: '16px',
    color: 'var(--text-primary)',
    outline: 'none',
    transition: 'border-color 0.2s',
  }

  const errorMsg: React.CSSProperties = {
    padding: '12px',
    background: 'rgba(248,113,113,0.1)',
    border: '1px solid rgba(248,113,113,0.3)',
    borderRadius: '8px',
    color: '#f87171',
    fontSize: '14px',
  }

  const buttons: React.CSSProperties = {
    display: 'flex',
    gap: '12px',
  }

  const btnPrimary: React.CSSProperties = {
    flex: 1,
    padding: '14px',
    background: 'var(--accent-primary)',
    color: 'var(--bg-primary)',
    border: 'none',
    borderRadius: '10px',
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
  }

  const btnSecondary: React.CSSProperties = {
    flex: 1,
    padding: '14px',
    background: 'transparent',
    color: 'var(--text-secondary)',
    border: '1px solid var(--border-color)',
    borderRadius: '10px',
    fontSize: '15px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s',
  }

  if (newUserCode) {
    return (
      <div style={overlay}>
        <div style={modal}>
          <h2 style={title}>Добро пожаловать!</h2>
          <p style={subtitle}>
            Сохраните этот код - он понадобится при следующем входе.
          </p>
          
          <div style={{
            background: 'var(--bg-secondary)',
            border: '2px solid var(--accent-primary)',
            borderRadius: '12px',
            padding: '20px',
            textAlign: 'center',
            marginBottom: '16px',
          }}>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Ваш код
            </div>
            <div style={{ 
              fontSize: '24px', 
              fontWeight: 700, 
              color: 'var(--accent-primary)',
              fontFamily: 'monospace',
              letterSpacing: '2px',
            }}>
              {newUserCode}
            </div>
          </div>

          <button
            onClick={handleCopy}
            style={{
              ...btnPrimary,
              background: copied ? '#4ade80' : 'var(--bg-secondary)',
              color: copied ? 'white' : 'var(--text-primary)',
              marginBottom: '12px',
            }}
          >
            {copied ? 'Скопировано' : 'Скопировать код'}
          </button>

          <div style={{
            fontSize: '12px',
            color: 'var(--text-muted)',
            padding: '12px',
            background: 'var(--bg-secondary)',
            borderRadius: '8px',
            lineHeight: '1.5',
            marginBottom: '16px',
          }}>
            Сохраните код в надежном месте.
          </div>

          <button onClick={() => onSubmit('')} style={btnPrimary}>
            Продолжить
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={overlay} onClick={onCancel}>
      <div style={modal} onClick={(e) => e.stopPropagation()}>
        <h2 style={title}>Код авторизации</h2>
        <p style={subtitle}>
          Введите код для входа в систему
        </p>

        <form onSubmit={handleSubmit} style={form}>
          <input
            ref={inputRef}
            type="password"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Код"
            style={input}
            onFocus={(e) => e.currentTarget.style.borderColor = 'var(--accent-primary)'}
            onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
          />

          {error && <div style={errorMsg}>{error}</div>}

          <div style={buttons}>
            <button type="button" onClick={onCancel} style={btnSecondary}>
              Отмена
            </button>
            <button type="submit" style={btnPrimary}>
              Войти
            </button>
          </div>
        </form>


      </div>
    </div>
  )
}

export default AccessCodeModal
