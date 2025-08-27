import { MongoClient } from 'mongodb'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

async function addSpecificAdmin() {
  try {
    console.log('🚀 Adding Specific Admin User')
    console.log('=============================\n')

    const mongoUri = process.env.MONGODB_URI
    if (!mongoUri) {
      console.error('❌ MONGODB_URI not found in environment variables')
      process.exit(1)
    }

    console.log('⏳ Connecting to MongoDB...')
    const client = new MongoClient(mongoUri)
    await client.connect()
    const db = client.db('utopia-minds')

    console.log('✅ Connected to MongoDB')

    // Check if user already exists
    const existingUser = await db.collection('users').findOne({ email: 'manya@utopia.minds' })
    if (existingUser) {
      console.log('⚠️  User already exists, updating password...')
      
      // Hash new password
      const hashedPassword = await bcrypt.hash('manya123', 12)
      
      // Update user
      await db.collection('users').updateOne(
        { email: 'manya@utopia.minds' },
        { 
          $set: { 
            password: hashedPassword,
            updatedAt: new Date()
          }
        }
      )
      
      console.log('✅ User password updated successfully!')
    } else {
      console.log('⏳ Hashing password...')
      const hashedPassword = await bcrypt.hash('manya123', 12)

      console.log('⏳ Creating admin user...')
      const adminUser = {
        name: 'Manya',
        email: 'manya@utopia.minds',
        password: hashedPassword,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      }

      const result = await db.collection('users').insertOne(adminUser)
      console.log('✅ Admin user created successfully!')
      console.log(`🆔 User ID: ${result.insertedId}`)
    }

    console.log('📧 Email: manya@utopia.minds')
    console.log('👤 Name: Manya')
    console.log('🔑 Password: manya123')

    await client.close()
    console.log('\n🎉 You can now login to the admin panel with these credentials.')
    
  } catch (error) {
    console.error('❌ Error creating admin user:', error.message)
    process.exit(1)
  }
}

// Run the script
addSpecificAdmin()