import bcrypt from 'bcryptjs'

const testPassword = async () => {
  const password = 'admin123'
  const hash = await bcrypt.hash(password, 10)
  console.log('Оригинал:', password)
  console.log('Хеш:', hash)
  
  const isMatch = await bcrypt.compare(password, hash)
  console.log('Совпадение:', isMatch)
}

testPassword()
