import { useState } from 'react'
import StatCard from '@/components/widgets/StatCard'
import ChartWidget from '@/components/widgets/ChartWidget'
import PeriodSelector from '@/components/dashboard/PeriodSelector'
import { formatCurrency } from '@/utils/format'

const mockStats = [
  { label: 'Количество продаж', value: '35 шт', change: 12.5 },
  { label: 'Количество покупающих клиентов', value: '23', change: -5.2 },
  { label: 'Новые клиенты', value: '12', change: 8.3 },
  { label: 'Отмены автопродлений', value: '23', change: -15.7 },
]

const mockStats2 = [
  { label: 'Период жизни клиента', value: '5.58 месяцев' },
  { label: 'Общие продажи', value: formatCurrency(21920) },
  { label: 'Средний чек', value: formatCurrency(483.4) },
]

const mockChartData = [
  { name: 'Апрель 2022', value: 30 },
  { name: 'Май 2022', value: 40 },
  { name: 'Июнь 2022', value: 50 },
]

const MainDashboard = () => {
  const [period, setPeriod] = useState({ start: '', end: '' })

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: 'clamp(8px, 2vw, 0)' }}>
      <PeriodSelector value={period} onChange={setPeriod} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(240px, 30vw, 280px), 1fr))', gap: 'clamp(12px, 2vw, 16px)', marginBottom: 'clamp(16px, 3vw, 24px)' }}>
        {mockStats.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(240px, 30vw, 280px), 1fr))', gap: 'clamp(12px, 2vw, 16px)', marginBottom: 'clamp(16px, 3vw, 24px)' }}>
        {mockStats2.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>

      <div style={{ marginTop: 'clamp(16px, 3vw, 24px)' }}>
        <ChartWidget
          title="История клиентской базы"
          data={mockChartData}
        />
      </div>
    </div>
  )
}

export default MainDashboard
