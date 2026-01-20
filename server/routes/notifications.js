import express from 'express'
import { authenticate } from '../middleware/auth.js'
import { notifyUser, subscribeToPush, unsubscribeFromPush } from '../services/notificationService.js'
import { sendTestReport } from '../services/scheduler.js'

const router = express.Router()

router.post('/subscribe', authenticate, async (req, res) => {
  try {
    const { subscription } = req.body
    subscribeToPush(req.user.id, subscription)
    res.json({ success: true, message: 'Подписка оформлена' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post('/unsubscribe', authenticate, async (req, res) => {
  try {
    unsubscribeFromPush(req.user.id)
    res.json({ success: true, message: 'Подписка отменена' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post('/test-email', authenticate, async (req, res) => {
  try {
    const result = await sendTestReport(req.user.id)
    res.json({ success: result.success, message: 'Тестовый email отправлен' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post('/send', authenticate, async (req, res) => {
  try {
    const { title, message, type } = req.body
    const result = await notifyUser(req.user, { title, message, type })
    res.json({ success: true, result })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
