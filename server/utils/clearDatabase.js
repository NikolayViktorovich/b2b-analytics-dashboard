import 'dotenv/config'
import { connectDB } from '../config/database.js'
import mongoose from 'mongoose'
import readline from 'readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const question = (query) => new Promise((resolve) => rl.question(query, resolve))

const clearDatabase = async () => {
  try {
    await connectDB()
    
    console.log('ВНИМАНИЕ: Это удалит ВСЕ данные из базы данных')
    console.log(`База данных: ${mongoose.connection.db.databaseName}`)
    console.log(`Хост: ${mongoose.connection.host}\n`)
    
    const answer = await question('Вы уверены, что хотите продолжить? (yes/no): ')
    
    if (answer.toLowerCase() !== 'yes') {
      console.log('Операция отменена')
      process.exit(0)
    }

    const collections = await mongoose.connection.db.listCollections().toArray()
    
    console.log('\nОчистка коллекций...\n')
    
    for (const collection of collections) {
      const result = await mongoose.connection.db.collection(collection.name).deleteMany({})
      console.log(`  ${collection.name}: ${result.deletedCount} документов удалено`)
    }

    console.log('\nБаза данных очищена успешно')
    console.log('\nЗапустите "npm run seed" для заполнения тестовыми данными')
    
    await mongoose.connection.close()
    process.exit(0)
  } catch (error) {
    console.error('\nОшибка очистки базы данных:', error.message)
    process.exit(1)
  } finally {
    rl.close()
  }
}

clearDatabase()
