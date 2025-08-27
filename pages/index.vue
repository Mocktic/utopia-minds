<template>
  <div>
    <!-- Hero Section -->
    <section class="relative py-24 md:py-32 overflow-hidden">
      <!-- Background Elements -->
      <div class="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-900/20"></div>
      <div class="absolute top-20 left-10 w-72 h-72 bg-emerald-200/30 dark:bg-emerald-800/20 rounded-full blur-3xl animate-float"></div>
      <div class="absolute bottom-20 right-10 w-96 h-96 bg-indigo-200/30 dark:bg-indigo-800/20 rounded-full blur-3xl animate-float" style="animation-delay: -3s;"></div>
      
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center animate-fade-in">
          <div class="mb-8">
            <div class="inline-flex items-center px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 text-sm font-medium mb-6">
              <span class="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></span>
              Psychology & Mental Wellness
            </div>
          </div>
          
          <h1 class="text-5xl md:text-7xl font-playfair font-semibold mb-8 text-slate-900 dark:text-slate-100 tracking-tight text-balance">
            Understanding the 
            <span class="relative">
              <span class="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">Mind</span>
              <div class="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-full opacity-30"></div>
            </span>
          </h1>
          
          <p class="text-xl md:text-2xl mb-12 text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed text-balance">
            Explore evidence-based insights into psychology, mental health, and personal growth. 
            Discover practical strategies for emotional well-being and cognitive enhancement.
          </p>
          
          <div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <NuxtLink 
              to="/blog" 
              class="utopia-button-primary group"
            >
              Explore Articles
              <Icon name="heroicons:arrow-right-20-solid" class="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </NuxtLink>
            <button 
              @click="scrollToNewsletter"
              class="utopia-button-ghost"
            >
              <Icon name="heroicons:envelope-20-solid" class="mr-2 w-5 h-5" />
              Stay Updated
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Post Section -->
    <section v-if="featuredPost" class="py-20 relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-playfair font-semibold text-slate-900 dark:text-slate-100 mb-6 tracking-tight">
            Featured Insight
          </h2>
          <p class="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Deep dive into our most impactful psychological research and practical applications
          </p>
        </div>

        <div class="utopia-card-elevated max-w-5xl mx-auto animate-slide-up overflow-hidden">
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
                  Featured
                </span>
                <span class="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-full">
                  {{ featuredPost.category }}
                </span>
                <span class="text-sm text-slate-500 dark:text-slate-400">
                  {{ formatDate(featuredPost.createdAt) }}
                </span>
              </div>
              
              <h3 class="text-3xl lg:text-4xl font-playfair font-semibold text-slate-900 dark:text-slate-100 mb-6 leading-tight">
                {{ featuredPost.title }}
              </h3>
              
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
    </section>

    <!-- Recent Posts Section -->
    <section class="py-20 bg-slate-50/50 dark:bg-slate-900/50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-playfair font-semibold text-slate-900 dark:text-slate-100 mb-6 tracking-tight">
            Latest Insights
          </h2>
          <p class="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Discover evidence-based approaches to mental wellness and psychological understanding
          </p>
        </div>

        <div v-if="loading" class="text-center py-16">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-emerald-200 border-t-emerald-600 dark:border-emerald-800 dark:border-t-emerald-400"></div>
          <p class="mt-4 text-slate-600 dark:text-slate-400 font-medium">Loading insights...</p>
        </div>

        <div v-else-if="recentPosts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article 
            v-for="(post, index) in recentPosts" 
            :key="post._id"
            class="utopia-card group hover:scale-105 transition-all duration-500 animate-slide-up"
            :style="{ animationDelay: `${index * 0.1}s` }"
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

        <div class="text-center mt-16">
          <NuxtLink 
            to="/blog"
            class="utopia-button-primary"
          >
            Explore All Articles
            <Icon name="heroicons:arrow-right-20-solid" class="ml-2 w-5 h-5" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Newsletter Section -->
    <section id="newsletter" class="py-20 relative overflow-hidden">
      <!-- Background Elements -->
      <div class="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-900/20"></div>
      <div class="absolute top-0 left-1/4 w-96 h-96 bg-emerald-200/20 dark:bg-emerald-800/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-200/20 dark:bg-indigo-800/10 rounded-full blur-3xl"></div>
      
      <div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="utopia-card-elevated p-12">
          <div class="mb-8">
            <div class="w-16 h-16 mindfulness-gradient rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
              <Icon name="heroicons:envelope-20-solid" class="w-8 h-8 text-white" />
            </div>
            <h2 class="text-4xl font-playfair font-semibold text-slate-900 dark:text-slate-100 mb-4 tracking-tight">
              Stay Connected
            </h2>
            <p class="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Receive thoughtful insights on psychology, mental wellness, and personal growth. 
              Join our community of mindful readers.
            </p>
          </div>
          
          <form @submit.prevent="subscribeToNewsletter" class="max-w-lg mx-auto">
            <div class="flex flex-col sm:flex-row gap-4">
              <input 
                v-model="newsletterEmail"
                type="email" 
                placeholder="Enter your email address"
                required
                class="flex-1 px-6 py-4 border border-slate-300 dark:border-slate-600 rounded-2xl bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 placeholder:text-slate-400"
              />
              <button 
                type="submit"
                :disabled="newsletterLoading"
                class="utopia-button-primary disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                <span v-if="newsletterLoading" class="flex items-center">
                  <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Subscribing...
                </span>
                <span v-else class="flex items-center">
                  Subscribe
                  <Icon name="heroicons:paper-airplane-20-solid" class="ml-2 w-5 h-5" />
                </span>
              </button>
            </div>
          </form>
          
          <div v-if="newsletterMessage" class="mt-6 p-4 rounded-xl" :class="newsletterSuccess ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-300' : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300'">
            <p class="font-medium">{{ newsletterMessage }}</p>
          </div>
          
          <p class="mt-6 text-sm text-slate-500 dark:text-slate-400">
            No spam, ever. Unsubscribe at any time. We respect your privacy.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// Meta tags
