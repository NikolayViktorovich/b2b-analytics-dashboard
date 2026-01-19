import { formatPercent } from '@/utils/format'

interface Props {
  label: string
  value: string | number
  change?: number
  subtitle?: string
}

const StatCard = ({ label, value, change, subtitle }: Props) => {
  const hasChange = change !== undefined
  const isPositive = change && change > 0

  const cardStyle: React.CSSProperties = {
    background: 'var(--bg-card)',
    border: '1px solid var(--border-color)',
    borderRadius: '16px',
    padding: '24px',
    transition: 'all 0.2s',
  }

  const labelStyle: React.CSSProperties = {
    fontSize: '13px',
    color: 'var(--text-muted)',
    marginBottom: '8px',
    fontWeight: 400,
    letterSpacing: '0.3px',
  }

  const valueStyle: React.CSSProperties = {
    fontSize: '28px',
    fontWeight: 700,
    color: 'var(--text-primary)',
    marginBottom: '8px',
    letterSpacing: '-0.5px',
  }

  const changeStyle: React.CSSProperties = {
    fontSize: '13px',
    fontWeight: 500,
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '4px 8px',
    borderRadius: '6px',
    color: isPositive ? 'var(--bg-primary)' : 'var(--error)',
    background: isPositive ? 'var(--accent-primary)' : 'rgba(255, 87, 87, 0.15)',
  }

  const subtitleStyle: React.CSSProperties = {
    fontSize: '12px',
    color: 'var(--text-muted)',
    marginTop: '8px',
  }

  return (
    <div style={cardStyle}>
      <div style={labelStyle}>{label}</div>
      <div style={valueStyle}>{value}</div>
      {hasChange && (
        <div style={changeStyle}>
          {isPositive ? '↑' : '↓'} {formatPercent(change)}
        </div>
      )}
      {subtitle && <div style={subtitleStyle}>{subtitle}</div>}
    </div>
  )
}

export default StatCard
