<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Admin Navigation -->
    <nav class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo and Admin Label -->
          <div class="flex items-center space-x-4">
            <NuxtLink to="/admin" class="flex items-center space-x-2">
              <div class="w-8 h-8 flex items-center justify-center">
                <img src="/assets/logomain.png" alt="Utopia Minds Logo" class="w-full h-full object-contain">
              </div>
              <span class="text-xl font-bold utopia-text-gradient">Utopia Minds</span>
            </NuxtLink>
            <span class="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs font-medium rounded-full">
              Admin
            </span>
          </div>

          <!-- Admin Navigation Links -->
          <div class="hidden md:flex items-center space-x-8">
            <NuxtLink 
              to="/admin"
              class="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              :class="{ 'text-purple-600 dark:text-purple-400': $route.path === '/admin' }"
            >
              Dashboard
            </NuxtLink>
            <NuxtLink 
              to="/admin/blogs"
              class="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              :class="{ 'text-purple-600 dark:text-purple-400': $route.path.startsWith('/admin/blogs') }"
            >
              Blogs
            </NuxtLink>
            <NuxtLink 
              to="/admin/blogs/create"
              class="utopia-button-primary text-sm"
            >
              New Post
            </NuxtLink>
          </div>

          <!-- User Menu -->
          <div class="flex items-center space-x-4">
            <!-- Dark Mode Toggle -->
            <button
              @click="toggleDarkMode"
              class="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
            >
              <Icon 
                :name="isDark ? 'heroicons:sun-20-solid' : 'heroicons:moon-20-solid'" 
                class="w-5 h-5 text-gray-600 dark:text-gray-300"
              />
            </button>

            <!-- User Dropdown -->
            <div class="relative" ref="userMenu">
              <button
                @click="userMenuOpen = !userMenuOpen"
                class="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <div class="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                  <span class="text-purple-600 dark:text-purple-400 font-semibold text-sm">
                    {{ authStore.user?.name?.charAt(0) || 'A' }}
                  </span>
                </div>
                <Icon name="heroicons:chevron-down-20-solid" class="w-4 h-4 text-gray-500" />
              </button>

              <!-- Dropdown Menu -->
              <div 
                v-show="userMenuOpen"
                class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50"
              >
                <div class="p-3 border-b border-gray-200 dark:border-gray-700">
                  <p class="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {{ authStore.user?.name || 'Admin User' }}
                  </p>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    {{ authStore.user?.email || 'admin@example.com' }}
                  </p>
                </div>
                
                <div class="py-1">
                  <NuxtLink
                    to="/"
                    class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    @click="userMenuOpen = false"
                  >
                    View Site
                  </NuxtLink>
                  <button
                    @click="logout"
                    class="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <slot />
    </main>
  </div>
</template>

<script setup>
// Store
const authStore = useAuthStore()

// Dark mode functionality
const isDark = ref(false)
const userMenuOpen = ref(false)
const userMenu = ref(null)

// Initialize dark mode from localStorage
onMounted(() => {
  isDark.value = localStorage.getItem('utopia-dark-mode') === 'true' || 
                 (!localStorage.getItem('utopia-dark-mode') && window.matchMedia('(prefers-color-scheme: dark)').matches)
  
  updateDarkMode()
  
  // Close user menu when clicking outside
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

const toggleDarkMode = () => {
  isDark.value = !isDark.value
  updateDarkMode()
  localStorage.setItem('utopia-dark-mode', isDark.value.toString())
}

const updateDarkMode = () => {
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

const handleClickOutside = (event) => {
  if (userMenu.value && !userMenu.value.contains(event.target)) {
    userMenuOpen.value = false
  }
}

const logout = () => {
  authStore.logout()
  userMenuOpen.value = false
}

// Redirect if not authenticated
const router = useRouter()
watchEffect(() => {
  if (!authStore.isAuthenticated && process.client) {
    router.push('/admin/login')
  }
})
</script>
