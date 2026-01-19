import NPSScore from '@/components/nps/NPSScore'
import NPSTrend from '@/components/nps/NPSTrend'
import NPSDistribution from '@/components/nps/NPSDistribution'
import NPSReviews from '@/components/nps/NPSReviews'
import NPSCategories from '@/components/nps/NPSCategories'

const npsData = {
  curr: 42,
  prev: 38,
  change: 4,
  total: 1247,
  promoters: 587,
  passives: 423,
  detractors: 237,
}

const trendData = [
  { month: 'Янв', score: 35 },
  { month: 'Фев', score: 38 },
  { month: 'Мар', score: 36 },
  { month: 'Апр', score: 40 },
  { month: 'Май', score: 39 },
  { month: 'Июн', score: 42 },
]

const distData = [
  { name: 'Промоутеры', value: 587, color: '#4ade80', percent: 47 },
  { name: 'Нейтралы', value: 423, color: '#fbbf24', percent: 34 },
  { name: 'Критики', value: 237, color: '#f87171', percent: 19 },
]

const reviews = [
  { id: 1, score: 9, name: 'Алексей М.', date: '2 часа назад', text: 'Отличный сервис, все работает быстро и понятно. Рекомендую!', category: 'Качество' },
  { id: 2, score: 3, name: 'Мария К.', date: '5 часов назад', text: 'Долгая загрузка страниц, часто зависает. Нужно улучшать производительность.', category: 'Производительность' },
  { id: 3, score: 10, name: 'Дмитрий П.', date: '1 день назад', text: 'Лучшая панель аналитики, которую я использовал. Все интуитивно понятно.', category: 'Удобство' },
  { id: 4, score: 7, name: 'Елена С.', date: '1 день назад', text: 'В целом хорошо, но не хватает некоторых функций экспорта данных.', category: 'Функционал' },
  { id: 5, score: 2, name: 'Игорь В.', date: '2 дня назад', text: 'Слишком дорого для такого функционала. Есть более дешевые аналоги.', category: 'Цена' },
]

const categories = [
  { name: 'Качество', count: 342, sentiment: 'positive' },
  { name: 'Удобство', count: 298, sentiment: 'positive' },
  { name: 'Производительность', count: 187, sentiment: 'negative' },
  { name: 'Функционал', count: 156, sentiment: 'neutral' },
  { name: 'Цена', count: 143, sentiment: 'negative' },
  { name: 'Поддержка', count: 121, sentiment: 'positive' },
]

const NPSPage = () => {
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
    gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(280px, 30vw, 320px), 1fr))',
    gap: 'clamp(16px, 2.5vw, 20px)',
    marginBottom: 'clamp(20px, 3vw, 24px)',
  }

  const midGrid: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
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
        <h1 style={h1Style}>NPS опросы</h1>
        <p style={subtitleStyle}>Анализ удовлетворенности клиентов</p>
      </div>

      <div style={topGrid}>
        <NPSScore data={npsData} />
      </div>

      <div className="mid-grid" style={midGrid}>
        <NPSTrend data={trendData} />
        <NPSDistribution data={distData} />
      </div>

      <div className="bottom-grid" style={bottomGrid}>
        <NPSReviews reviews={reviews} />
        <NPSCategories categories={categories} />
      </div>
    </div>
  )
}

export default NPSPage
