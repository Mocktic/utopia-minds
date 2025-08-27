import { connectToDatabase } from '~/utils/db'
import { ObjectId } from 'mongodb'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const { 
      page = 1, 
      limit = 10, 
      category, 
      tag, 
      search,
      featured 
    } = query

    const { db } = await connectToDatabase()
    
    // Build filter
    const filter = { status: 'published' }
    
    if (category) {
      filter.category = category
    }
    
    if (tag) {
      filter.tags = { $in: [tag] }
    }
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } }
      ]
    }
    
    if (featured === 'true') {
      filter.featured = true
    }

    // Calculate skip for pagination
    const skip = (parseInt(page) - 1) * parseInt(limit)

    // Get blogs with pagination
    const blogs = await db.collection('blogs')
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .project({
        title: 1,
        slug: 1,
        excerpt: 1,
        coverImage: 1,
        category: 1,
        tags: 1,
        author: 1,
        createdAt: 1,
        readingTime: 1,
        featured: 1,
        views: 1
      })
      .toArray()

    // Get total count for pagination
    const totalCount = await db.collection('blogs').countDocuments(filter)
    
    // Get categories and tags for filters
    const categories = await db.collection('blogs').distinct('category', { status: 'published' })
    const tags = await db.collection('blogs').distinct('tags', { status: 'published' })

    return {
      blogs,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: totalCount,
        pages: Math.ceil(totalCount / parseInt(limit))
      },
      filters: {
        categories,
        tags
      }
    }
  } catch (error) {
    console.error('Get blogs error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to fetch blogs: ${error.message}`
    })
  }
})
