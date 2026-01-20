import express from 'express'
import Website from '../models/Website.js'
import { authenticate, authorize } from '../middleware/auth.js'

const router = express.Router()

router.use(authenticate)
router.use(authorize('website:view'))

router.get('/', async (req, res) => {
  try {
    const { startDate, endDate } = req.query
    const query = {}
    
    if (startDate || endDate) {
      query.date = {}
      if (startDate) query.date.$gte = new Date(startDate)
      if (endDate) query.date.$lte = new Date(endDate)
    }

    const websiteData = await Website.find(query).sort({ date: -1 }).limit(30).lean()
    res.json(websiteData)
  } catch {
    res.status(500).json({ error: 'Ошибка загрузки данных сайта' })
  }
})

router.get('/traffic', async (req, res) => {
  try {
    const data = await Website.find().sort({ date: -1 }).limit(30).select('date traffic').lean()
    res.json(data)
  } catch {
    res.status(500).json({ error: 'Ошибка загрузки трафика' })
  }
})

router.get('/sources', async (req, res) => {
  try {
    const latest = await Website.findOne().sort({ date: -1 }).select('sources').lean()
    res.json(latest?.sources || [])
  } catch {
    res.status(500).json({ error: 'Ошибка загрузки источников' })
  }
})

router.get('/devices', async (req, res) => {
  try {
    const latest = await Website.findOne().sort({ date: -1 }).select('devices').lean()
    res.json(latest?.devices || [])
  } catch {
    res.status(500).json({ error: 'Ошибка загрузки устройств' })
  }
})

router.get('/pages', async (req, res) => {
  try {
    const latest = await Website.findOne().sort({ date: -1 }).select('popularPages').lean()
    res.json(latest?.popularPages || [])
  } catch {
    res.status(500).json({ error: 'Ошибка загрузки страниц' })
  }
})

export default router
