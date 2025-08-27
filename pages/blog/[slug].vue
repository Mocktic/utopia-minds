<template>
  <div v-if="loading" class="py-12 text-center">
    <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
    <p class="mt-2 text-gray-600 dark:text-gray-400">Loading article...</p>
  </div>

  <div v-else-if="error" class="py-12 text-center">
    <div class="w-16 h-16 mx-auto mb-4 text-red-400">
      <Icon name="heroicons:exclamation-triangle-20-solid" class="w-full h-full" />
    </div>
    <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
      Article Not Found
    </h1>
    <p class="text-gray-600 dark:text-gray-400 mb-8">
      {{ error }}
    </p>
    <NuxtLink to="/blog" class="utopia-button-primary">
      Back to Blog
    </NuxtLink>
  </div>

  <article v-else class="py-12">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Article Header -->
      <header class="mb-8 animate-fade-in">
        <div class="flex items-center space-x-4 mb-6">
          <span class="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-sm font-medium rounded-full">
            {{ blog.category }}
          </span>
          <span class="text-sm text-gray-500 dark:text-gray-400">
            {{ formatDate(blog.createdAt) }}
          </span>
          <span class="text-sm text-gray-500 dark:text-gray-400">
            {{ blog.readingTime }}
          </span>
          <span class="text-sm text-gray-500 dark:text-gray-400">
            {{ blog.views }} views
          </span>
        </div>

        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          {{ blog.title }}
        </h1>

        <p class="text-xl text-gray-600 dark:text-gray-400 mb-8">
          {{ blog.excerpt }}
        </p>

        <!-- Author Info -->
        <div class="flex items-center space-x-4 mb-8">
          <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
            <span class="text-purple-600 dark:text-purple-400 font-semibold">
              {{ blog.author.name.charAt(0) }}
            </span>
          </div>
          <div>
            <p class="font-medium text-gray-900 dark:text-gray-100">
              {{ blog.author.name }}
            </p>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Published on {{ formatDate(blog.createdAt) }}
            </p>
          </div>
        </div>

        <!-- Cover Image -->
        <div v-if="blog.coverImage" class="mb-8">
          <img 
            :src="blog.coverImage" 
            :alt="blog.title"
            class="w-full h-64 md:h-96 object-cover rounded-xl"
          />
        </div>
      </header>      <!--
 Article Content -->
      <div class="prose-utopia animate-slide-up" style="animation-delay: 0.2s" v-html="renderedContent">
      </div>

      <!-- Tags -->
      <div v-if="blog.tags && blog.tags.length > 0" class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 animate-slide-up" style="animation-delay: 0.3s">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Tags</h3>
        <div class="flex flex-wrap gap-2">
          <NuxtLink 
            v-for="tag in blog.tags" 
            :key="tag"
            :to="`/blog?tag=${encodeURIComponent(tag)}`"
            class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full hover:bg-purple-100 dark:hover:bg-purple-900 hover:text-purple-800 dark:hover:text-purple-200 transition-colors"
          >
            #{{ tag }}
          </NuxtLink>
        </div>
      </div>

      <!-- Share Buttons -->
      <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 animate-slide-up" style="animation-delay: 0.4s">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Share this article</h3>
        <div class="flex space-x-4">
          <button 
            @click="shareOnTwitter"
            class="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Icon name="heroicons:share-20-solid" class="w-4 h-4" />
            <span>Twitter</span>
          </button>
          
          <button 
            @click="shareOnLinkedIn"
            class="flex items-center space-x-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
          >
            <Icon name="heroicons:share-20-solid" class="w-4 h-4" />
            <span>LinkedIn</span>
          </button>
          
          <button 
            @click="copyLink"
            class="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <Icon name="heroicons:link-20-solid" class="w-4 h-4" />
            <span>{{ linkCopied ? 'Copied!' : 'Copy Link' }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Related Posts -->
    <section v-if="relatedPosts.length > 0" class="mt-16 py-16 bg-gray-50 dark:bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center animate-slide-up">
          Related Articles
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <article 
            v-for="(post, index) in relatedPosts" 
            :key="post._id"
            class="utopia-card p-6 animate-slide-up"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <div class="mb-4">
              <img 
                :src="post.coverImage || '/api/placeholder/400/250'"
                :alt="post.title"
                class="w-full h-48 object-cover rounded-lg"
              />
            </div>
            
            <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
              {{ post.title }}
            </h3>
            
            <p class="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
              {{ post.excerpt }}
            </p>
            
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-500 dark:text-gray-400">
                {{ post.readingTime }}
              </span>
              
              <NuxtLink 
                :to="`/blog/${post.slug}`"
                class="text-purple-600 dark:text-purple-400 hover:underline font-medium"
              >
                Read →
              </NuxtLink>
            </div>
          </article>
        </div>
      </div>
    </section>
  </article>
</template>

<script setup>
// Store and composables
const blogStore = useBlogStore()
const route = useRoute()
const config = useRuntimeConfig()

// Get slug from route
const slug = computed(() => route.params.slug)

// Reactive data
const loading = ref(true)
const error = ref(null)
const blog = ref(null)
const relatedPosts = ref([])
const linkCopied = ref(false)

// Load blog data on mount
onMounted(async () => {
  await loadBlog()
})

// Computed properties
const renderedContent = computed(() => {
  // Since we're now using a rich text editor that outputs HTML,
  // we can directly use the content without markdown parsing
  return blog.value?.content || ''
})

// Methods
const loadBlog = async () => {
  loading.value = true
  error.value = null
  
  try {
    const result = await blogStore.fetchBlogBySlug(slug.value)
    
    if (result.success) {
      blog.value = result.data.blog
      relatedPosts.value = result.data.relatedPosts || []
      
      // Set meta tags
      useSeoMeta({
        title: `${blog.value.title} - Utopia Minds`,
        description: blog.value.excerpt,
        ogTitle: blog.value.title,
        ogDescription: blog.value.excerpt,
        ogImage: blog.value.coverImage,
        ogType: 'article',
        articleAuthor: blog.value.author.name,
        articlePublishedTime: blog.value.createdAt,
        articleModifiedTime: blog.value.updatedAt,
        articleTag: blog.value.tags,
        twitterCard: 'summary_large_image',
        twitterTitle: blog.value.title,
        twitterDescription: blog.value.excerpt,
        twitterImage: blog.value.coverImage
      })
    } else {
      error.value = result.error || 'Article not found'
    }
  } catch (err) {
    console.error('Error loading blog:', err)
    error.value = 'An error occurred while loading the article'
  } finally {
    loading.value = false
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const shareOnTwitter = () => {
  const url = `${config.public.appUrl}/blog/${slug.value}`
  const text = `Check out this article: ${blog.value.title}`
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
  window.open(twitterUrl, '_blank')
}

const shareOnLinkedIn = () => {
  const url = `${config.public.appUrl}/blog/${slug.value}`
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
  window.open(linkedInUrl, '_blank')
}

const copyLink = async () => {
  const url = `${config.public.appUrl}/blog/${slug.value}`
  
  try {
    await navigator.clipboard.writeText(url)
    linkCopied.value = true
    setTimeout(() => {
      linkCopied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy link:', err)
  }
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