import 'dotenv/config'
import { connectDB } from '../config/database.js'
import User from '../models/User.js'
import Dashboard from '../models/Dashboard.js'
import Analytics from '../models/Analytics.js'
import NPS from '../models/NPS.js'
import Website from '../models/Website.js'

const seedUsers = async () => {
  await User.deleteMany({})
  await User.collection.dropIndexes()

  const admin = await User.create({
    email: 'admin@reddix.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin',
    accessCode: 'ADMIN-' + Math.random().toString(36).substring(2, 10).toUpperCase(),
    isActive: true,
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      weeklyReport: true
    }
  })

  const manager = await User.create({
    email: 'manager@reddix.com',
    password: 'manager123',
    name: 'Manager User',
    role: 'manager',
    accessCode: 'MGR-' + Math.random().toString(36).substring(2, 10).toUpperCase(),
    isActive: true,
    notifications: {
      emailNotifications: true,
      pushNotifications: false,
      weeklyReport: true
    }
  })

  const viewer = await User.create({
    email: 'viewer@reddix.com',
    name: 'Viewer User',
    role: 'viewer',
    googleId: 'viewer-123',
    accessCode: 'VIEW-' + Math.random().toString(36).substring(2, 10).toUpperCase(),
    isActive: true,
    notifications: {
      emailNotifications: false,
      pushNotifications: false,
      weeklyReport: false
    }
  })
  
  console.log('\n=== УЧЕТНЫЕ ДАННЫЕ ПОЛЬЗОВАТЕЛЕЙ ===')
  console.log(`ADMIN    | ${admin.email.padEnd(25)} | Пароль: admin123`)
  console.log(`MANAGER  | ${manager.email.padEnd(25)} | Пароль: manager123`)
  console.log(`VIEWER   | ${viewer.email.padEnd(25)} | Google OAuth`)
  console.log('====================================\n')
  console.log('Пользователи созданы')
}

const seedDashboard = async () => {
  const periods = ['today', 'week', 'month', 'year']
  const dashboards = []

  for (const period of periods) {
    dashboards.push({
      date: new Date(),
      period,
      stats: {
        revenue: {
          value: Math.floor(Math.random() * 50000) + 30000,
          change: (Math.random() * 20 - 5).toFixed(1),
          trend: Math.random() > 0.5 ? 'up' : 'down'
        },
        orders: {
          value: Math.floor(Math.random() * 2000) + 1000,
          change: (Math.random() * 15 - 3).toFixed(1),
          trend: Math.random() > 0.5 ? 'up' : 'down'
        },
        customers: {
          value: Math.floor(Math.random() * 10000) + 5000,
          change: (Math.random() * 10 - 2).toFixed(1),
          trend: Math.random() > 0.5 ? 'up' : 'down'
        },
        conversion: {
          value: (Math.random() * 5 + 2).toFixed(2),
          change: (Math.random() * 8 - 2).toFixed(1),
          trend: Math.random() > 0.5 ? 'up' : 'down'
        }
      },
      revenueChart: Array.from({ length: 30 }, (_, i) => ({
        date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        revenue: Math.floor(Math.random() * 10000) + 5000,
        orders: Math.floor(Math.random() * 200) + 100
      })),
      topProducts: [
        { name: 'Premium Widget', sales: 234, revenue: 12450, growth: 12.5 },
        { name: 'Standard Package', sales: 189, revenue: 9876, growth: -3.2 },
        { name: 'Basic Plan', sales: 156, revenue: 8234, growth: 8.7 },
        { name: 'Enterprise Suite', sales: 98, revenue: 15600, growth: 22.1 },
        { name: 'Starter Kit', sales: 87, revenue: 4350, growth: -1.5 }
      ],
      trafficSources: [
        { source: 'Органический поиск', value: 45, change: 5.2 },
        { source: 'Прямые заходы', value: 30, change: -2.1 },
        { source: 'Социальные сети', value: 15, change: 12.3 },
        { source: 'Рефералы', value: 10, change: 3.4 }
      ]
    })
  }

  await Dashboard.deleteMany({})
  await Dashboard.insertMany(dashboards)
  console.log('Данные дашборда созданы')
}

