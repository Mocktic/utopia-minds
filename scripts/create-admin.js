import { MongoClient } from 'mongodb'
import bcrypt from 'bcryptjs'
import readline from 'readline'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function question(query) {
  return new Promise(resolve => rl.question(query, resolve))
}

async function createAdminUser() {
  try {
    console.log('🚀 Utopia Minds - Admin User Creation Script')
    console.log('============================================\n')

    // Get MongoDB URI from environment or prompt
    const mongoUri = process.env.MONGODB_URI || await question('Enter MongoDB URI: ')
    
    if (!mongoUri) {
      console.error('❌ MongoDB URI is required')
      process.exit(1)
    }

    // Get admin user details
    const name = await question('Enter admin name: ')
    const email = await question('Enter admin email: ')
    const password = await question('Enter admin password: ')

    if (!name || !email || !password) {
      console.error('❌ All fields are required')
      process.exit(1)
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      console.error('❌ Invalid email format')
      process.exit(1)
    }

    // Validate password strength
    if (password.length < 8) {
      console.error('❌ Password must be at least 8 characters long')
      process.exit(1)
    }

    console.log('\n⏳ Connecting to MongoDB...')
    
    // Connect to MongoDB
    const client = new MongoClient(mongoUri)
    await client.connect()
    const db = client.db('utopia-minds')

    console.log('✅ Connected to MongoDB')

    // Check if user already exists
    const existingUser = await db.collection('users').findOne({ email })
    if (existingUser) {
      console.error(`❌ User with email ${email} already exists`)
      await client.close()
      process.exit(1)
    }

    console.log('⏳ Hashing password...')
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    console.log('⏳ Creating admin user...')

    // Create admin user
    const adminUser = {
      name,
      email,
      password: hashedPassword,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const result = await db.collection('users').insertOne(adminUser)

    console.log('✅ Admin user created successfully!')
    console.log(`📧 Email: ${email}`)
    console.log(`👤 Name: ${name}`)
    console.log(`🆔 User ID: ${result.insertedId}`)

    await client.close()
    console.log('\n🎉 You can now login to the admin panel with these credentials.')
    
  } catch (error) {
    console.error('❌ Error creating admin user:', error.message)
    process.exit(1)
  } finally {
    rl.close()
  }
}

// Run the script
createAdminUser()