<template>
  <div
    class="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
    <!-- Navigation -->
    <nav
      class="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm border-b border-slate-200/50 dark:border-slate-700/50 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-20">
          <!-- Logo -->
          <NuxtLink to="/" class="flex items-center space-x-3 group">
            <div
              class="w-10 h-10 flex items-center justify-center transition-all duration-300 group-hover:scale-105">
              <img src="/assets/logomain.png" alt="Utopia Minds Logo" class="w-full h-full object-contain">
            </div>
            <div class="flex flex-col">
              <span
                class="text-2xl font-playfair font-semibold text-slate-900 dark:text-slate-100 tracking-tight">Utopia
                Minds</span>
              <span class="text-xs text-slate-500 dark:text-slate-400 font-medium tracking-wide">Psychology &
                Wellness</span>
            </div>
          </NuxtLink>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center space-x-1">
            <NuxtLink to="/"
              class="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 font-medium">
              Home
            </NuxtLink>
            <NuxtLink to="/blog"
              class="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 font-medium">
              Articles
            </NuxtLink>
            <NuxtLink to="/about"
              class="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 font-medium">
              About
            </NuxtLink>

            <!-- Dark Mode Toggle -->
            <button @click="toggleDarkMode"
              class="ml-4 p-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300 hover:scale-105"
              :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'">
              <Icon :name="isDark ? 'heroicons:sun-20-solid' : 'heroicons:moon-20-solid'"
                class="w-5 h-5 text-slate-600 dark:text-slate-300" />
            </button>
          </div>

          <!-- Mobile Menu Button -->
          <div class="md:hidden flex items-center space-x-2">
            <!-- Dark Mode Toggle (Mobile) -->
            <button @click="toggleDarkMode"
              class="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300">
              <Icon :name="isDark ? 'heroicons:sun-20-solid' : 'heroicons:moon-20-solid'"
                class="w-5 h-5 text-slate-600 dark:text-slate-300" />
            </button>

            <button @click="mobileMenuOpen = !mobileMenuOpen"
              class="p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300">
              <Icon :name="mobileMenuOpen ? 'heroicons:x-mark-20-solid' : 'heroicons:bars-3-20-solid'"
                class="w-6 h-6 text-slate-600 dark:text-slate-300" />
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Navigation Menu -->
      <div v-show="mobileMenuOpen"
        class="md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200/50 dark:border-slate-700/50">
        <div class="px-4 py-4 space-y-2">
          <NuxtLink to="/" @click="mobileMenuOpen = false"
            class="block px-4 py-3 rounded-xl text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 font-medium">
            Home
          </NuxtLink>
          <NuxtLink to="/blog" @click="mobileMenuOpen = false"
            class="block px-4 py-3 rounded-xl text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 font-medium">
            Articles
          </NuxtLink>
          <NuxtLink to="/about" @click="mobileMenuOpen = false"
            class="block px-4 py-3 rounded-xl text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 font-medium">
            About
          </NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- Footer -->
    <footer
      class="bg-slate-100/50 dark:bg-slate-900/50 backdrop-blur-sm border-t border-slate-200/50 dark:border-slate-700/50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
          <!-- Brand -->
          <div class="md:col-span-2">
            <div class="flex items-center space-x-3 mb-6">
              <div class="w-12 h-12 flex items-center justify-center">
                <img src="/assets/logomain.png" alt="Utopia Minds Logo" class="w-full h-full object-contain">
              </div>
              <div class="flex flex-col">
                <span
                  class="text-2xl font-playfair font-semibold text-slate-900 dark:text-slate-100 tracking-tight">Utopia
                  Minds</span>
                <span class="text-sm text-slate-500 dark:text-slate-400 font-medium">Psychology & Wellness</span>
              </div>
            </div>
            <p class="text-slate-600 dark:text-slate-400 mb-6 max-w-lg leading-relaxed">
              Exploring the depths of human psychology, mental wellness, and personal growth.
              Join us on a journey toward understanding the mind and nurturing emotional well-being.
            </p>
            <div class="flex space-x-4">
              <a href="mailto:hello@utopiaminds.com"
                class="p-3 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all duration-300">
                <Icon name="heroicons:envelope-20-solid" class="w-5 h-5" />
              </a>
              <a href="/rss.xml"
                class="p-3 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all duration-300">
                <Icon name="heroicons:rss-20-solid" class="w-5 h-5" />
              </a>
            </div>
          </div>

          <!-- Quick Links -->
          <div>
            <h3 class="text-lg font-playfair font-semibold text-slate-900 dark:text-slate-100 mb-6">Navigate</h3>
            <ul class="space-y-3">
              <li>
                <NuxtLink to="/"
                  class="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium">
                  Home
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/blog"
                  class="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium">
                  Articles
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/about"
                  class="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium">
                  About
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/privacy"
                  class="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium">
                  Privacy Policy
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>

        <!-- Copyright -->
        <div class="mt-12 pt-8 border-t border-slate-200/50 dark:border-slate-700/50">
          <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p class="text-slate-500 dark:text-slate-400 text-sm">
              © {{ new Date().getFullYear() }} Utopia Minds. Nurturing minds, fostering growth.
            </p>
            <p class="text-slate-400 dark:text-slate-500 text-xs">
              Professional psychology content for educational purposes
            </p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
// Dark mode functionality
const isDark = ref(false)
const mobileMenuOpen = ref(false)

// Initialize dark mode from localStorage
onMounted(() => {
  isDark.value = localStorage.getItem('utopia-dark-mode') === 'true' ||
    (!localStorage.getItem('utopia-dark-mode') && window.matchMedia('(prefers-color-scheme: dark)').matches)

  updateDarkMode()
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

// Close mobile menu when clicking outside
const handleClickOutside = (event) => {
  if (mobileMenuOpen.value && !event.target.closest('nav')) {
    mobileMenuOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
