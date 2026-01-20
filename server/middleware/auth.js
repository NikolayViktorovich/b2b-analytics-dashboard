import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '')
  if(!token) return res.status(401).json({error: 'Токен отсутствует'})

  try{
    const {userId} = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(userId)

    if(!user?.isActive) return res.status(401).json({error: 'Пользователь неактивен'})

    req.user = user
    next()
  }catch{
    res.status(401).json({error: 'Неверный токен'})
  }
}

export const authorize = (...permissions) => (req, res, next) => {
  const userPerms = req.user.getPermissions()
  const hasAccess = permissions.some(p => userPerms.includes(p))

  if(!hasAccess) return res.status(403).json({error: 'Доступ запрещен'})
  next()
}
