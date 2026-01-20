import 'dotenv/config'
import { connectDB } from '../config/database.js'
import User from '../models/User.js'

const migrateUsers = async () => {
  try {
    await connectDB()
    console.log('Подключено к базе данных')

    const users = await User.find({ accessCode: { $exists: false } })
    
    if (users.length === 0) {
      console.log('Нет пользователей для миграции')
      process.exit(0)
    }

    console.log(`Найдено ${users.length} пользователей без кодов доступа`)

    for (const user of users) {
      const prefix = user.role.substring(0, 3).toUpperCase()
      const code = prefix + '-' + Math.random().toString(36).substring(2, 10).toUpperCase()
      
      user.accessCode = code
      await user.save()
      
      console.log(`[OK] ${user.email} - Код: ${code}`)
    }

    console.log('\n[OK] Миграция завершена!')
    process.exit(0)
  } catch (error) {
    console.error('Ошибка миграции:', error)
    process.exit(1)
  }
}

migrateUsers()
