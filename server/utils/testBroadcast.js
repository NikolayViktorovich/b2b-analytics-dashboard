import 'dotenv/config'
import { connectDB } from '../config/database.js'
import User from '../models/User.js'
import { sendNotification } from '../services/emailService.js'

const testBroadcast = async () => {
  try {
    await connectDB()
    console.log('\n=== ТЕСТОВАЯ РАССЫЛКА ===\n')

    // Получаем всех активных пользователей
    const users = await User.find({ isActive: true })
    
    if (users.length === 0) {
      console.log('❌ Нет активных пользователей в базе данных')
      console.log('   Запустите: npm run seed\n')
      process.exit(0)
    }

    console.log(`Найдено пользователей: ${users.length}\n`)
    
    // Показываем список получателей
    console.log('Получатели:')
    users.forEach((user, index) => {
      console.log(`  ${index + 1}. ${user.name} (${user.email}) - ${user.role}`)
    })
    console.log('')

    // Отправляем тестовое уведомление каждому
    console.log('Отправка писем...\n')
    
    const results = []
    for (const user of users) {
      console.log(`Отправка для ${user.email}...`)
      
      const result = await sendNotification(user, {
        title: 'Тестовое письмо',
        message: `Привет, ${user.name}! Это тестовое письмо от системы Reddix Analytics. Если вы получили это письмо, значит email уведомления настроены правильно.`,
        type: 'info'
      })
      
      results.push({
        user: user.email,
        success: result.success,
        error: result.error
      })
      
      if (result.success) {
        console.log(`  ✅ Отправлено`)
      } else {
        console.log(`  ❌ Ошибка: ${result.error || result.message}`)
      }
    }

    // Итоги
    console.log('\n=== ИТОГИ ===\n')
    const successful = results.filter(r => r.success).length
    const failed = results.filter(r => !r.success).length
    
    console.log(`Успешно отправлено: ${successful}`)
    console.log(`Ошибок: ${failed}`)
    
    if (failed > 0) {
      console.log('\nНе удалось отправить:')
      results.filter(r => !r.success).forEach(r => {
        console.log(`  - ${r.user}: ${r.error}`)
      })
    }
    
    console.log('\n📧 Проверьте почту всех пользователей (включая папку Спам)\n')
    
    process.exit(0)
  } catch (error) {
    console.error('\n❌ Ошибка:', error.message)
    
    if (error.message.includes('Email не настроен')) {
      console.log('\n💡 Настройте SMTP в server/.env:')
      console.log('   SMTP_HOST=smtp.mail.ru')
      console.log('   SMTP_PORT=465')
      console.log('   SMTP_SECURE=true')
      console.log('   SMTP_USER=ваш-email@mail.ru')
      console.log('   SMTP_PASS=ваш-пароль\n')
    }
    
    process.exit(1)
  }
}

testBroadcast()
