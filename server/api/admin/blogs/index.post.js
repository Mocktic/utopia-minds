import { connectToDatabase } from '~/utils/db'
import { requireAuth } from '~/utils/auth'
import { ObjectId } from 'mongodb'

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim('-')
}

function calculateReadingTime(content) {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  const minutes = Math.ceil(wordCount / wordsPerMinute)
  return `${minutes} min read`
}

export default defineEventHandler(async (event) => {
  try {
    // Require authentication
    const user = await requireAuth(event)

    const body = await readBody(event)
    const { 
      title, 
      content, 
      excerpt, 
      coverImage, 
      category, 
      tags, 
      status = 'draft',
      featured = false 
    } = body

    if (!title || !content) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Title and content are required'
      })
    }

    const { db } = await connectToDatabase()
    
    // Generate slug
    let slug = generateSlug(title)
    
    // Ensure slug is unique
    let slugExists = await db.collection('blogs').findOne({ slug })
    let counter = 1
    while (slugExists) {
      slug = `${generateSlug(title)}-${counter}`
      slugExists = await db.collection('blogs').findOne({ slug })
      counter++
    }

    // Create blog document
    const blog = {
      title,
      slug,
      content,
      excerpt: excerpt || content.substring(0, 200) + '...',
      coverImage: coverImage || null,
      category: category || 'Uncategorized',
      tags: Array.isArray(tags) ? tags : [],
      status,
      featured: Boolean(featured),
      author: {
        id: user.userId,
        name: user.name,
        email: user.email
      },
      readingTime: calculateReadingTime(content),
      views: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const result = await db.collection('blogs').insertOne(blog)
    
    // Return the created blog
    const createdBlog = await db.collection('blogs').findOne({ _id: result.insertedId })

    return {
      success: true,
      data: {
        blog: createdBlog
      }
    }
  } catch (error) {
    console.error('Create blog error:', error)
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create blog'
    })
  }
})