export const useBlogStore = defineStore('blog', () => {
  const blogs = ref([])
  const currentBlog = ref(null)
  const loading = ref(false)
  const pagination = ref({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  })
  const filters = ref({
    categories: [],
    tags: []
  })

  // Fetch blogs (public)
  const fetchBlogs = async (params = {}) => {
    loading.value = true
    try {
      const data = await $fetch('/api/blogs', {
        params
      })

      blogs.value = data.blogs
      pagination.value = data.pagination
      filters.value = data.filters

      return { success: true, data }
    } catch (error) {
      console.error('Fetch blogs error:', error)
      return { success: false, error: error.data?.message || 'Failed to fetch blogs' }
    } finally {
      loading.value = false
    }
  }

  // Fetch single blog by slug (public)
  const fetchBlogBySlug = async (slug) => {
    loading.value = true
    try {
      const data = await $fetch(`/api/blogs/${slug}`)
      
      currentBlog.value = data.blog
      return { success: true, data }
    } catch (error) {
      console.error('Fetch blog error:', error)
      currentBlog.value = null
      return { success: false, error: error.data?.message || 'Blog not found' }
    } finally {
      loading.value = false
    }
  }

  // Admin: Fetch all blogs (including drafts)
  const fetchAdminBlogs = async (params = {}) => {
    const authStore = useAuthStore()
    loading.value = true
    
    try {
      const data = await $fetch('/api/admin/blogs', {
        params,
        headers: authStore.getAuthHeaders()
      })

      blogs.value = data.data.blogs
      pagination.value = data.data.pagination

      return { success: true, data: data.data }
    } catch (error) {
      console.error('Fetch admin blogs error:', error)
      return { success: false, error: error.data?.message || 'Failed to fetch blogs' }
    } finally {
      loading.value = false
    }
  }

  // Admin: Fetch single blog by ID (for editing)
  const fetchBlogById = async (blogId) => {
    const authStore = useAuthStore()
    loading.value = true
    
    try {
      const data = await $fetch(`/api/admin/blogs/${blogId}`, {
        headers: authStore.getAuthHeaders()
      })

      currentBlog.value = data.data.blog
      return { success: true, data: data.data }
    } catch (error) {
      console.error('Fetch blog by ID error:', error)
      currentBlog.value = null
      return { success: false, error: error.data?.message || 'Blog not found' }
    } finally {
      loading.value = false
    }
  }

  // Admin: Create new blog
  const createBlog = async (blogData) => {
    const authStore = useAuthStore()
    loading.value = true

    try {
      const data = await $fetch('/api/admin/blogs', {
        method: 'POST',
        body: blogData,
        headers: authStore.getAuthHeaders()
      })

      // Add to blogs array if it's the current page
      blogs.value.unshift(data.data.blog)

      return { success: true, data: data.data }
    } catch (error) {
      console.error('Create blog error:', error)
      return { success: false, error: error.data?.message || 'Failed to create blog' }
    } finally {
      loading.value = false
    }
  }

  // Admin: Update blog
  const updateBlog = async (blogId, updateData) => {
    const authStore = useAuthStore()
    loading.value = true

    try {
      const data = await $fetch(`/api/admin/blogs/${blogId}`, {
        method: 'PUT',
        body: updateData,
        headers: authStore.getAuthHeaders()
      })

      // Update in blogs array
      const index = blogs.value.findIndex(blog => blog._id === blogId)
      if (index !== -1) {
        blogs.value[index] = data.data.blog
      }

      // Update current blog if it matches
      if (currentBlog.value && currentBlog.value._id === blogId) {
        currentBlog.value = data.data.blog
      }

      return { success: true, data: data.data }
    } catch (error) {
      console.error('Update blog error:', error)
      return { success: false, error: error.data?.message || 'Failed to update blog' }
    } finally {
      loading.value = false
    }
  }

  // Admin: Delete blog
  const deleteBlog = async (blogId) => {
    const authStore = useAuthStore()
    loading.value = true

    try {
      await $fetch(`/api/admin/blogs/${blogId}`, {
        method: 'DELETE',
        headers: authStore.getAuthHeaders()
      })

      // Remove from blogs array
      const index = blogs.value.findIndex(blog => blog._id === blogId)
      if (index !== -1) {
        blogs.value.splice(index, 1)
      }

      // Clear current blog if it matches
      if (currentBlog.value && currentBlog.value._id === blogId) {
        currentBlog.value = null
      }

      return { success: true }
    } catch (error) {
      console.error('Delete blog error:', error)
      return { success: false, error: error.data?.message || 'Failed to delete blog' }
    } finally {
      loading.value = false
    }
  }

  // Clear current blog
  const clearCurrentBlog = () => {
    currentBlog.value = null
  }

  return {
    blogs: readonly(blogs),
    currentBlog: readonly(currentBlog),
    loading: readonly(loading),
    pagination: readonly(pagination),
    filters: readonly(filters),
    fetchBlogs,
    fetchBlogBySlug,
    fetchAdminBlogs,
    fetchBlogById,
    createBlog,
    updateBlog,
    deleteBlog,
    clearCurrentBlog
  }
})
