export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(null)
  const loading = ref(false)

  // Initialize auth state from localStorage (client-side only)
  const initAuth = () => {
    if (import.meta.client) {
      const savedToken = localStorage.getItem('utopia-auth-token')
      const savedUser = localStorage.getItem('utopia-auth-user')

      if (savedToken && savedUser) {
        try {
          token.value = savedToken
          user.value = JSON.parse(savedUser)
        } catch (error) {
          console.error('Error parsing saved user data:', error)
          logout()
        }
      }
    }
  }

  // Login function
  const login = async (credentials) => {
    loading.value = true
    try {
      const data = await $fetch('/api/auth/login', {
        method: 'POST',
        body: credentials
      })

      token.value = data.token
      user.value = data.user

      // Save to localStorage (client-side only)
      if (import.meta.client) {
        localStorage.setItem('utopia-auth-token', data.token)
        localStorage.setItem('utopia-auth-user', JSON.stringify(data.user))
      }

      return { success: true }
    } catch (error) {
      console.error('Login error:', error)
      return {
        success: false,
        error: error.data?.message || 'Login failed'
      }
    } finally {
      loading.value = false
    }
  }

  // Logout function
  const logout = () => {
    user.value = null
    token.value = null

    // Clear localStorage (client-side only)
    if (import.meta.client) {
      localStorage.removeItem('utopia-auth-token')
      localStorage.removeItem('utopia-auth-user')
    }

    // Redirect to login page
    navigateTo('/admin/login')
  }

  // Check if user is authenticated
  const isAuthenticated = computed(() => {
    return !!token.value && !!user.value
  })

  // Get authorization headers
  const getAuthHeaders = () => {
    return token.value ? { Authorization: `Bearer ${token.value}` } : {}
  }

  // Initialize on store creation
  initAuth()

  return {
    user: readonly(user),
    token: readonly(token),
    loading: readonly(loading),
    isAuthenticated,
    login,
    logout,
    getAuthHeaders,
    initAuth
  }
})
