import { put } from '@vercel/blob'
import { requireAuth } from '~/utils/auth'

export default defineEventHandler(async (event) => {
  try {
    // Check if user is authenticated
    await requireAuth(event)

    // Get the uploaded file from the request
    const form = await readMultipartFormData(event)
    
    if (!form || form.length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'No file uploaded'
      })
    }

    const file = form.find(item => item.name === 'image')
    
    if (!file) {
      throw createError({
        statusCode: 400,
        statusMessage: 'No image file found'
      })
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
    const mimeType = file.type || 'unknown'
    
    if (!allowedTypes.includes(mimeType)) {
      throw createError({
        statusCode: 400,
        statusMessage: `Invalid file type: ${mimeType}. Only JPEG, PNG, WebP, and GIF are allowed.`
      })
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.data.length > maxSize) {
      const fileSizeMB = (file.data.length / (1024 * 1024)).toFixed(2)
      throw createError({
        statusCode: 400,
        statusMessage: `File too large: ${fileSizeMB}MB. Maximum size is 5MB.`
      })
    }

    // Generate a unique filename
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const fileExtension = file.filename.split('.').pop()
    const filename = `blog-covers/${timestamp}-${randomString}.${fileExtension}`

    // Check if Vercel Blob token is configured
    const blobToken = process.env.BLOB_READ_WRITE_TOKEN
    if (!blobToken) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Vercel Blob token not configured'
      })
    }

    // Upload to Vercel Blob
    const blob = await put(filename, file.data, {
      access: 'public',
      token: blobToken
    })

    return {
      success: true,
      data: {
        url: blob.url,
        filename: filename
      }
    }

  } catch (error) {
    console.error('Upload error:', error)
    
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to upload image'
    })
  }
})