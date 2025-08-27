import { connectToDatabase } from '~/utils/db'

export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig()
    const baseUrl = config.public.appUrl || 'https://your-domain.vercel.app'
    
    const { db } = await connectToDatabase()
    
    // Get all published blogs
    const blogs = await db.collection('blogs')
      .find({ status: 'published' })
      .sort({ createdAt: -1 })
      .project({ slug: 1, updatedAt: 1 })
      .toArray()

    // Static pages
    const staticPages = [
      { url: '', priority: '1.0' },
      { url: '/blog', priority: '0.9' },
      { url: '/about', priority: '0.8' }
    ]

    // Generate XML
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`

    // Add static pages
    staticPages.forEach(page => {
      xml += `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <changefreq>weekly</changefreq>
    <priority>${page.priority}</priority>
  </url>
`
    })

    // Add blog posts
    blogs.forEach(blog => {
      const lastmod = new Date(blog.updatedAt).toISOString().split('T')[0]
      xml += `  <url>
    <loc>${baseUrl}/blog/${blog.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`
    })

    xml += `</urlset>`

    // Set headers
    setHeader(event, 'Content-Type', 'application/xml')
    setHeader(event, 'Cache-Control', 'max-age=3600') // Cache for 1 hour

    return xml
  } catch (error) {
    console.error('Sitemap generation error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to generate sitemap'
    })
  }
})