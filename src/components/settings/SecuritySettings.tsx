const SecuritySettings = () => {
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

  const infoStyle: React.CSSProperties = {
    padding: '12px 16px',
    background: 'rgba(96, 165, 250, 0.15)',
    border: '1px solid rgba(96, 165, 250, 0.3)',
    borderRadius: '10px',
    fontSize: '13px',
    color: '#60a5fa',
  }

  return (
    <div style={cardStyle}>
      <div>
        <div style={titleStyle}>Безопасность</div>
        <div style={subtitleStyle}>Управление паролем и доступом</div>
      </div>

      <div style={fieldStyle}>
        <label style={lblStyle}>Текущий пароль</label>
        <input type="password" placeholder="••••••••" style={inputStyle} />
      </div>

      <div style={fieldStyle}>
        <label style={lblStyle}>Новый пароль</label>
        <input type="password" placeholder="••••••••" style={inputStyle} />
      </div>

      <div style={fieldStyle}>
        <label style={lblStyle}>Подтвердите пароль</label>
        <input type="password" placeholder="••••••••" style={inputStyle} />
      </div>

      <div style={infoStyle}>
        Пароль должен содержать минимум 8 символов, включая цифры и спецсимволы
      </div>

      <button style={btnStyle}>Изменить пароль</button>
    </div>
  )
}

export default SecuritySettings
