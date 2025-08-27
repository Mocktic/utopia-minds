import { MongoClient } from 'mongodb'

let client
let db

export async function connectToDatabase() {
  if (db) return { client, db }

  try {
    const mongoUri = process.env.MONGODB_URI
    if (!mongoUri) {
      throw new Error('MONGODB_URI environment variable is not set')
    }
    
    client = new MongoClient(mongoUri)
    await client.connect()
    db = client.db('utopia-minds')
    
    console.log('Connected to MongoDB Atlas')
    return { client, db }
  } catch (error) {
    console.error('MongoDB connection error:', error)
    throw error
  }
}

export async function closeDatabaseConnection() {
  if (client) {
    await client.close()
    client = null
    db = null
  }
}