useSeoMeta({
  title: 'Utopia Minds - Nurturing minds, fostering growth',
  description: 'Utopia Minds is here to remind you: your thoughts matter, your journey matters, and your mind is worth exploring.',
  ogTitle: 'Utopia Minds - Nurturing minds, fostering growth',
  ogDescription: 'Utopia Minds is here to remind you: your thoughts matter, your journey matters, and your mind is worth exploring.',
  ogType: 'website',
  twitterCard: 'summary_large_image'
})

// Store
const blogStore = useBlogStore()

// Reactive data
const loading = ref(true)
const recentPosts = ref([])
const featuredPost = ref(null)
const newsletterEmail = ref('')
const newsletterLoading = ref(false)
const newsletterMessage = ref('')
const newsletterSuccess = ref(false)

// Fetch data on mount
onMounted(async () => {
  try {
    // Fetch recent posts
    const result = await blogStore.fetchBlogs({ limit: 6 })
    if (result.success) {
      recentPosts.value = result.data.blogs
      
      // Find featured post (first one with featured flag, or just the most recent)
      featuredPost.value = result.data.blogs.find(post => post.featured) || result.data.blogs[0]
      
      // Remove featured post from recent posts if it exists there
      if (featuredPost.value) {
        recentPosts.value = recentPosts.value.filter(post => post._id !== featuredPost.value._id).slice(0, 6)
      }
    }
  } catch (error) {
    console.error('Error loading homepage data:', error)
  } finally {
    loading.value = false
  }
})

// Helper functions
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const scrollToNewsletter = () => {
  document.getElementById('newsletter').scrollIntoView({ 
    behavior: 'smooth' 
  })
}

const subscribeToNewsletter = async () => {
  if (!newsletterEmail.value) return
  
  newsletterLoading.value = true
  newsletterMessage.value = ''
  
  try {
    const data = await $fetch('/api/newsletter/subscribe', {
      method: 'POST',
      body: { email: newsletterEmail.value }
    })
    
    newsletterSuccess.value = true
    newsletterMessage.value = data.message
    newsletterEmail.value = ''
  } catch (error) {
    newsletterSuccess.value = false
    newsletterMessage.value = error.data?.message || 'Something went wrong. Please try again later.'
  } finally {
    newsletterLoading.value = false
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
