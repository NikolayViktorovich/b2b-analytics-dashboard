import 'dotenv/config'
import mongoose from 'mongoose'

const checkConnection = async () => {
  try {
    console.log('Проверка подключения к MongoDB...')
    console.log(`URI: ${process.env.MONGODB_URI}\n`)

    await mongoose.connect(process.env.MONGODB_URI)
    
    console.log('Подключение к MongoDB успешно')
    console.log(`База данных: ${mongoose.connection.db.databaseName}`)
    console.log(`Хост: ${mongoose.connection.host}`)
    console.log(`Порт: ${mongoose.connection.port}`)
    
    const collections = await mongoose.connection.db.listCollections().toArray()
    console.log(`\nКоллекции (${collections.length}):`)
    collections.forEach(col => {
      console.log(`  - ${col.name}`)
    })

    await mongoose.connection.close()
    console.log('\nСоединение закрыто успешно')
    process.exit(0)
  } catch (error) {
    console.error('\nОшибка подключения к MongoDB')
    console.error(`Ошибка: ${error.message}`)
    
    if (error.message.includes('ECONNREFUSED')) {
      console.log('\nРекомендации:')
      console.log('  1. Убедитесь, что MongoDB запущен')
      console.log('  2. Проверьте правильность порта (по умолчанию: 27017)')
      console.log('  3. Проверьте MONGODB_URI в файле .env')
    }
    
    process.exit(1)
  }
}

checkConnection()
