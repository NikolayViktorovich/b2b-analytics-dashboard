interface Page {
  page: string
  views: number
  avgTime: string
  bounceRate: number
  exitRate: number
}

interface P {
  data: Page[]
}

const PopularPages = ({ data }: P) => {
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
  }

  const headerStyle: React.CSSProperties = {
    marginBottom: '16px',
    flexShrink: 0,
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

  const tableWrap: React.CSSProperties = {
    flex: 1,
    overflowY: 'auto',
  }

  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
  }

  const thStyle: React.CSSProperties = {
    textAlign: 'left',
    padding: '12px',
    fontSize: '12px',
    fontWeight: 500,
    color: 'var(--text-muted)',
    borderBottom: '1px solid var(--border-color)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  }

  const tdStyle: React.CSSProperties = {
    padding: '16px 12px',
    fontSize: '14px',
    color: 'var(--text-primary)',
    borderBottom: '1px solid var(--border-color)',
  }

  const pageStyle: React.CSSProperties = {
    fontFamily: 'monospace',
    color: 'var(--accent-primary)',
  }

  return (
    <div style={cardStyle}>
      <div style={headerStyle}>
        <div style={titleStyle}>Популярные страницы</div>
        <div style={subtitleStyle}>Топ страниц по просмотрам</div>
      </div>

      <div style={tableWrap}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Страница</th>
              <th style={thStyle}>Просмотры</th>
              <th style={thStyle}>Ср. время</th>
              <th style={thStyle}>Отказы</th>
              <th style={thStyle}>Выходы</th>
            </tr>
          </thead>
          <tbody>
            {data.map((page, idx) => (
              <tr key={idx}>
                <td style={{ ...tdStyle, ...pageStyle }}>{page.page}</td>
                <td style={tdStyle}>{page.views.toLocaleString()}</td>
                <td style={tdStyle}>{page.avgTime}</td>
                <td style={tdStyle}>{page.bounceRate}%</td>
                <td style={tdStyle}>{page.exitRate}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PopularPages
