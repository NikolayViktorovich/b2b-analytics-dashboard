interface Review {
  id: number
  score: number
  name: string
  date: string
  text: string
  category: string
}

interface Props {
  reviews: Review[]
}

const NPSReviews = ({ reviews }: Props) => {
  const getScoreColor = (score: number) => {
    if (score >= 9) return '#4ade80'
    if (score >= 7) return '#fbbf24'
    return '#f87171'
  }

  const getScoreType = (score: number) => {
    if (score >= 9) return 'Промоутер'
    if (score >= 7) return 'Нейтрал'
    return 'Критик'
  }

  const cardStyle: React.CSSProperties = {
    background: 'var(--bg-card)',
    border: '1px solid var(--border-color)',
    borderRadius: '16px',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
  }

  const headerStyle: React.CSSProperties = {
    marginBottom: '20px',
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

  const listStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    maxHeight: '400px',
    overflowY: 'auto',
  }

  const itemStyle: React.CSSProperties = {
    padding: '16px',
    background: 'var(--bg-secondary)',
    borderRadius: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  }

  const topStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px',
  }

  const leftStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  }

  const scoreStyle = (score: number): React.CSSProperties => ({
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    fontWeight: 700,
    background: getScoreColor(score) + '20',
    color: getScoreColor(score),
  })

  const nameStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: 600,
    color: 'var(--text-primary)',
  }

  const typeStyle = (score: number): React.CSSProperties => ({
    fontSize: '11px',
    fontWeight: 500,
    color: getScoreColor(score),
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  })

  const dateStyle: React.CSSProperties = {
    fontSize: '12px',
    color: 'var(--text-muted)',
  }

  const txtStyle: React.CSSProperties = {
    fontSize: '13px',
    color: 'var(--text-secondary)',
    lineHeight: 1.5,
  }

  const catStyle: React.CSSProperties = {
    display: 'inline-flex',
    padding: '4px 10px',
    borderRadius: '6px',
    fontSize: '11px',
    fontWeight: 500,
    background: 'var(--bg-tertiary)',
    color: 'var(--text-muted)',
  }

  return (
    <div style={cardStyle}>
      <div style={headerStyle}>
        <div style={titleStyle}>Последние отзывы</div>
        <div style={subtitleStyle}>Комментарии пользователей</div>
      </div>

      <div style={listStyle}>
        {reviews.map((rev) => (
          <div key={rev.id} style={itemStyle}>
            <div style={topStyle}>
              <div style={leftStyle}>
                <div style={scoreStyle(rev.score)}>{rev.score}</div>
                <div>
                  <div style={nameStyle}>{rev.name}</div>
                  <div style={typeStyle(rev.score)}>{getScoreType(rev.score)}</div>
                </div>
              </div>
              <div style={dateStyle}>{rev.date}</div>
            </div>
            <div style={txtStyle}>{rev.text}</div>
            <div>
              <span style={catStyle}>{rev.category}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default NPSReviews
