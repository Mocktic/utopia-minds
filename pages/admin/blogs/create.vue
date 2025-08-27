<template>
  <div class="max-w-4xl mx-auto space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Create Article
        </h1>
        <p class="mt-2 text-gray-600 dark:text-gray-400">
          Write and publish a new blog post.
        </p>
      </div>
      
      <NuxtLink 
        to="/admin/blogs"
        class="utopia-button-secondary"
      >
        <Icon name="heroicons:arrow-left-20-solid" class="w-5 h-5 mr-2" />
        Back to Articles
      </NuxtLink>
    </div>

    <!-- Form -->
    <form @submit.prevent="saveBlog" class="space-y-6">
      <!-- Title -->
      <div class="utopia-card p-6">
        <label for="title" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Title *
        </label>
        <input
          id="title"
          v-model="form.title"
          type="text"
          required
          class="w-full px-4 py-3 text-lg border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="Enter article title..."
        />
      </div>

      <!-- Excerpt -->
      <div class="utopia-card p-6">
        <label for="excerpt" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Excerpt
        </label>
        <textarea
          id="excerpt"
          v-model="form.excerpt"
          rows="3"
          class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="Brief description of the article..."
        ></textarea>
        <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
          A short summary that will appear in article previews and search results.
        </p>
      </div>

      <!-- Cover Image -->
      <div class="utopia-card p-6">
        <label for="coverImage" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Cover Image URL
        </label>
        <input
          id="coverImage"
          v-model="form.coverImage"
          type="url"
          class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="https://example.com/image.jpg"
        />
        <div v-if="form.coverImage" class="mt-4">
          <img 
            :src="form.coverImage" 
            :alt="form.title"
            class="w-full h-48 object-cover rounded-lg"
            @error="imageError = true"
          />
          <p v-if="imageError" class="mt-2 text-sm text-red-600 dark:text-red-400">
            Failed to load image. Please check the URL.
          </p>
        </div>
      </div>

      <!-- Category and Tags -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="utopia-card p-6">
          <label for="category" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Category
          </label>
          <input
            id="category"
            v-model="form.category"
            type="text"
            class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="e.g., Technology, Design, Tutorial"
          />
        </div>

        <div class="utopia-card p-6">
          <label for="tags" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Tags
          </label>
          <input
            id="tags"
            v-model="tagsInput"
            type="text"
            class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="javascript, vue, tutorial (comma separated)"
          />
          <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Separate tags with commas
          </p>
        </div>
      </div>

      <!-- Content -->
      <div class="utopia-card p-6">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Content *
        </label>
        <RichTextEditor 
          v-model="form.content"
          placeholder="Start writing your article content..."
        />
        <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Use the toolbar above to format your content with headings, lists, links, and more.
        </p>
      </div>

      <!-- Settings -->
      <div class="utopia-card p-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Publication Settings
        </h3>
        
        <div class="space-y-4">
          <!-- Status -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Status
            </label>
            <div class="flex space-x-4">
              <label class="flex items-center">
                <input
                  v-model="form.status"
                  type="radio"
                  value="draft"
                  class="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                />
                <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Draft</span>
              </label>
              <label class="flex items-center">
                <input
                  v-model="form.status"
                  type="radio"
                  value="published"
                  class="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                />
                <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Published</span>
              </label>
            </div>
          </div>

          <!-- Featured -->
          <div>
            <label class="flex items-center">
              <input
                v-model="form.featured"
                type="checkbox"
                class="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                Featured article (will appear prominently on homepage)
              </span>
            </label>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex justify-end space-x-4">
        <NuxtLink 
          to="/admin/blogs"
          class="utopia-button-secondary"
        >
          Cancel
        </NuxtLink>
        
        <button
          type="button"
          @click="saveDraft"
          :disabled="saving"
          class="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ saving && form.status === 'draft' ? 'Saving...' : 'Save as Draft' }}
        </button>
        
        <button
          type="submit"
          :disabled="saving"
          class="utopia-button-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ saving ? 'Publishing...' : 'Publish Article' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
// Meta and layout
useSeoMeta({
  title: 'Create Article - Admin - Utopia Minds',
  robots: 'noindex, nofollow'
})

definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})

// Store and composables
const blogStore = useBlogStore()
const router = useRouter()

// Reactive data
const saving = ref(false)
const imageError = ref(false)

const form = ref({
  title: '',
  excerpt: '',
  content: '',
  coverImage: '',
  category: '',
  status: 'draft',
  featured: false
})

const tagsInput = ref('')

// Watch for image URL changes to reset error state
watch(() => form.value.coverImage, () => {
  imageError.value = false
})



// Methods
const saveBlog = async () => {
  form.value.status = 'published'
  await submitForm()
}

const saveDraft = async () => {
  form.value.status = 'draft'
  await submitForm()
}

const submitForm = async () => {
  if (saving.value) return
  
  saving.value = true
  
  try {
    // Prepare form data
    const blogData = {
      ...form.value,
      tags: tagsInput.value
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0)
    }
    
    const result = await blogStore.createBlog(blogData)
    
    if (result.success) {
      // Redirect to blog list or edit page
      if (form.value.status === 'published') {
        router.push('/admin/blogs')
      } else {
        router.push(`/admin/blogs/${result.data.blog._id}/edit`)
      }
    } else {
      console.error('Failed to save blog:', result.error)
      // You might want to show a toast notification here
    }
  } catch (error) {
    console.error('Error saving blog:', error)
  } finally {
    saving.value = false
  }
}

// Auto-save draft functionality (optional)
let autoSaveTimeout
const autoSave = () => {
  if (!form.value.title || !form.value.content) return
  
  clearTimeout(autoSaveTimeout)
  autoSaveTimeout = setTimeout(async () => {
    if (form.value.status === 'draft') {
      // Auto-save logic here
      console.log('Auto-saving draft...')
    }
  }, 30000) // Auto-save every 30 seconds
}

// Watch for content changes to trigger auto-save
watch([() => form.value.title, () => form.value.content], autoSave)

// Cleanup on unmount
onUnmounted(() => {
  clearTimeout(autoSaveTimeout)
})
</script>