import { connectToDatabase } from '~/utils/db'

export default defineEventHandler(async (event) => {
  try {
    const { email } = await readBody(event)

    if (!email) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Email is required'
      })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid email format'
      })
    }

    const { db } = await connectToDatabase()
    
    // Check if email already exists
    const existingSubscriber = await db.collection('newsletter').findOne({ email })
    
    if (existingSubscriber) {
      return {
        success: true,
        message: 'You are already subscribed to our newsletter!'
      }
    }

    // Add new subscriber
    await db.collection('newsletter').insertOne({
      email,
      subscribedAt: new Date(),
      active: true,
      source: 'website'
    })

    return {
      success: true,
      message: 'Successfully subscribed to our newsletter!'
    }
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to subscribe to newsletter'
    })
  }
})