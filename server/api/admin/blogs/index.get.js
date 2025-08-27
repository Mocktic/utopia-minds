import { connectToDatabase } from '~/utils/db'
import { requireAuth } from '~/utils/auth'

export default defineEventHandler(async (event) => {
  try {
    // Require authentication
    await requireAuth(event)

    const query = getQuery(event)
    const { 
      page = 1, 
      limit = 10, 
      status, 
      search,
      category 
    } = query

    const { db } = await connectToDatabase()
    
    // Build filter
    const filter = {}
    
    if (status) {
      filter.status = status
    }
    
    if (category) {
      filter.category = category
    }
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } }
      ]
    }

    // Calculate skip for pagination
    const skip = (parseInt(page) - 1) * parseInt(limit)

    // Get blogs with pagination
    const blogs = await db.collection('blogs')
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .toArray()

    // Get total count for pagination
    const totalCount = await db.collection('blogs').countDocuments(filter)
    
    // Get stats
    const stats = {
      published: await db.collection('blogs').countDocuments({ status: 'published' }),
      draft: await db.collection('blogs').countDocuments({ status: 'draft' }),
      archived: await db.collection('blogs').countDocuments({ status: 'archived' })
    }

    return {
      success: true,
      data: {
        blogs,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: totalCount,
          pages: Math.ceil(totalCount / parseInt(limit))
        },
        stats
      }
    }
  } catch (error) {
    console.error('Get admin blogs error:', error)
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch blogs'
    })
  }
})