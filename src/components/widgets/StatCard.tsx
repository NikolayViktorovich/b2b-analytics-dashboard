import { formatPercent } from '@/utils/format'

interface Props {
  label: string
  value: string | number
  change?: number
}

const StatCard = ({ label, value, change }: Props) => {
  const hasChange = change !== undefined
  const isPositive = change && change > 0

  const cardStyle: React.CSSProperties = {
    background: 'var(--bg-secondary)',
    border: '1px solid var(--border-color)',
    borderRadius: 'clamp(8px, 1.5vw, 12px)',
    padding: 'clamp(16px, 2.5vw, 20px)',
    transition: 'transform 0.2s, box-shadow 0.2s',
  }

  const labelStyle: React.CSSProperties = {
    fontSize: 'clamp(12px, 1.2vw, 13px)',
    color: 'var(--text-secondary)',
    marginBottom: 'clamp(8px, 1.5vw, 12px)',
    fontWeight: 500,
  }

  const valueStyle: React.CSSProperties = {
    fontSize: 'clamp(22px, 3vw, 28px)',
    fontWeight: 700,
    color: 'var(--text-primary)',
    marginBottom: 'clamp(6px, 1vw, 8px)',
  }

  const changeStyle: React.CSSProperties = {
    fontSize: 'clamp(12px, 1.2vw, 14px)',
    fontWeight: 600,
    display: 'inline-block',
    padding: 'clamp(3px, 0.5vw, 4px) clamp(6px, 1vw, 8px)',
    borderRadius: '6px',
    color: isPositive ? 'var(--success)' : 'var(--error)',
    background: isPositive ? 'rgba(61, 217, 179, 0.1)' : 'rgba(255, 87, 87, 0.1)',
  }

  return (
    <div style={cardStyle}>
      <div style={labelStyle}>{label}</div>
      <div style={valueStyle}>{value}</div>
      {hasChange && (
        <div style={changeStyle}>
          {formatPercent(change)}
        </div>
      )}
    </div>
  )
}

export default StatCard
