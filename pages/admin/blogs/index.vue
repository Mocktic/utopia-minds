<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Articles
        </h1>
        <p class="mt-2 text-gray-600 dark:text-gray-400">
          Manage your blog posts and content.
        </p>
      </div>
      <div class="mt-4 sm:mt-0">
        <NuxtLink to="/admin/blogs/create" class="utopia-button-primary">
          <Icon name="heroicons:plus-20-solid" class="w-5 h-5 mr-2" />
          New Article
        </NuxtLink>
      </div>
    </div>

    <!-- Filters and Search -->
    <div class="utopia-card p-6">
      <div class="flex flex-col lg:flex-row gap-4">
        <!-- Search -->
        <div class="flex-1">
          <div class="relative">
            <Icon name="heroicons:magnifying-glass-20-solid"
              class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input v-model="searchQuery" @input="debouncedSearch" type="text" placeholder="Search articles..."
              class="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
          </div>
        </div>

        <!-- Status Filter -->
        <div class="lg:w-48">
          <select v-model="selectedStatus" @change="applyFilters"
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent">
            <option value="">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      <!-- Active Filters -->
      <div v-if="hasActiveFilters" class="mt-4 flex flex-wrap gap-2">
        <span class="text-sm text-gray-600 dark:text-gray-400">Filters:</span>

        <button v-if="searchQuery" @click="clearSearch"
          class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 hover:bg-purple-200 dark:hover:bg-purple-800">
          Search: "{{ searchQuery }}"
          <Icon name="heroicons:x-mark-20-solid" class="ml-1 w-4 h-4" />
        </button>

        <button v-if="selectedStatus" @click="clearStatus"
          class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800">
          {{ selectedStatus }}
          <Icon name="heroicons:x-mark-20-solid" class="ml-1 w-4 h-4" />
        </button>

        <button @click="clearAllFilters"
          class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600">
          Clear All
          <Icon name="heroicons:x-mark-20-solid" class="ml-1 w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- Articles Table -->
    <div class="utopia-card overflow-hidden">
      <div v-if="loading" class="p-8 text-center">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        <p class="mt-2 text-gray-600 dark:text-gray-400">Loading articles...</p>
      </div>

      <div v-else-if="blogs.length > 0">
        <!-- Desktop Table -->
        <div class="hidden md:block overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Article
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Category
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Views
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th
                  class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-for="blog in blogs" :key="blog._id"
                class="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <td class="px-6 py-4">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 w-12 h-12">
                      <img :src="blog.coverImage || '/api/placeholder/48/48'" :alt="blog.title"
                        class="w-12 h-12 rounded-lg object-cover" />
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {{ blog.title }}
                      </div>
                      <div class="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                        {{ blog.excerpt }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="[
                    'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                    getStatusColor(blog.status)
                  ]">
                    {{ blog.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                  {{ blog.category }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {{ blog.views || 0 }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {{ formatDate(blog.createdAt) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div class="flex items-center justify-end space-x-2">
                    <NuxtLink :to="`/admin/blogs/${blog._id}/edit`"
                      class="text-purple-600 dark:text-purple-400 hover:text-purple-900 dark:hover:text-purple-300"
                      title="Edit">
                      <Icon name="heroicons:pencil-20-solid" class="w-4 h-4" />
                    </NuxtLink>

                    <NuxtLink v-if="blog.status === 'published'" :to="`/blog/${blog.slug}`" target="_blank"
                      class="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300"
                      title="View">
                      <Icon name="heroicons:eye-20-solid" class="w-4 h-4" />
                    </NuxtLink>

                    <button @click="confirmDelete(blog)"
                      class="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300" title="Delete">
                      <Icon name="heroicons:trash-20-solid" class="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Mobile Cards -->
        <div class="md:hidden divide-y divide-gray-200 dark:divide-gray-700">
          <div v-for="blog in blogs" :key="blog._id" class="p-6">
            <div class="flex items-start space-x-4">
              <img :src="blog.coverImage || '/api/placeholder/64/64'" :alt="blog.title"
                class="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
              <div class="flex-1 min-w-0">
                <div class="flex items-center space-x-2 mb-2">
                  <span :class="[
                    'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                    getStatusColor(blog.status)
                  ]">
                    {{ blog.status }}
                  </span>
                  <span class="text-xs text-gray-500 dark:text-gray-400">
                    {{ blog.category }}
                  </span>
                </div>

                <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">
                  {{ blog.title }}
                </h3>

                <p class="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                  {{ blog.excerpt }}
                </p>

                <div class="flex items-center justify-between">
                  <div class="text-xs text-gray-500 dark:text-gray-400">
                    {{ formatDate(blog.createdAt) }} • {{ blog.views || 0 }} views
                  </div>

                  <div class="flex items-center space-x-2">
                    <NuxtLink :to="`/admin/blogs/${blog._id}/edit`"
                      class="p-2 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900 rounded-lg transition-colors">
                      <Icon name="heroicons:pencil-20-solid" class="w-4 h-4" />
                    </NuxtLink>

                    <NuxtLink v-if="blog.status === 'published'" :to="`/blog/${blog.slug}`" target="_blank"
                      class="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-lg transition-colors">
                      <Icon name="heroicons:eye-20-solid" class="w-4 h-4" />
                    </NuxtLink>

                    <button @click="confirmDelete(blog)"
                      class="p-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-colors">
                      <Icon name="heroicons:trash-20-solid" class="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="pagination.pages > 1" class="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div class="text-sm text-gray-700 dark:text-gray-300">
              Showing {{ ((pagination.page - 1) * pagination.limit) + 1 }} to
              {{ Math.min(pagination.page * pagination.limit, pagination.total) }} of
              {{ pagination.total }} results
            </div>

            <div class="flex items-center space-x-2">
              <button @click="goToPage(pagination.page - 1)" :disabled="pagination.page <= 1"
                class="px-3 py-2 text-sm font-medium text-gray-500 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">
                Previous
              </button>

              <button @click="goToPage(pagination.page + 1)" :disabled="pagination.page >= pagination.pages"
                class="px-3 py-2 text-sm font-medium text-gray-500 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="p-8 text-center">
        <div class="w-16 h-16 mx-auto mb-4 text-gray-400">
          <Icon name="heroicons:document-text-20-solid" class="w-full h-full" />
        </div>
        <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
          No articles found
        </h3>
        <p class="text-gray-600 dark:text-gray-400 mb-4">
          {{ hasActiveFilters ? 'Try adjusting your search criteria.' : 'Get started by creating your first article.' }}
        </p>
        <NuxtLink v-if="!hasActiveFilters" to="/admin/blogs/create" class="utopia-button-primary">
          Create Article
        </NuxtLink>
        <button v-else @click="clearAllFilters" class="utopia-button-secondary">
          Clear Filters
        </button>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      @click="showDeleteModal = false">
      <div class="utopia-card p-6 max-w-md w-full" @click.stop>
        <div class="flex items-center mb-4">
          <div class="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mr-3">
            <Icon name="heroicons:exclamation-triangle-20-solid" class="w-6 h-6 text-red-600 dark:text-red-400" />
          </div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Delete Article
          </h3>
        </div>

        <p class="text-gray-600 dark:text-gray-400 mb-6">
          Are you sure you want to delete "{{ blogToDelete?.title }}"? This action cannot be undone.
        </p>

        <div class="flex justify-end space-x-3">
          <button @click="showDeleteModal = false" class="utopia-button-secondary">
            Cancel
          </button>
          <button @click="deleteBlog" :disabled="deleting"
            class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed">
            {{ deleting ? 'Deleting...' : 'Delete' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Meta and layout
useSeoMeta({
  title: 'Articles - Admin - Utopia Minds',
  robots: 'noindex, nofollow'
})

definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})

// Store and composables
const blogStore = useBlogStore()
const route = useRoute()
const router = useRouter()

// Reactive data
const loading = ref(true)
const blogs = ref([])
const pagination = ref({
  page: 1,
  limit: 10,
  total: 0,
  pages: 0
})
const searchQuery = ref('')
const selectedStatus = ref('')
const showDeleteModal = ref(false)
const blogToDelete = ref(null)
const deleting = ref(false)

// Initialize filters from URL
onMounted(async () => {
  searchQuery.value = route.query.search || ''
  selectedStatus.value = route.query.status || ''
  pagination.value.page = parseInt(route.query.page) || 1

  await fetchBlogs()
})

// Watch for route changes
watch(() => route.query, async (newQuery) => {
  searchQuery.value = newQuery.search || ''
  selectedStatus.value = newQuery.status || ''
  pagination.value.page = parseInt(newQuery.page) || 1

  await fetchBlogs()
})

// Computed properties
const hasActiveFilters = computed(() => {
  return searchQuery.value || selectedStatus.value
})

// Methods
const fetchBlogs = async () => {
  loading.value = true

  try {
    const params = {
      page: pagination.value.page,
      limit: pagination.value.limit
    }

    if (searchQuery.value) params.search = searchQuery.value
    if (selectedStatus.value) params.status = selectedStatus.value

    const result = await blogStore.fetchAdminBlogs(params)

    if (result.success) {
      blogs.value = result.data.blogs
      pagination.value = result.data.pagination
    }
  } catch (error) {
    console.error('Error fetching blogs:', error)
  } finally {
    loading.value = false
  }
}

let searchTimeout
const debouncedSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    applyFilters()
  }, 500)
}

const applyFilters = () => {
  const query = { ...route.query }

  if (searchQuery.value) {
    query.search = searchQuery.value
  } else {
    delete query.search
  }

  if (selectedStatus.value) {
    query.status = selectedStatus.value
  } else {
    delete query.status
  }

  // Reset to page 1 when applying filters
  delete query.page

  router.push({ query })
}

const clearSearch = () => {
  searchQuery.value = ''
  applyFilters()
}

const clearStatus = () => {
  selectedStatus.value = ''
  applyFilters()
}

const clearAllFilters = () => {
  searchQuery.value = ''
  selectedStatus.value = ''
  router.push({ query: {} })
}

const goToPage = (page) => {
  if (page < 1 || page > pagination.value.pages) return

  const query = { ...route.query, page: page.toString() }
  if (page === 1) delete query.page

  router.push({ query })
}

const getStatusColor = (status) => {
  switch (status) {
    case 'published':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    case 'draft':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    case 'archived':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
  }
}

const confirmDelete = (blog) => {
  blogToDelete.value = blog
  showDeleteModal.value = true
}

const deleteBlog = async () => {
  if (!blogToDelete.value) return

  deleting.value = true

  try {
    const result = await blogStore.deleteBlog(blogToDelete.value._id)

    if (result.success) {
      showDeleteModal.value = false
      blogToDelete.value = null

      // Refresh the list
      await fetchBlogs()
    }
  } catch (error) {
    console.error('Error deleting blog:', error)
  } finally {
    deleting.value = false
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-clamp: 1;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-clamp: 2;
}
</style>