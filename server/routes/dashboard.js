import express from 'express'
import Dashboard from '../models/Dashboard.js'
import { authenticate, authorize } from '../middleware/auth.js'

const router = express.Router()

router.use(authenticate)
router.use(authorize('dashboard:view'))

router.get('/', async (req, res) => {
  try {
    const period = req.query.period || 'today'
    const dashboard = await Dashboard.findOne({ period }).sort({ date: -1 }).lean()
    res.json(dashboard || generateMockDashboard(period))
  } catch {
    res.status(500).json({ error: 'Ошибка загрузки дашборда' })
  }
})

router.get('/stats', async (req, res) => {
  try {
    const period = req.query.period || 'today'
    const dashboard = await Dashboard.findOne({ period }).sort({ date: -1 }).select('stats').lean()
    res.json(dashboard?.stats || {})
  } catch {
    res.status(500).json({ error: 'Ошибка загрузки статистики' })
  }
})

const generateMockDashboard = (period) => ({
  period,
  date: new Date(),
  stats: {
    revenue: { value: 45231, change: 12.5, trend: 'up' },
    orders: { value: 1234, change: 8.2, trend: 'up' },
    customers: { value: 8234, change: -3.1, trend: 'down' },
    conversion: { value: 3.24, change: 5.7, trend: 'up' }
  },
  revenueChart: Array.from({ length: 7 }, (_, i) => ({
    date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    revenue: Math.floor(Math.random() * 10000) + 5000,
    orders: Math.floor(Math.random() * 200) + 100
  })),
  topProducts: [
    { name: 'Product A', sales: 234, revenue: 12450, growth: 12.5 },
    { name: 'Product B', sales: 189, revenue: 9876, growth: -3.2 },
    { name: 'Product C', sales: 156, revenue: 8234, growth: 8.7 }
  ],
  trafficSources: [
    { source: 'Органический поиск', value: 45, change: 5.2 },
    { source: 'Прямые заходы', value: 30, change: -2.1 },
    { source: 'Социальные сети', value: 15, change: 12.3 },
    { source: 'Рефералы', value: 10, change: 3.4 }
  ]
})

export default router
