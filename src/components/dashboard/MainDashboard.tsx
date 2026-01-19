import StatCard from '../widgets/StatCard'
import RevenueChart from '../widgets/RevenueChart'
import SourcesChart from '../widgets/SourcesChart'
import ProductTable from '../widgets/ProductTable'

const mockStats = [
  { label: 'Общие продажи', value: '$210,578', change: 12.5, subtitle: 'Среднее значение продаж' },
  { label: 'Всего заказов', value: '1245', change: -3.5, subtitle: 'Среднее количество заказов' },
  { label: 'Конверсия', value: '8.5%', change: 4.3, subtitle: 'Средний процент конверсии' },
  { label: 'Средний чек', value: '$150.40', change: 8.2, subtitle: 'Средняя стоимость заказа' },
]

const mockRevenueData = [
  { month: 'Янв', value: 45000 },
  { month: 'Фев', value: 52000 },
  { month: 'Мар', value: 48000 },
  { month: 'Апр', value: 61000 },
  { month: 'Май', value: 55000 },
  { month: 'Июн', value: 67000 },
  { month: 'Июл', value: 58000 },
  { month: 'Авг', value: 72000 },
  { month: 'Сен', value: 65000 },
  { month: 'Окт', value: 58000 },
  { month: 'Ноя', value: 70000 },
  { month: 'Дек', value: 68000 },
]

const mockSourceData = [
  { name: 'Электронная коммерция', value: 1376, color: '#6366f1' },
  { name: 'Веб-сайт', value: 234, color: '#3b82f6' },
  { name: 'Социальные сети', value: 850, color: '#8b5cf6' },
]

const mockProducts = [
  { name: 'Nike Air Max Shoe', brand: 'Nike', quantity: 1250, price: 95.00, earning: 95.00 },
  { name: 'MacBook Pro', brand: 'Apple', quantity: 1850, price: 27.00, earning: 95.00 },
  { name: 'Nike Air Jordan', brand: 'Nike', quantity: 40, price: 34.00, earning: 95.00 },
  { name: 'Amazon Echo', brand: 'Amazon', quantity: 95, price: 85.00, earning: 95.00 },
  { name: 'iPhone 16 Pro Max', brand: 'Apple', quantity: 80, price: 36.00, earning: 95.00 },
]

const MainDashboard = () => {
  return (
    <div style={{ padding: '32px', maxWidth: '100%' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px' }}>Аналитика продаж</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Полный отчет по аналитике и статистике</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        {mockStats.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '24px' }}>
        <RevenueChart data={mockRevenueData} />
        <SourcesChart data={mockSourceData} />
      </div>

      <ProductTable products={mockProducts} />
    </div>
  )
}

export default MainDashboard
