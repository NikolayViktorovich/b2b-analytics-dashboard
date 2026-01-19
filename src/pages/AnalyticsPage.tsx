import SalesFunnel from '@/components/analytics/SalesFunnel'
import PeriodComparison from '@/components/analytics/PeriodComparison'
import CategorySales from '@/components/analytics/CategorySales'
import RFMSegments from '@/components/analytics/RFMSegments'
import GeoSales from '@/components/analytics/GeoSales'

const funnelData = [
  { stage: 'Просмотры', value: 12450, percent: 100, color: '#6366f1' },
  { stage: 'В корзину', value: 3890, percent: 31, color: '#8b5cf6' },
  { stage: 'Оформление', value: 2156, percent: 17, color: '#a855f7' },
  { stage: 'Оплата', value: 1247, percent: 10, color: '#c084fc' },
]

const comparisonData = {
  curr: { revenue: 588250, orders: 1247, conversion: 8.5, avgCheck: 471.5 },
  prev: { revenue: 524180, orders: 1156, conversion: 7.8, avgCheck: 453.3 },
}

const categoryData = [
  { name: 'Электроника', sales: 245680, orders: 342, growth: 12.5, color: '#6366f1' },
  { name: 'Одежда', sales: 189340, orders: 567, growth: 8.3, color: '#8b5cf6' },
  { name: 'Дом и сад', sales: 156780, orders: 234, growth: -3.2, color: '#a855f7' },
  { name: 'Спорт', sales: 98450, orders: 189, growth: 15.7, color: '#c084fc' },
  { name: 'Красота', sales: 76890, orders: 423, growth: 6.4, color: '#d8b4fe' },
]

const rfmData = [
  { segment: 'Чемпионы', count: 234, revenue: 156780, color: '#4ade80', desc: 'Покупают часто и много' },
  { segment: 'Лояльные', count: 456, revenue: 98450, color: '#22c55e', desc: 'Регулярные покупатели' },
  { segment: 'Потенциал', count: 189, revenue: 67890, color: '#fbbf24', desc: 'Могут стать лояльными' },
  { segment: 'Новички', count: 567, revenue: 45670, color: '#60a5fa', desc: 'Недавно купили' },
  { segment: 'Спящие', count: 342, revenue: 23450, color: '#f87171', desc: 'Давно не покупали' },
]

const geoData = [
  { region: 'Москва', sales: 189340, orders: 567, percent: 32 },
  { region: 'Санкт-Петербург', sales: 145670, orders: 423, percent: 25 },
  { region: 'Новосибирск', sales: 78900, orders: 234, percent: 13 },
  { region: 'Екатеринбург', sales: 67450, orders: 189, percent: 11 },
  { region: 'Казань', sales: 56780, orders: 156, percent: 10 },
  { region: 'Другие', sales: 50110, orders: 178, percent: 9 },
]

const AnalyticsPage = () => {
  const containerStyle: React.CSSProperties = {
    padding: 'clamp(16px, 3vw, 32px)',
    maxWidth: '100%',
    width: '100%',
    boxSizing: 'border-box',
  }

  const headerStyle: React.CSSProperties = {
    marginBottom: 'clamp(20px, 3vw, 32px)',
  }

  const h1Style: React.CSSProperties = {
    fontSize: 'clamp(20px, 3vw, 28px)',
    fontWeight: 700,
    marginBottom: 'clamp(4px, 1vw, 8px)',
  }

  const subtitleStyle: React.CSSProperties = {
    color: 'var(--text-muted)',
    fontSize: 'clamp(12px, 1.5vw, 14px)',
  }

  const topGrid: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: 'clamp(16px, 2.5vw, 20px)',
    marginBottom: 'clamp(20px, 3vw, 24px)',
  }

  const midGrid: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(300px, 40vw, 400px), 1fr))',
    gap: 'clamp(16px, 2.5vw, 20px)',
    marginBottom: 'clamp(20px, 3vw, 24px)',
  }

  const bottomGrid: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 'clamp(16px, 2.5vw, 20px)',
  }

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={h1Style}>Детальная аналитика</h1>
        <p style={subtitleStyle}>Глубокий анализ продаж и клиентов</p>
      </div>

      <div className="top-grid" style={topGrid}>
        <SalesFunnel data={funnelData} />
        <PeriodComparison data={comparisonData} />
      </div>

      <div className="mid-grid" style={midGrid}>
        <CategorySales data={categoryData} />
      </div>

      <div className="bottom-grid" style={bottomGrid}>
        <RFMSegments data={rfmData} />
        <GeoSales data={geoData} />
      </div>
    </div>
  )
}

export default AnalyticsPage