const seedAnalytics = async () => {
  const analytics = []

  for (let i = 0; i < 30; i++) {
    analytics.push({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
      period: 'daily',
      revenue: {
        total: Math.floor(Math.random() * 50000) + 30000,
        orders: Math.floor(Math.random() * 500) + 200,
        avgOrderValue: Math.floor(Math.random() * 200) + 100
      },
      products: [
        { name: 'Premium Widget', sales: Math.floor(Math.random() * 100) + 50, revenue: Math.floor(Math.random() * 5000) + 2000, growth: (Math.random() * 30 - 10).toFixed(1) },
        { name: 'Standard Package', sales: Math.floor(Math.random() * 80) + 40, revenue: Math.floor(Math.random() * 4000) + 1500, growth: (Math.random() * 25 - 8).toFixed(1) },
        { name: 'Basic Plan', sales: Math.floor(Math.random() * 60) + 30, revenue: Math.floor(Math.random() * 3000) + 1000, growth: (Math.random() * 20 - 5).toFixed(1) }
      ],
      categories: [
        { name: 'Электроника', sales: Math.floor(Math.random() * 200) + 100, revenue: Math.floor(Math.random() * 10000) + 5000 },
        { name: 'Одежда', sales: Math.floor(Math.random() * 150) + 80, revenue: Math.floor(Math.random() * 8000) + 4000 },
        { name: 'Дом и сад', sales: Math.floor(Math.random() * 120) + 60, revenue: Math.floor(Math.random() * 6000) + 3000 }
      ],
      geography: [
        { country: 'Россия', sales: Math.floor(Math.random() * 300) + 150, revenue: Math.floor(Math.random() * 15000) + 8000 },
        { country: 'Казахстан', sales: Math.floor(Math.random() * 150) + 80, revenue: Math.floor(Math.random() * 8000) + 4000 },
        { country: 'Беларусь', sales: Math.floor(Math.random() * 120) + 60, revenue: Math.floor(Math.random() * 6000) + 3000 },
        { country: 'Украина', sales: Math.floor(Math.random() * 100) + 50, revenue: Math.floor(Math.random() * 5000) + 2500 }
      ],
      sources: [
        { name: 'Органический поиск', value: 45, percentage: 45 },
        { name: 'Прямые заходы', value: 30, percentage: 30 },
        { name: 'Социальные сети', value: 15, percentage: 15 },
        { name: 'Рефералы', value: 10, percentage: 10 }
      ],
      funnel: [
        { stage: 'Визиты', value: 10000, percentage: 100 },
        { stage: 'Просмотры товаров', value: 6500, percentage: 65 },
        { stage: 'Добавление в корзину', value: 3200, percentage: 32 },
        { stage: 'Оформление заказа', value: 1500, percentage: 15 },
        { stage: 'Покупка', value: 850, percentage: 8.5 }
      ],
      rfmSegments: [
        { segment: 'Чемпионы', customers: 234, revenue: 45000 },
        { segment: 'Лояльные', customers: 456, revenue: 38000 },
        { segment: 'Потенциальные', customers: 678, revenue: 25000 },
        { segment: 'В зоне риска', customers: 123, revenue: 12000 },
        { segment: 'Потерянные', customers: 89, revenue: 5000 }
      ],
      comparison: {
        current: Math.floor(Math.random() * 50000) + 30000,
        previous: Math.floor(Math.random() * 45000) + 28000,
        change: (Math.random() * 20 - 5).toFixed(1)
      }
    })
  }

  await Analytics.deleteMany({})
  await Analytics.insertMany(analytics)
  console.log('Данные аналитики созданы')
}

