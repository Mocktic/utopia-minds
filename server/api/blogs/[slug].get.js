import { connectToDatabase } from '~/utils/db'

export default defineEventHandler(async (event) => {
  try {
    const slug = getRouterParam(event, 'slug')
    
    if (!slug) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Blog slug is required'
      })
    }

    const { db } = await connectToDatabase()
    
    // Get the blog post
    const blog = await db.collection('blogs').findOne({ 
      slug, 
      status: 'published' 
    })

    if (!blog) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Blog post not found'
      })
    }

    // Increment view count
    await db.collection('blogs').updateOne(
      { _id: blog._id },
      { $inc: { views: 1 } }
    )

    // Get related posts (same category, excluding current post)
    const relatedPosts = await db.collection('blogs')
      .find({ 
        category: blog.category,
        status: 'published',
        _id: { $ne: blog._id }
      })
      .sort({ createdAt: -1 })
      .limit(3)
      .project({
        title: 1,
        slug: 1,
        excerpt: 1,
        coverImage: 1,
        createdAt: 1,
        readingTime: 1
      })
      .toArray()

    return {
      blog: {
        ...blog,
        views: blog.views + 1 // Return incremented view count
      },
      relatedPosts
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
