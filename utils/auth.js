import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { getHeader, createError } from 'h3'

export function generateToken(payload) {
  const jwtSecret = process.env.JWT_SECRET
  if (!jwtSecret) {
    throw new Error('JWT_SECRET environment variable is not set')
  }
  return jwt.sign(payload, jwtSecret, { expiresIn: '7d' })
}

export function verifyToken(token) {
  try {
    const jwtSecret = process.env.JWT_SECRET
    if (!jwtSecret) {
      throw new Error('JWT_SECRET environment variable is not set')
    }
    return jwt.verify(token, jwtSecret)
  } catch (error) {
    return null
  }
}

export async function hashPassword(password) {
  return await bcrypt.hash(password, 12)
}

export async function comparePassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword)
}

export function extractTokenFromEvent(event) {
  const authHeader = getHeader(event, 'authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }
  return authHeader.substring(7)
}

export async function requireAuth(event) {
  const token = extractTokenFromEvent(event)
  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Authorization token required'
    })
  }

  const decoded = verifyToken(token)
  if (!decoded) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid or expired token'
    })
  }

  return decoded
}
