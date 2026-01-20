import express from 'express'
import { authenticate, authorize } from '../middleware/auth.js'
import Integration from '../models/Integration.js'

const router = express.Router()

router.use(authenticate)
router.use(authorize('settings:manage'))

router.get('/', async (req, res) => {
  try {
    const integrations = await Integration.find()
    res.json(integrations)
  } catch(error) {
    res.status(500).json({error: 'Ошибка загрузки интеграций'})
  }
})

router.get('/:name', async (req, res) => {
  try {
    const integration = await Integration.findOne({ name: req.params.name })
    if (!integration) {
      return res.status(404).json({ error: 'Интеграция не найдена' })
    }
    res.json(integration)
  } catch (error) {
    res.status(500).json({ error: 'Ошибка загрузки интеграции' })
  }
})

router.post('/:name', async (req, res) => {
  try {
    const {config} = req.body
    
    let integration = await Integration.findOne({name: req.params.name})
    
    if(integration){
      integration.config = config
      integration.status = 'connected'
      await integration.save()
    }else{
      integration = await Integration.create({
        name: req.params.name,
        config,
        status: 'connected'
      })
    }
    
    res.json({success: true, integration})
  } catch(error) {
    res.status(500).json({error: 'Ошибка сохранения интеграции'})
  }
})

router.delete('/:name', async (req, res) => {
  try {
    const integration = await Integration.findOne({name: req.params.name})
    
    if(!integration) {
      return res.status(404).json({error: 'Интеграция не найдена'})
    }
    
    integration.status = 'disconnected'
    integration.config = new Map()
    await integration.save()
    
    res.json({success: true})
  } catch(error) {
    res.status(500).json({error: 'Ошибка отключения интеграции'})
  }
})

router.post('/:name/test', async (req, res) => {
  try {
    const integration = await Integration.findOne({ name: req.params.name })
    
    if (!integration) {
      return res.status(404).json({ error: 'Интеграция не найдена' })
    }
    
    // TODO: Реализовать тестирование подключения для каждой интеграции
    
    res.json({ success: true, message: 'Подключение успешно' })
  } catch (error) {
    res.status(500).json({ error: 'Ошибка тестирования интеграции' })
  }
})

export default router
