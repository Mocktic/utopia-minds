<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <!-- Header -->
      <div class="text-center">
        <div class="flex justify-center">
          <div class="w-16 h-16 flex items-center justify-center">
            <img src="/assets/logomain.png" alt="Utopia Minds Logo" class="w-full h-full object-contain">
          </div>
        </div>
        <h2 class="mt-6 text-3xl font-bold utopia-text-gradient">
          Admin Login
        </h2>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Sign in to manage your Utopia Minds blog
        </p>
      </div>

      <!-- Login Form -->
      <div class="utopia-card p-8">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>

          <!-- Password -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Password
            </label>
            <div class="relative">
              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                required
                class="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your password"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <Icon 
                  :name="showPassword ? 'heroicons:eye-slash-20-solid' : 'heroicons:eye-20-solid'" 
                  class="w-5 h-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                />
              </button>
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="error" class="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div class="flex items-center">
              <Icon name="heroicons:exclamation-triangle-20-solid" class="w-5 h-5 text-red-600 dark:text-red-400 mr-2" />
              <p class="text-sm text-red-600 dark:text-red-400">{{ error }}</p>
            </div>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full utopia-button-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ loading ? 'Signing in...' : 'Sign In' }}
          </button>
        </form>

        <!-- Footer -->
        <div class="mt-6 text-center">
          <NuxtLink 
            to="/"
            class="text-sm text-purple-600 dark:text-purple-400 hover:underline"
          >
            ← Back to Blog
          </NuxtLink>
        </div>
      </div>

      <!-- Security Notice -->
      <div class="text-center">
        <p class="text-xs text-gray-500 dark:text-gray-400">
          This is a secure admin area. Only authorized users can access this page.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
// Meta and layout
useSeoMeta({
  title: 'Admin Login - Utopia Minds',
  robots: 'noindex, nofollow'
})

definePageMeta({
  layout: false
})

// Store and composables
const authStore = useAuthStore()
const router = useRouter()

// Reactive data
const loading = ref(false)
const error = ref('')
const showPassword = ref(false)

const form = ref({
  email: '',
  password: ''
})

// Redirect if already authenticated
onMounted(() => {
  if (authStore.isAuthenticated) {
    router.push('/admin')
  }
})

// Handle login
const handleLogin = async () => {
  if (loading.value) return
  
  loading.value = true
  error.value = ''
  
  try {
    const result = await authStore.login(form.value)
    
    if (result.success) {
      // Redirect to admin dashboard
      router.push('/admin')
    } else {
      error.value = result.error || 'Login failed. Please try again.'
    }
  } catch (err) {
    console.error('Login error:', err)
    error.value = 'An unexpected error occurred. Please try again.'
  } finally {
    loading.value = false
  }
}

// Clear error when form changes
watch(() => [form.value.email, form.value.password], () => {
  if (error.value) {
    error.value = ''
  }
})
</script>