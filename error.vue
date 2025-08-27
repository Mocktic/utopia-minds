<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full text-center">
      <!-- Error Icon -->
      <div class="flex justify-center mb-8">
        <div class="w-24 h-24 utopia-gradient rounded-full flex items-center justify-center">
          <Icon name="heroicons:exclamation-triangle-20-solid" class="w-12 h-12 text-white" />
        </div>
      </div>

      <!-- Error Message -->
      <h1 class="text-6xl font-bold utopia-text-gradient mb-4">
        {{ error.statusCode }}
      </h1>
      
      <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        {{ getErrorTitle() }}
      </h2>
      
      <p class="text-gray-600 dark:text-gray-400 mb-8">
        {{ getErrorMessage() }}
      </p>

      <!-- Actions -->
      <div class="space-y-4">
        <NuxtLink 
          to="/"
          class="utopia-button-primary w-full"
        >
          Go Home
        </NuxtLink>
        
        <button 
          @click="handleError"
          class="utopia-button-secondary w-full"
        >
          Try Again
        </button>
      </div>

      <!-- Additional Help -->
      <div class="mt-8 text-sm text-gray-500 dark:text-gray-400">
        <p>If this problem persists, please contact support.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// Props
const props = defineProps({
  error: Object
})

// Meta
useSeoMeta({
  title: `Error ${props.error?.statusCode || 500} - Utopia Minds`,
  robots: 'noindex, nofollow'
})

// Methods
const getErrorTitle = () => {
  switch (props.error?.statusCode) {
    case 404:
      return 'Page Not Found'
    case 500:
      return 'Server Error'
    case 403:
      return 'Access Forbidden'
    case 401:
      return 'Unauthorized'
    default:
      return 'Something Went Wrong'
  }
}

const getErrorMessage = () => {
  switch (props.error?.statusCode) {
    case 404:
      return "The page you're looking for doesn't exist or has been moved."
    case 500:
      return "We're experiencing some technical difficulties. Please try again later."
    case 403:
      return "You don't have permission to access this resource."
    case 401:
      return "You need to be logged in to access this page."
    default:
      return "An unexpected error occurred. We're working to fix it."
  }
}

const handleError = () => {
  // Clear error and try to recover
  clearError({ redirect: '/' })
}
</script>