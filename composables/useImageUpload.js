export const useImageUpload = () => {
  const uploading = ref(false)
  const uploadProgress = ref(0)

  const uploadImage = async (file) => {
    if (!file) {
      throw new Error('No file provided')
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.')
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      throw new Error('File too large. Maximum size is 5MB.')
    }

    uploading.value = true
    uploadProgress.value = 0

    try {
      const formData = new FormData()
      formData.append('image', file)

      // Get auth headers from store
      const authStore = useAuthStore()
      const authHeaders = authStore.getAuthHeaders()

      const response = await $fetch('/api/admin/upload-image', {
        method: 'POST',
        body: formData,
        headers: authHeaders,
        onUploadProgress: (progress) => {
          uploadProgress.value = Math.round((progress.loaded / progress.total) * 100)
        }
      })

      if (response.success) {
        return response.data.url
      } else {
        throw new Error(response.error || 'Upload failed')
      }
    } catch (error) {
      console.error('Upload error:', error)
      throw error
    } finally {
      uploading.value = false
      uploadProgress.value = 0
    }
  }

  const validateImageFile = (file) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
    const maxSize = 5 * 1024 * 1024 // 5MB

    if (!allowedTypes.includes(file.type)) {
      return { valid: false, error: 'Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.' }
    }

    if (file.size > maxSize) {
      return { valid: false, error: 'File too large. Maximum size is 5MB.' }
    }

    return { valid: true }
  }

  return {
    uploading: readonly(uploading),
    uploadProgress: readonly(uploadProgress),
    uploadImage,
    validateImageFile
  }
}