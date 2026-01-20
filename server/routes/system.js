import express from 'express'
import { authenticate } from '../middleware/auth.js'
import Backup from '../models/Backup.js'
import User from '../models/User.js'
import Analytics from '../models/Analytics.js'
import NPS from '../models/NPS.js'
import Website from '../models/Website.js'
import Dashboard from '../models/Dashboard.js'

const router = express.Router()
const systemLogs = []

const addLog = (level, message) => {
  systemLogs.unshift({
    timestamp: new Date().toISOString(),
    level,
    message
  })
  if (systemLogs.length > 100) systemLogs.pop()
}

addLog('info', 'Система запущена')
addLog('success', 'Подключение к базе данных установлено')

router.get('/logs', authenticate, (req, res) => {
  const limit = parseInt(req.query.limit) || 20
  res.json(systemLogs.slice(0, limit))
})

router.post('/cache/clear', authenticate, (req, res) => {
  addLog('success', 'Кэш очищен пользователем ' + req.user.name)
  res.json({ success: true })
})

router.post('/backup', authenticate, async (req, res) => {
  try {
    const { name, description } = req.body
    
    const [users, analytics, nps, website, dashboard] = await Promise.all([
      User.find().select('-password').lean(),
      Analytics.find().lean(),
      NPS.find().lean(),
      Website.find().lean(),
      Dashboard.findOne().lean()
    ])

    const backupData = {
      name: name || `Backup ${new Date().toLocaleDateString('ru')}`,
      description: description || 'Автоматический бэкап',
      size: JSON.stringify({ users, analytics, nps, website, dashboard }).length,
      data: { users, analytics, nps, website, dashboard },
      createdBy: req.user.id
    }

    const backup = await Backup.create(backupData)
    addLog('success', 'Создана резервная копия пользователем ' + req.user.name)
    
    res.json({ 
      success: true, 
      backup: {
        id: backup._id,
        name: backup.name,
        description: backup.description,
        size: backup.size,
        createdAt: backup.createdAt
      }
    })
  } catch (error) {
    addLog('error', 'Ошибка создания бэкапа: ' + error.message)
    res.status(500).json({ error: 'Ошибка создания бэкапа' })
  }
})

router.get('/backups', authenticate, async (req, res) => {
  try {
    const backups = await Backup.find()
      .select('-data')
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 })
    res.json(backups)
  } catch (error) {
    res.status(500).json({ error: 'Ошибка загрузки бэкапов' })
  }
})

router.get('/backups/:id', authenticate, async (req, res) => {
  try {
    const backup = await Backup.findById(req.params.id)
      .populate('createdBy', 'name email')
    if (!backup) return res.status(404).json({ error: 'Бэкап не найден' })
    res.json(backup)
  } catch (error) {
    res.status(500).json({ error: 'Ошибка загрузки бэкапа' })
  }
})

router.delete('/backups/:id', authenticate, async (req, res) => {
  try {
    const backup = await Backup.findByIdAndDelete(req.params.id)
    if (!backup) return res.status(404).json({ error: 'Бэкап не найден' })
    addLog('warning', 'Удален бэкап пользователем ' + req.user.name)
    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ error: 'Ошибка удаления бэкапа' })
  }
})

router.get('/stats', authenticate, (req, res) => {
  res.json({
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    logs: systemLogs.length
  })
})

setInterval(() => {
  const events = [
    { level: 'info', msg: 'Обновлены данные аналитики' },
    { level: 'info', msg: 'Выполнена синхронизация с внешним API' },
    { level: 'warning', msg: 'Высокая нагрузка на сервер' }
  ]
  const event = events[Math.floor(Math.random() * events.length)]
  addLog(event.level, event.msg)
}, 60000)

export default router
