import express from 'express'
import { body } from 'express-validator'
import User from '../models/User.js'
import { authenticate, authorize } from '../middleware/auth.js'
import { validate } from '../middleware/validation.js'

const router = express.Router()

router.use(authenticate)

router.post('/', authorize('users:manage'), 
  body('email').isEmail(),
  body('name').notEmpty(),
  body('role').isIn(['admin', 'manager', 'viewer']),
  validate,
  async (req, res) => {
    try {
      const {email, name, role} = req.body
      
      const existing = await User.findOne({email})
      if(existing){
        return res.status(400).json({error: 'Пользователь с таким email уже существует'})
      }
      
      const accessCode = role.substring(0, 3).toUpperCase() + '-' + Math.random().toString(36).substring(2, 10).toUpperCase()
      
      const user = await User.create({
        email,
        name,
        role,
        accessCode,
        createdBy: req.user._id
      })
      
      res.json({
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        accessCode: user.accessCode,
        isActive: user.isActive,
        createdAt: user.createdAt,
        permissions: user.getPermissions()
      })
    } catch(error) {
      res.status(500).json({error: 'Ошибка создания пользователя'})
    }
  }
)

router.get('/', authorize('users:view'), async (req, res) => {
  try {
    const users = await User.find().select('-__v').sort({ createdAt: -1 })
    const isAdmin = req.user.role === 'admin'
    
    res.json(users.map(u => ({
      id: u._id,
      email: u.email,
      name: u.name,
      avatar: u.avatar,
      role: u.role,
      isActive: u.isActive,
      lastLogin: u.lastLogin,
      createdAt: u.createdAt,
      permissions: u.getPermissions(),
      ...(isAdmin && { accessCode: u.accessCode })
    })))
  } catch {
    res.status(500).json({ error: 'Ошибка загрузки пользователей' })
  }
})

router.patch('/:id/role', authorize('roles:manage'), body('role').isIn(['admin', 'manager', 'viewer']), validate, async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ error: 'Пользователь не найден' })

    user.role = req.body.role
    await user.save()

    const update = {
      userId: user._id,
      role: user.role,
      permissions: user.getPermissions(),
      updatedBy: req.user._id,
      timestamp: Date.now()
    }

    req.io.emit('role:update', update)

    res.json({ 
      success: true,
      user: { id: user._id, role: user.role, permissions: user.getPermissions() }
    })
  } catch {
    res.status(500).json({ error: 'Ошибка обновления роли' })
  }
})

router.patch('/:id/status', authorize('users:manage'), body('isActive').isBoolean(), validate, async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ error: 'Пользователь не найден' })

    user.isActive = req.body.isActive
    await user.save()

    res.json({ success: true })
  } catch {
    res.status(500).json({ error: 'Ошибка обновления статуса' })
  }
})

router.patch('/:id', authenticate, async (req, res) => {
  try {
    const { name, role, isActive, notifications } = req.body
    const update = {}
    
    if (name) update.name = name
    if (role) {
      if (!['admin', 'manager', 'viewer'].includes(role)) {
        return res.status(400).json({ error: 'Неверная роль' })
      }
      update.role = role
    }
    if (isActive !== undefined) update.isActive = isActive
    if (notifications) update.notifications = notifications

    const user = await User.findByIdAndUpdate(req.params.id, update, { new: true })
    if (!user) return res.status(404).json({ error: 'Пользователь не найден' })

    res.json(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get('/:id/notifications', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ error: 'Пользователь не найден' })
    res.json(user.notifications || {})
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.patch('/:id/notifications', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ error: 'Пользователь не найден' })

    user.notifications = { ...user.notifications, ...req.body }
    await user.save()

    res.json(user.notifications)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.delete('/:id', authorize('users:manage'), async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ error: 'Пользователь не найден' })
    
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ error: 'Нельзя удалить самого себя' })
    }

    await User.findByIdAndDelete(req.params.id)
    res.json({ success: true })
  } catch {
    res.status(500).json({ error: 'Ошибка удаления пользователя' })
  }
})

export default router
