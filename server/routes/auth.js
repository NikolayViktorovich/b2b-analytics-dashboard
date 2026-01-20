import express from 'express'
import jwt from 'jsonwebtoken'
import { body } from 'express-validator'
import User from '../models/User.js'
import { validate } from '../middleware/validation.js'

const router = express.Router()

router.post('/login', 
  body('email').isEmail(),
  body('password').notEmpty(),
  validate,
  async (req, res) => {
    try {
      const {email, password} = req.body

      const user = await User.findOne({email}).select('+password')
      
      if(!user || !user.password){
        return res.status(401).json({error: 'Неверные учетные данные'})
      }

      const isMatch = await user.comparePassword(password)
      
      if(!isMatch){
        return res.status(401).json({error: 'Неверные учетные данные'})
      }

      if(!user.isActive){
        return res.status(403).json({error: 'Аккаунт деактивирован'})
      }

      user.lastLogin = new Date()
      await user.save()

      const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'})

      res.json({
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          avatar: user.avatar,
          role: user.role,
          permissions: user.getPermissions()
        },
        token
      })
    } catch(error) {
      res.status(500).json({error: 'Ошибка входа'})
    }
  }
)

const parseGoogleToken = (credential) => {
  try {
    const [, payload] = credential.split('.')
    const decoded = JSON.parse(Buffer.from(payload, 'base64').toString())
    return {
      googleId: decoded.sub,
      email: decoded.email,
      name: decoded.name,
      avatar: decoded.picture
    }
  } catch {
    return null
  }
}

router.post('/google', body('credential').notEmpty(), validate, async (req, res) => {
  try {
    const {credential} = req.body

    const googleData = parseGoogleToken(credential)
    if(!googleData) return res.status(401).json({error: 'Неверный токен'})

    let user = await User.findOne({email: googleData.email})

    if(user){
      Object.assign(user, { 
        googleId: googleData.googleId,
        name: googleData.name,
        avatar: googleData.avatar,
        lastLogin: new Date() 
      })
      await user.save()
    }else{
      const accessCode = 'VIEW-' + Math.random().toString(36).substring(2, 10).toUpperCase()
      
      user = await User.create({
        googleId: googleData.googleId,
        email: googleData.email,
        name: googleData.name,
        avatar: googleData.avatar,
        role: 'viewer',
        accessCode,
        lastLogin: new Date()
      })
    }

    if(!user.isActive){
      return res.status(403).json({error: 'Аккаунт деактивирован'})
    }

    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'})

    res.json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        role: user.role,
        permissions: user.getPermissions()
      },
      token
    })
  } catch(error) {
    res.status(500).json({error: 'Ошибка авторизации'})
  }
})

export default router