const seedNPS = async () => {
  const npsData = []

  for (let i = 0; i < 12; i++) {
    const promoters = Math.floor(Math.random() * 100) + 50
    const passives = Math.floor(Math.random() * 50) + 20
    const detractors = Math.floor(Math.random() * 30) + 10
    const total = promoters + passives + detractors
    const score = Math.round(((promoters - detractors) / total) * 100)

    npsData.push({
      date: new Date(Date.now() - i * 30 * 24 * 60 * 60 * 1000),
      score,
      promoters,
      passives,
      detractors,
      totalResponses: total,
      distribution: Array.from({ length: 11 }, (_, i) => ({
        score: i,
        count: Math.floor(Math.random() * 20) + 5
      })),
      categories: [
        { name: 'Качество продукта', score: Math.floor(Math.random() * 40) + 50, responses: Math.floor(Math.random() * 100) + 50 },
        { name: 'Обслуживание клиентов', score: Math.floor(Math.random() * 35) + 55, responses: Math.floor(Math.random() * 90) + 45 },
        { name: 'Доставка', score: Math.floor(Math.random() * 30) + 60, responses: Math.floor(Math.random() * 80) + 40 },
        { name: 'Цена-качество', score: Math.floor(Math.random() * 25) + 45, responses: Math.floor(Math.random() * 70) + 35 }
      ],
      reviews: [
        { customerName: 'Алексей Иванов', score: 9, comment: 'Отличный сервис! Все работает быстро и понятно. Рекомендую всем коллегам.', category: 'Качество продукта', date: new Date(), sentiment: 'positive' },
        { customerName: 'Мария Петрова', score: 8, comment: 'Очень довольна покупкой. Доставка была быстрой, товар соответствует описанию.', category: 'Обслуживание клиентов', date: new Date(), sentiment: 'positive' },
        { customerName: 'Дмитрий Смирнов', score: 6, comment: 'В целом неплохо, но есть куда расти. Хотелось бы больше функций.', category: 'Доставка', date: new Date(), sentiment: 'neutral' },
        { customerName: 'Елена Козлова', score: 4, comment: 'Ожидал большего за такую цену. Качество не соответствует заявленному.', category: 'Цена-качество', date: new Date(), sentiment: 'negative' },
        { customerName: 'Игорь Волков', score: 10, comment: 'Превосходно! Лучшее решение на рынке. Пользуюсь уже полгода, все отлично.', category: 'Качество продукта', date: new Date(), sentiment: 'positive' },
        { customerName: 'Анна Соколова', score: 7, comment: 'Хороший продукт, но служба поддержки отвечает медленно.', category: 'Обслуживание клиентов', date: new Date(), sentiment: 'neutral' },
        { customerName: 'Сергей Морозов', score: 3, comment: 'Разочарован. Много багов, интерфейс неудобный.', category: 'Качество продукта', date: new Date(), sentiment: 'negative' },
        { customerName: 'Ольга Новикова', score: 9, comment: 'Замечательный опыт использования! Интуитивно понятный интерфейс.', category: 'Качество продукта', date: new Date(), sentiment: 'positive' }
      ]
    })
  }

  await NPS.deleteMany({})
  await NPS.insertMany(npsData)
  console.log('Данные NPS созданы')
}

const seedWebsite = async () => {
  const websiteData = []

  for (let i = 0; i < 30; i++) {
    websiteData.push({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
      traffic: {
        visitors: Math.floor(Math.random() * 5000) + 2000,
        pageViews: Math.floor(Math.random() * 15000) + 8000,
        sessions: Math.floor(Math.random() * 6000) + 3000,
        bounceRate: (Math.random() * 30 + 40).toFixed(1),
        avgSessionDuration: Math.floor(Math.random() * 300) + 120
      },
      sources: [
        { name: 'Органический поиск', visitors: Math.floor(Math.random() * 2000) + 1000, percentage: 45 },
        { name: 'Прямые заходы', visitors: Math.floor(Math.random() * 1500) + 700, percentage: 30 },
        { name: 'Социальные сети', visitors: Math.floor(Math.random() * 800) + 400, percentage: 15 },
        { name: 'Рефералы', visitors: Math.floor(Math.random() * 500) + 200, percentage: 10 }
      ],
      devices: [
        { type: 'Компьютер', visitors: Math.floor(Math.random() * 2500) + 1200, percentage: 55 },
        { type: 'Мобильный', visitors: Math.floor(Math.random() * 1800) + 900, percentage: 35 },
        { type: 'Планшет', visitors: Math.floor(Math.random() * 500) + 200, percentage: 10 }
      ],
      popularPages: [
        { path: '/products', views: Math.floor(Math.random() * 3000) + 1500, avgTime: Math.floor(Math.random() * 180) + 60, bounceRate: (Math.random() * 20 + 30).toFixed(1) },
        { path: '/about', views: Math.floor(Math.random() * 2000) + 1000, avgTime: Math.floor(Math.random() * 150) + 50, bounceRate: (Math.random() * 25 + 35).toFixed(1) },
        { path: '/contact', views: Math.floor(Math.random() * 1500) + 800, avgTime: Math.floor(Math.random() * 120) + 40, bounceRate: (Math.random() * 30 + 40).toFixed(1) },
        { path: '/blog', views: Math.floor(Math.random() * 1200) + 600, avgTime: Math.floor(Math.random() * 200) + 80, bounceRate: (Math.random() * 15 + 25).toFixed(1) }
      ],
      behavior: {
        avgPagesPerSession: (Math.random() * 3 + 2).toFixed(1),
        avgTimeOnPage: Math.floor(Math.random() * 150) + 60,
        exitRate: (Math.random() * 20 + 30).toFixed(1)
      }
    })
  }

  await Website.deleteMany({})
  await Website.insertMany(websiteData)
  console.log('Данные сайта созданы')
}

const seedAll = async () => {
  try {
    await connectDB()
    console.log('Начало заполнения базы данных...\n')

    await seedUsers()
    await seedDashboard()
    await seedAnalytics()
    await seedNPS()
    await seedWebsite()

    console.log('\nЗаполнение базы данных завершено успешно')
    process.exit(0)
  } catch (error) {
    console.error('Ошибка заполнения:', error)
    process.exit(1)
  }
}

seedAll()
