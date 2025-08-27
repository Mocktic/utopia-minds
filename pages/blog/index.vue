<template>
  <div class="py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-16">
        <div class="mb-8">
          <div class="inline-flex items-center px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 text-sm font-medium mb-6 animate-fade-in">
            <span class="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></span>
            Psychology & Mental Wellness Articles
          </div>
        </div>
        <h1 class="text-5xl md:text-6xl font-playfair font-semibold text-slate-900 dark:text-slate-100 mb-8 animate-fade-in tracking-tight">
          Insights & <span class="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">Research</span>
        </h1>
        <p class="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto animate-slide-up leading-relaxed text-balance">
          Explore evidence-based insights into psychology, mental health, cognitive science, and personal development. 
          Discover practical strategies for emotional well-being and psychological growth.
        </p>
      </div>

      <!-- Filters -->
      <div class="mb-12 animate-slide-up" style="animation-delay: 0.2s">
        <div class="utopia-card p-8">
          <div class="flex flex-col lg:flex-row gap-6">
            <!-- Search -->
            <div class="flex-1">
              <div class="relative">
                <Icon name="heroicons:magnifying-glass-20-solid"
                  class="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input 
                  v-model="searchQuery" 
                  @input="debouncedSearch"
                  type="text" 
                  placeholder="Search psychology articles..."
                  class="w-full pl-12 pr-4 py-4 border border-slate-300 dark:border-slate-600 rounded-2xl bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 placeholder:text-slate-400" 
                />
              </div>
            </div>

            <!-- Category Filter -->
            <div class="lg:w-64">
              <select 
                v-model="selectedCategory" 
                @change="applyFilters"
                class="w-full px-4 py-4 border border-slate-300 dark:border-slate-600 rounded-2xl bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
              >
                <option value="">All Topics</option>
                <option v-for="category in categories" :key="category" :value="category">
                  {{ category }}
                </option>
              </select>
            </div>
          </div>

          <!-- Active Filters -->
          <div v-if="hasActiveFilters" class="mt-6 flex flex-wrap gap-3">
            <span class="text-sm text-slate-600 dark:text-slate-400 font-medium">Active filters:</span>

            <button v-if="searchQuery" @click="clearSearch"
              class="inline-flex items-center px-4 py-2 rounded-full text-sm bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-colors font-medium">
              Search: "{{ searchQuery }}"
              <Icon name="heroicons:x-mark-20-solid" class="ml-2 w-4 h-4" />
            </button>

            <button v-if="selectedCategory" @click="clearCategory"
              class="inline-flex items-center px-4 py-2 rounded-full text-sm bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-colors font-medium">
              {{ selectedCategory }}
              <Icon name="heroicons:x-mark-20-solid" class="ml-2 w-4 h-4" />
            </button>

            <button @click="clearAllFilters"
              class="inline-flex items-center px-4 py-2 rounded-full text-sm bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors font-medium">
              Clear All
              <Icon name="heroicons:x-mark-20-solid" class="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <!-- Blog Posts -->
      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        <p class="mt-2 text-gray-600 dark:text-gray-400">Loading articles...</p>
      </div>

      <div v-else-if="blogs.length > 0" class="space-y-8">
        <!-- Featured Post (if exists and no filters) -->
        <div v-if="featuredPost && !hasActiveFilters" class="animate-slide-up mb-16" style="animation-delay: 0.3s">
          <div class="utopia-card-elevated overflow-hidden">
            <div class="lg:flex">
              <div class="lg:w-2/5 relative">
                <img 
                  :src="featuredPost.coverImage || '/api/placeholder/600/400'"
                  :alt="featuredPost.title"
                  class="w-full h-64 lg:h-full object-cover"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/10"></div>
              </div>
              <div class="lg:w-3/5 p-8 lg:p-12">
                <div class="flex items-center space-x-4 mb-6">
                  <span class="px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 text-sm font-semibold rounded-full">
                    Featured Research
                  </span>
                  <span class="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-full">
                    {{ featuredPost.category }}
                  </span>
                  <span class="text-sm text-slate-500 dark:text-slate-400">
                    {{ formatDate(featuredPost.createdAt) }}
                  </span>
                </div>
                
                <h2 class="text-3xl lg:text-4xl font-playfair font-semibold text-slate-900 dark:text-slate-100 mb-6 leading-tight">
                  {{ featuredPost.title }}
                </h2>
                
                <p class="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed reading-width">
                  {{ featuredPost.excerpt }}
                </p>
                
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-4">
                    <div class="w-12 h-12 mindfulness-gradient rounded-2xl flex items-center justify-center shadow-lg">
                      <span class="text-white font-semibold text-lg">
                        {{ featuredPost.author.name.charAt(0) }}
                      </span>
                    </div>
                    <div>
                      <p class="font-semibold text-slate-900 dark:text-slate-100">
                        {{ featuredPost.author.name }}
                      </p>
                      <p class="text-sm text-slate-500 dark:text-slate-400">
                        {{ featuredPost.readingTime }} • {{ featuredPost.views || 0 }} views
                      </p>
                    </div>
                  </div>
                  
                  <NuxtLink 
                    :to="`/blog/${featuredPost.slug}`"
                    class="utopia-button-primary group"
                  >
                    <span class="flex items-center">
                      Read Article
                      <Icon name="heroicons:arrow-right-20-solid" class="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Regular Posts Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article 
            v-for="(post, index) in regularPosts" 
            :key="post._id"
            class="utopia-card group hover:scale-105 transition-all duration-500 animate-slide-up"
            :style="{ animationDelay: `${(index + 1) * 0.1}s` }"
          >
            <div class="p-0 overflow-hidden">
              <div class="relative mb-6">
                <img 
                  :src="post.coverImage || '/api/placeholder/400/250'"
                  :alt="post.title"
                  class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div class="px-6 pb-6">
                <div class="flex items-center space-x-3 mb-4">
                  <span class="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 text-xs font-semibold rounded-full">
                    {{ post.category }}
                  </span>
                  <span class="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {{ formatDate(post.createdAt) }}
                  </span>
                </div>
                
                <h3 class="text-xl font-playfair font-semibold text-slate-900 dark:text-slate-100 mb-3 leading-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {{ post.title }}
                </h3>
                
                <p class="text-slate-600 dark:text-slate-400 mb-6 line-clamp-3 leading-relaxed">
                  {{ post.excerpt }}
                </p>
                
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 mindfulness-gradient rounded-xl flex items-center justify-center shadow-md">
                      <span class="text-white text-sm font-semibold">
                        {{ post.author.name.charAt(0) }}
                      </span>
                    </div>
                    <div>
                      <p class="text-sm font-medium text-slate-900 dark:text-slate-100">
                        {{ post.author.name }}
                      </p>
                      <p class="text-xs text-slate-500 dark:text-slate-400">
                        {{ post.readingTime }}
                      </p>
                    </div>
                  </div>
                  
                  <NuxtLink 
                    :to="`/blog/${post.slug}`"
                    class="flex items-center text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-semibold text-sm group/link"
                  >
                    Read
                    <Icon name="heroicons:arrow-right-20-solid" class="ml-1 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </NuxtLink>
                </div>
              </div>
            </div>
          </article>
        </div>

        <!-- Pagination -->
        <div v-if="pagination.pages > 1" class="flex justify-center mt-12">
          <div class="flex items-center space-x-2">
            <button 
              @click="goToPage(pagination.page - 1)" 
              :disabled="pagination.page <= 1"
              class="px-4 py-2 text-sm font-medium text-gray-500 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            <span class="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
              Page {{ pagination.page }} of {{ pagination.pages }}
            </span>

            <button 
              @click="goToPage(pagination.page + 1)" 
              :disabled="pagination.page >= pagination.pages"
              class="px-4 py-2 text-sm font-medium text-gray-500 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-12">
        <div class="w-16 h-16 mx-auto mb-4 text-gray-400">
          <Icon name="heroicons:document-text-20-solid" class="w-full h-full" />
        </div>
        <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
          No articles found
        </h3>
        <p class="text-gray-600 dark:text-gray-400 mb-4">
          {{ hasActiveFilters ? 'Try adjusting your search criteria.' : 'Check back soon for new content!' }}
        </p>
        <button v-if="hasActiveFilters" @click="clearAllFilters" class="utopia-button-primary">
          Clear Filters
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// Meta tags
useSeoMeta({
  title: 'Blog - Utopia Minds',
  description: 'Explore our latest articles on technology, innovation, and digital transformation. Discover insights that shape the future.',
  ogTitle: 'Blog - Utopia Minds',
  ogDescription: 'Explore our latest articles on technology, innovation, and digital transformation. Discover insights that shape the future.',
  ogType: 'website'
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
  limit: 9,
  total: 0,
  pages: 0
})
const categories = ref([])
const searchQuery = ref('')
const selectedCategory = ref('')

