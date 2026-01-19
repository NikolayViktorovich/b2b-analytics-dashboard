import { formatPercent } from '@/utils/format'

interface Props {
  label: string
  value: string | number
  change?: number
  subtitle?: string
}

const StatCard = ({ label, value, change, subtitle }: Props) => {
  const hasChange = change !== undefined
  const pos = change && change > 0

  const card: React.CSSProperties = {
    background: 'var(--bg-card)',
    border: '1px solid var(--border-color)',
    borderRadius: '16px',
    padding: '24px',
    transition: 'all 0.2s',
  }

  const lbl: React.CSSProperties = {
    fontSize: '13px',
    color: 'var(--text-muted)',
    marginBottom: '8px',
    fontWeight: 400,
    letterSpacing: '0.3px',
  }

  const val: React.CSSProperties = {
    fontSize: '28px',
    fontWeight: 700,
    color: 'var(--text-primary)',
    marginBottom: '8px',
    letterSpacing: '-0.5px',
  }

  const chg: React.CSSProperties = {
    fontSize: '13px',
    fontWeight: 500,
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '4px 8px',
    borderRadius: '6px',
    color: pos ? 'var(--bg-primary)' : 'var(--error)',
    background: pos ? 'var(--accent-primary)' : 'rgba(255,87,87,0.15)',
  }

  const sub: React.CSSProperties = {
    fontSize: '12px',
    color: 'var(--text-muted)',
    marginTop: '8px',
  }

  return (
    <div style={card}>
      <div style={lbl}>{label}</div>
      <div style={val}>{value}</div>
      {hasChange && (
        <div style={chg}>
          {pos ? '↑' : '↓'} {formatPercent(change)}
        </div>
      )}
      {subtitle && <div style={sub}>{subtitle}</div>}
    </div>
  )
}

export default StatCard
