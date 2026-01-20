import express from 'express'
import Analytics from '../models/Analytics.js'
import { authenticate, authorize } from '../middleware/auth.js'

const router = express.Router()

router.use(authenticate)
router.use(authorize('analytics:view'))

router.get('/', async (req, res) => {
  try {
    const { startDate, endDate, period = 'daily' } = req.query
    const query = { period }
    
    if (startDate || endDate) {
      query.date = {}
      if (startDate) query.date.$gte = new Date(startDate)
      if (endDate) query.date.$lte = new Date(endDate)
    }

    const analytics = await Analytics.find(query).sort({ date: -1 }).limit(30).lean()
    res.json(analytics)
  } catch {
    res.status(500).json({ error: 'Ошибка загрузки аналитики' })
  }
})

router.get('/revenue', async (req, res) => {
  try {
    const analytics = await Analytics.find().sort({ date: -1 }).limit(30).select('date revenue').lean()
    res.json(analytics)
  } catch {
    res.status(500).json({ error: 'Ошибка загрузки выручки' })
  }
})

router.get('/products', async (req, res) => {
  try {
    const latest = await Analytics.findOne().sort({ date: -1 }).select('products').lean()
    res.json(latest?.products || [])
  } catch {
    res.status(500).json({ error: 'Ошибка загрузки товаров' })
  }
})

router.get('/categories', async (req, res) => {
  try {
    const latest = await Analytics.findOne().sort({ date: -1 }).select('categories').lean()
    res.json(latest?.categories || [])
  } catch {
    res.status(500).json({ error: 'Ошибка загрузки категорий' })
  }
})

router.get('/geography', async (req, res) => {
  try {
    const latest = await Analytics.findOne().sort({ date: -1 }).select('geography').lean()
    res.json(latest?.geography || [])
  } catch {
    res.status(500).json({ error: 'Ошибка загрузки географии' })
  }
})

router.get('/funnel', async (req, res) => {
  try {
    const latest = await Analytics.findOne().sort({ date: -1 }).select('funnel').lean()
    res.json(latest?.funnel || [])
  } catch {
    res.status(500).json({ error: 'Ошибка загрузки воронки' })
  }
})

router.get('/rfm', async (req, res) => {
  try {
    const latest = await Analytics.findOne().sort({ date: -1 }).select('rfmSegments').lean()
    res.json(latest?.rfmSegments || [])
  } catch {
    res.status(500).json({ error: 'Ошибка загрузки RFM' })
  }
})

export default router
