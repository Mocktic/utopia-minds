<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Dashboard
        </h1>
        <p class="mt-2 text-gray-600 dark:text-gray-400">
          Welcome back! Here's what's happening with your blog.
        </p>
      </div>
      <div class="mt-4 sm:mt-0">
        <NuxtLink 
          to="/admin/blogs/create"
          class="utopia-button-primary"
        >
          <Icon name="heroicons:plus-20-solid" class="w-5 h-5 mr-2" />
          New Article
        </NuxtLink>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="utopia-card p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <Icon name="heroicons:document-check-20-solid" class="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Published</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-gray-100">{{ stats.published || 0 }}</p>
          </div>
        </div>
      </div>

      <div class="utopia-card p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
              <Icon name="heroicons:document-20-solid" class="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Drafts</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-gray-100">{{ stats.draft || 0 }}</p>
          </div>
        </div>
      </div>

      <div class="utopia-card p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <Icon name="heroicons:eye-20-solid" class="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Total Views</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-gray-100">{{ totalViews }}</p>
          </div>
        </div>
      </div>

      <div class="utopia-card p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
              <Icon name="heroicons:calendar-20-solid" class="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">This Month</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-gray-100">{{ thisMonthPosts }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Posts -->
    <div class="utopia-card">
      <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Recent Articles
          </h2>
          <NuxtLink 
            to="/admin/blogs"
            class="text-purple-600 dark:text-purple-400 hover:underline text-sm font-medium"
          >
            View all
          </NuxtLink>
        </div>
      </div>

      <div v-if="loading" class="p-6 text-center">
        <div class="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
        <p class="mt-2 text-gray-600 dark:text-gray-400">Loading articles...</p>
      </div>

      <div v-else-if="recentBlogs.length > 0" class="divide-y divide-gray-200 dark:divide-gray-700">
        <div 
          v-for="blog in recentBlogs" 
          :key="blog._id"
          class="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <div class="flex items-center justify-between">
            <div class="flex-1 min-w-0">
              <div class="flex items-center space-x-3 mb-2">
                <span 
                  :class="[
                    'px-2 py-1 text-xs font-medium rounded-full',
                    blog.status === 'published' 
                      ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                      : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                  ]"
                >
                  {{ blog.status }}
                </span>
                <span class="text-sm text-gray-500 dark:text-gray-400">
                  {{ formatDate(blog.createdAt) }}
                </span>
              </div>
              
              <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 truncate">
                {{ blog.title }}
              </h3>
              
              <p class="mt-1 text-gray-600 dark:text-gray-400 line-clamp-2">
                {{ blog.excerpt }}
              </p>
              
              <div class="mt-2 flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                <span>{{ blog.category }}</span>
                <span>{{ blog.readingTime }}</span>
                <span v-if="blog.views > 0">{{ blog.views }} views</span>
              </div>
            </div>
            
            <div class="ml-4 flex items-center space-x-2">
              <NuxtLink 
                :to="`/admin/blogs/${blog._id}/edit`"
                class="p-2 text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                title="Edit"
              >
                <Icon name="heroicons:pencil-20-solid" class="w-4 h-4" />
              </NuxtLink>
              
              <NuxtLink 
                v-if="blog.status === 'published'"
                :to="`/blog/${blog.slug}`"
                target="_blank"
                class="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                title="View"
              >
                <Icon name="heroicons:eye-20-solid" class="w-4 h-4" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="p-6 text-center">
        <div class="w-12 h-12 mx-auto mb-4 text-gray-400">
          <Icon name="heroicons:document-text-20-solid" class="w-full h-full" />
        </div>
        <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
          No articles yet
        </h3>
        <p class="text-gray-600 dark:text-gray-400 mb-4">
          Get started by creating your first blog post.
        </p>
        <NuxtLink 
          to="/admin/blogs/create"
          class="utopia-button-primary"
        >
          Create Article
        </NuxtLink>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="utopia-card p-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Quick Actions
        </h3>
        <div class="space-y-3">
          <NuxtLink 
            to="/admin/blogs/create"
            class="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <Icon name="heroicons:plus-20-solid" class="w-5 h-5 text-purple-600 dark:text-purple-400 mr-3" />
            <span class="text-gray-900 dark:text-gray-100">Create new article</span>
          </NuxtLink>
          
          <NuxtLink 
            to="/admin/blogs?status=draft"
            class="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <Icon name="heroicons:document-20-solid" class="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-3" />
            <span class="text-gray-900 dark:text-gray-100">Review drafts</span>
          </NuxtLink>
          
          <a 
            href="/"
            target="_blank"
            class="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <Icon name="heroicons:globe-alt-20-solid" class="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3" />
            <span class="text-gray-900 dark:text-gray-100">View live site</span>
          </a>
        </div>
      </div>

      <div class="utopia-card p-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Recent Activity
        </h3>
        <div class="space-y-3">
          <div 
            v-for="activity in recentActivity" 
            :key="activity.id"
            class="flex items-start space-x-3"
          >
            <div class="flex-shrink-0 w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
            <div class="flex-1 min-w-0">
              <p class="text-sm text-gray-900 dark:text-gray-100">{{ activity.message }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">{{ activity.time }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Meta and layout
useSeoMeta({
  title: 'Dashboard - Admin - Utopia Minds',
  robots: 'noindex, nofollow'
})

definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})

// Store
const blogStore = useBlogStore()

// Reactive data
const loading = ref(true)
const recentBlogs = ref([])
const stats = ref({
  published: 0,
  draft: 0,
  archived: 0
})

// Computed properties
const totalViews = computed(() => {
  return recentBlogs.value.reduce((total, blog) => total + (blog.views || 0), 0)
})

const thisMonthPosts = computed(() => {
  const thisMonth = new Date()
  thisMonth.setDate(1)
  thisMonth.setHours(0, 0, 0, 0)
  
  return recentBlogs.value.filter(blog => 
    new Date(blog.createdAt) >= thisMonth
  ).length
})

const recentActivity = computed(() => {
  const activities = []
  
  recentBlogs.value.slice(0, 5).forEach(blog => {
    activities.push({
      id: `blog-${blog._id}`,
      message: `${blog.status === 'published' ? 'Published' : 'Created'} "${blog.title}"`,
      time: formatRelativeTime(blog.createdAt)
    })
  })
  
  return activities
})

// Fetch data on mount
onMounted(async () => {
  try {
    const result = await blogStore.fetchAdminBlogs({ limit: 10 })
    
    if (result.success) {
      recentBlogs.value = result.data.blogs
      stats.value = result.data.stats
    }
  } catch (error) {
    console.error('Error loading dashboard data:', error)
  } finally {
    loading.value = false
  }
})

// Helper functions
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const formatRelativeTime = (dateString) => {
  const now = new Date()
  const date = new Date(dateString)
  const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))
  
  if (diffInHours < 1) return 'Just now'
  if (diffInHours < 24) return `${diffInHours}h ago`
  
  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 7) return `${diffInDays}d ago`
  
  return formatDate(dateString)
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-clamp: 2;
}
</style>