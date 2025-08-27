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

    const blogId = getRouterParam(event, 'id')
    const body = await readBody(event)
    
    if (!blogId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Blog ID is required'
      })
    }

    const { 
      title, 
      content, 
      excerpt, 
      coverImage, 
      category, 
      tags, 
      status,
      featured 
    } = body

    if (!title || !content) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Title and content are required'
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

    // Generate new slug if title changed
    let slug = existingBlog.slug
    if (title !== existingBlog.title) {
      slug = generateSlug(title)
      
      // Ensure slug is unique (excluding current blog)
      let slugExists = await db.collection('blogs').findOne({ 
        slug, 
        _id: { $ne: new ObjectId(blogId) } 
      })
      let counter = 1
      while (slugExists) {
        slug = `${generateSlug(title)}-${counter}`
        slugExists = await db.collection('blogs').findOne({ 
          slug, 
          _id: { $ne: new ObjectId(blogId) } 
        })
        counter++
      }
    }

    // Update blog document
    const updateData = {
      title,
      slug,
      content,
      excerpt: excerpt || content.substring(0, 200) + '...',
      coverImage: coverImage || null,
      category: category || 'Uncategorized',
      tags: Array.isArray(tags) ? tags : [],
      status: status || existingBlog.status,
      featured: Boolean(featured),
      readingTime: calculateReadingTime(content),
      updatedAt: new Date()
    }

    await db.collection('blogs').updateOne(
      { _id: new ObjectId(blogId) },
      { $set: updateData }
    )
    
    // Return the updated blog
    const updatedBlog = await db.collection('blogs').findOne({ _id: new ObjectId(blogId) })

    return {
      success: true,
      data: {
        blog: updatedBlog
      }
    }
  } catch (error) {
    console.error('Update blog error:', error)
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update blog'
    })
  }
})