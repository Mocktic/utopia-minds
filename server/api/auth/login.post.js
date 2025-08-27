import { connectToDatabase } from '~/utils/db'
import { generateToken, comparePassword } from '~/utils/auth'

export default defineEventHandler(async (event) => {
  try {
    const { email, password } = await readBody(event)

    if (!email || !password) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Email and password are required'
      })
    }

    const { db } = await connectToDatabase()
    const user = await db.collection('users').findOne({ email })

    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid credentials'
      })
    }

    const isValidPassword = await comparePassword(password, user.password)
    if (!isValidPassword) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid credentials'
      })
    }

    const token = generateToken({
      userId: user._id,
      email: user.email,
      name: user.name
    })

    return {
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      }
    }
  } catch (error) {
    console.error('Login error:', error)
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: `Internal server error: ${error.message}`
    })
  }
})
