interface Category {
  name: string
  count: number
  sentiment: 'positive' | 'neutral' | 'negative'
}

interface Props {
  categories: Category[]
}

const NPSCategories = ({ categories }: Props) => {
  const getSentimentColor = (sentiment: string) => {
    if (sentiment === 'positive') return '#4ade80'
    if (sentiment === 'neutral') return '#fbbf24'
    return '#f87171'
  }

  const getSentimentIcon = (sentiment: string) => {
    if (sentiment === 'positive') return '↑'
    if (sentiment === 'neutral') return '→'
    return '↓'
  }

  const maxCount = Math.max(...categories.map(c => c.count))

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
    gap: '16px',
  }

  const itemStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  }

  const topStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }

  const nameStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: 500,
    color: 'var(--text-primary)',
  }

  const cntStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: 600,
    color: 'var(--text-secondary)',
  }

  const barWrap: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '8px',
    background: 'var(--bg-secondary)',
    borderRadius: '4px',
    overflow: 'hidden',
  }

  const barStyle = (count: number, sentiment: string): React.CSSProperties => ({
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    width: `${(count / maxCount) * 100}%`,
    background: getSentimentColor(sentiment),
    borderRadius: '4px',
    transition: 'width 0.3s ease',
  })

  const sentimentStyle = (sentiment: string): React.CSSProperties => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '12px',
    fontWeight: 600,
    color: getSentimentColor(sentiment),
  })

  return (
    <div style={cardStyle}>
      <div style={headerStyle}>
        <div style={titleStyle}>Категории отзывов</div>
        <div style={subtitleStyle}>Топ упоминаемых тем</div>
      </div>

      <div style={listStyle}>
        {categories.map((cat, idx) => (
          <div key={idx} style={itemStyle}>
            <div style={topStyle}>
              <div style={nameStyle}>{cat.name}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={sentimentStyle(cat.sentiment)}>
                  {getSentimentIcon(cat.sentiment)}
                </span>
                <span style={cntStyle}>{cat.count}</span>
              </div>
            </div>
            <div style={barWrap}>
              <div style={barStyle(cat.count, cat.sentiment)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default NPSCategories