// Initialize filters from URL
onMounted(async () => {
  searchQuery.value = route.query.search || ''
  selectedCategory.value = route.query.category || ''
  pagination.value.page = parseInt(route.query.page) || 1

  await fetchBlogs()
})

// Watch for route changes
watch(() => route.query, async (newQuery) => {
  searchQuery.value = newQuery.search || ''
  selectedCategory.value = newQuery.category || ''
  pagination.value.page = parseInt(newQuery.page) || 1

  await fetchBlogs()
})

// Computed properties
const hasActiveFilters = computed(() => {
  return searchQuery.value || selectedCategory.value
})

const featuredPost = computed(() => {
  return blogs.value.find(post => post.featured) || null
})

const regularPosts = computed(() => {
  if (featuredPost.value && !hasActiveFilters.value) {
    return blogs.value.filter(post => post._id !== featuredPost.value._id)
  }
  return blogs.value
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
    if (selectedCategory.value) params.category = selectedCategory.value

    const result = await blogStore.fetchBlogs(params)

    if (result.success) {
      blogs.value = result.data.blogs
      pagination.value = result.data.pagination
      categories.value = result.data.filters.categories
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

  if (selectedCategory.value) {
    query.category = selectedCategory.value
  } else {
    delete query.category
  }

  // Reset to page 1 when applying filters
  delete query.page

  router.push({ query })
}

const clearSearch = () => {
  searchQuery.value = ''
  applyFilters()
}

const clearCategory = () => {
  selectedCategory.value = ''
  applyFilters()
}

const clearAllFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = ''
  router.push({ query: {} })
}

const goToPage = (page) => {
  if (page < 1 || page > pagination.value.pages) return

  const query = { ...route.query, page: page.toString() }
  if (page === 1) delete query.page

  router.push({ query })
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-clamp: 3;
}
</style>