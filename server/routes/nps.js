import express from 'express'
import NPS from '../models/NPS.js'
import { authenticate, authorize } from '../middleware/auth.js'

const router = express.Router()

router.use(authenticate)
router.use(authorize('nps:view'))

router.get('/', async (req, res) => {
  try {
    const { startDate, endDate } = req.query
    const query = {}
    
    if (startDate || endDate) {
      query.date = {}
      if (startDate) query.date.$gte = new Date(startDate)
      if (endDate) query.date.$lte = new Date(endDate)
    }

    const npsData = await NPS.find(query).sort({ date: -1 }).limit(30).lean()
    res.json(npsData)
  } catch {
    res.status(500).json({ error: 'Ошибка загрузки NPS' })
  }
})

router.get('/current', async (req, res) => {
  try {
    const current = await NPS.findOne().sort({ date: -1 }).lean()
    res.json(current || {})
  } catch {
    res.status(500).json({ error: 'Ошибка загрузки текущего NPS' })
  }
})

router.get('/trend', async (req, res) => {
  try {
    const trend = await NPS.find().sort({ date: -1 }).limit(12).select('date score').lean()
    res.json(trend)
  } catch {
    res.status(500).json({ error: 'Ошибка загрузки тренда' })
  }
})

router.get('/reviews', async (req, res) => {
  try {
    const { limit = 10, category } = req.query
    const query = category ? { 'reviews.category': category } : {}

    const nps = await NPS.findOne(query).sort({ date: -1 }).select('reviews').lean()
    const reviews = nps?.reviews || []
    res.json(reviews.slice(0, parseInt(limit)))
  } catch {
    res.status(500).json({ error: 'Ошибка загрузки отзывов' })
  }
})

export default router
