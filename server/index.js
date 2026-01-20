import 'dotenv/config'
import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import { connectDB } from './config/database.js'

import authRoutes from './routes/auth.js'
import userRoutes from './routes/users.js'
import dashboardRoutes from './routes/dashboard.js'
import analyticsRoutes from './routes/analytics.js'
import npsRoutes from './routes/nps.js'
import websiteRoutes from './routes/website.js'
import systemRoutes from './routes/system.js'
import notificationRoutes from './routes/notifications.js'
import integrationRoutes from './routes/integrations.js'

import { authenticate } from './middleware/auth.js'
import { startScheduler } from './services/scheduler.js'

const app = express()
const server = createServer(app)
const io = new Server(server, {
  cors: { 
    origin: process.env.CLIENT_URL || '*',
    credentials: true
  }
})

app.use(cors({ origin: process.env.CLIENT_URL || '*', credentials: true }))
app.use(express.json())

connectDB()

app.use((req, res, next) => {
  req.io = io
  next()
})

app.get('/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }))

app.use('/auth', authRoutes)
app.use('/users', userRoutes)
app.use('/dashboard', dashboardRoutes)
app.use('/analytics', analyticsRoutes)
app.use('/nps', npsRoutes)
app.use('/website', websiteRoutes)
app.use('/system', systemRoutes)
app.use('/notifications', notificationRoutes)
app.use('/integrations', integrationRoutes)

app.use((err, req, res, next) => {
  res.status(500).json({ 
    error: 'Внутренняя ошибка сервера',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  })
})

io.use(async (socket, next) => {
  const token = socket.handshake.auth.token
  if (!token) return next(new Error('Токен отсутствует'))

  try {
    const req = { headers: { authorization: `Bearer ${token}` } }
    await authenticate(req, {}, () => {
      socket.user = req.user
      next()
    })
  } catch {
    next(new Error('Ошибка авторизации'))
  }
})

io.on('connection', (socket) => {
  socket.on('disconnect', () => {})
  socket.on('error', (err) => {})
})

const PORT = process.env.PORT || 3001

server.listen(PORT, () => {
  startScheduler()
})

process.on('unhandledRejection', (err) => {
  server.close(() => process.exit(1))
})
