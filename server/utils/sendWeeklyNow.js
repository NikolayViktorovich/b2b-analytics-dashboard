import 'dotenv/config'
import { connectDB } from '../config/database.js'
import User from '../models/User.js'
import Dashboard from '../models/Dashboard.js'
import NPS from '../models/NPS.js'
import { sendWeeklyReport } from '../services/emailService.js'

const sendWeeklyNow = async () => {
  try {
    await connectDB()
    console.log('\n=== ОТПРАВКА ЕЖЕНЕДЕЛЬНЫХ ОТЧЕТОВ ===\n')

    // Получаем всех активных пользователей
    const users = await User.find({ isActive: true })
    
    if (users.length === 0) {
      console.log('❌ Нет активных пользователей в базе данных')
      console.log('   Запустите: npm run seed\n')
      process.exit(0)
    }

    console.log(`Найдено пользователей: ${users.length}\n`)

    // Получаем данные для отчета
    console.log('Загрузка данных для отчета...')
    const [dashboardData, npsData] = await Promise.all([
      Dashboard.findOne(),
      NPS.findOne().sort({ createdAt: -1 })
    ])

    const reportData = {
      revenue: dashboardData?.stats?.revenue?.value || 0,
      revenueChange: dashboardData?.stats?.revenue?.change || 0,
      orders: dashboardData?.stats?.orders?.value || 0,
      ordersChange: dashboardData?.stats?.orders?.change || 0,
      conversion: dashboardData?.stats?.conversion?.value || 0,
      conversionChange: dashboardData?.stats?.conversion?.change || 0,
      nps: npsData?.score || 0
    }

    console.log('\nДанные отчета:')
    console.log(`  Выручка: ${reportData.revenue.toLocaleString('ru')} (${reportData.revenueChange > 0 ? '+' : ''}${reportData.revenueChange}%)`)
    console.log(`  Заказы: ${reportData.orders} (${reportData.ordersChange > 0 ? '+' : ''}${reportData.ordersChange}%)`)
    console.log(`  Конверсия: ${reportData.conversion}% (${reportData.conversionChange > 0 ? '+' : ''}${reportData.conversionChange}%)`)
    console.log(`  NPS: ${reportData.nps}`)
    console.log('')

    // Показываем список получателей
    console.log('Получатели:')
    users.forEach((user, index) => {
      console.log(`  ${index + 1}. ${user.name} (${user.email}) - ${user.role}`)
    })
    console.log('')

    // Отправляем отчеты
    console.log('Отправка отчетов...\n')
    
    const results = []
    for (const user of users) {
      console.log(`Отправка для ${user.email}...`)
      
      const result = await sendWeeklyReport(user, reportData)
      
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

sendWeeklyNow()
