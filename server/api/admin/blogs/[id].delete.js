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
    
    // Check if blog exists
    const existingBlog = await db.collection('blogs').findOne({ 
      _id: new ObjectId(blogId) 
    })

    if (!existingBlog) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Blog post not found'
      })
    }

    // Delete the blog
    await db.collection('blogs').deleteOne({ _id: new ObjectId(blogId) })

    return {
      success: true,
      message: 'Blog post deleted successfully'
    }
  } catch (error) {
    console.error('Delete blog error:', error)
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to delete blog'
    })
  }
})