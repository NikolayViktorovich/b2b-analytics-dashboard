interface Props {
  value: { start: string; end: string }
  onChange: (value: { start: string; end: string }) => void
}

const PeriodSelector = ({ value, onChange }: Props) => {
  const containerStyle: React.CSSProperties = {
    background: 'var(--bg-secondary)',
    border: '1px solid var(--border-color)',
    borderRadius: 'clamp(8px, 1.5vw, 12px)',
    padding: 'clamp(16px, 3vw, 24px)',
    marginBottom: 'clamp(16px, 3vw, 24px)',
  }

  const titleStyle: React.CSSProperties = {
    fontSize: 'clamp(18px, 2vw, 20px)',
    fontWeight: 600,
    marginBottom: 'clamp(16px, 2vw, 20px)',
  }

  const controlsStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 'clamp(12px, 2vw, 20px)',
    flexWrap: 'wrap',
  }

  const datesStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 'clamp(8px, 1.5vw, 12px)',
    flexWrap: 'wrap',
  }

  const inputStyle: React.CSSProperties = {
    background: 'var(--bg-tertiary)',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    padding: 'clamp(8px, 1.5vw, 10px) clamp(12px, 2vw, 14px)',
    color: 'var(--text-primary)',
    fontSize: 'clamp(13px, 1.2vw, 14px)',
    minWidth: 'clamp(140px, 20vw, 160px)',
  }

  const actionsStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 'clamp(8px, 1.5vw, 12px)',
    flexWrap: 'wrap',
  }

  const btnPrimaryStyle: React.CSSProperties = {
    background: 'var(--accent-primary)',
    color: 'var(--bg-primary)',
    padding: 'clamp(8px, 1.5vw, 10px) clamp(16px, 3vw, 24px)',
    borderRadius: '8px',
    fontSize: 'clamp(13px, 1.2vw, 14px)',
    fontWeight: 600,
  }

  const btnSecondaryStyle: React.CSSProperties = {
    background: 'transparent',
    border: '1px solid var(--border-color)',
    color: 'var(--text-secondary)',
    padding: 'clamp(8px, 1.5vw, 10px) clamp(16px, 2.5vw, 20px)',
    borderRadius: '8px',
    fontSize: 'clamp(13px, 1.2vw, 14px)',
    fontWeight: 500,
  }

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Выбрать период</h1>
      
      <div style={controlsStyle}>
        <div style={datesStyle}>
          <input
            type="date"
            value={value.start}
            onChange={(e) => onChange({ ...value, start: e.target.value })}
            style={inputStyle}
          />
          <span style={{ color: 'var(--text-secondary)', fontSize: '18px' }}>→</span>
          <input
            type="date"
            value={value.end}
            onChange={(e) => onChange({ ...value, end: e.target.value })}
            style={inputStyle}
          />
        </div>

        <div style={actionsStyle}>
          <button style={btnSecondaryStyle}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M14 2H2v12h12V2z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button style={btnPrimaryStyle}>Применить</button>
          <button style={btnSecondaryStyle}>Сбросить</button>
        </div>
      </div>
    </div>
  )
}

export default PeriodSelector
