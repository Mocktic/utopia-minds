import { connectToDatabase } from '~/utils/db'
import { requireAuth } from '~/utils/auth'
import { ObjectId } from 'mongodb'

export default defineEventHandler(async (event) => {
  try {
    // Require authentication
    await requireAuth(event)

    const blogId = getRouterParam(event, 'id')
    
    if (!blogId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Blog ID is required'
      })
    }

    const { db } = await connectToDatabase()
    
    // Get the blog post
    const blog = await db.collection('blogs').findOne({ 
      _id: new ObjectId(blogId)
    })

    if (!blog) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Blog post not found'
      })
    }

    return {
      success: true,
      data: {
        blog
      }
    }
  } catch (error) {
    console.error('Get blog error:', error)
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch blog post'
    })
  }
})