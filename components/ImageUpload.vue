<template>
  <div class="space-y-4">
    <!-- URL Input -->
    <div>
      <label :for="inputId" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {{ label }}
      </label>
      <input
        :id="inputId"
        v-model="imageUrl"
        type="url"
        :class="inputClasses"
        :placeholder="placeholder"
        @input="$emit('update:modelValue', imageUrl)"
      />
    </div>

    <!-- Upload Section -->
    <div class="flex items-center space-x-4">
      <span class="text-sm text-gray-500 dark:text-gray-400">or</span>
      
      <!-- File Input -->
      <div class="relative">
        <input
          ref="fileInput"
          type="file"
          accept="image/*"
          class="hidden"
          @change="handleFileSelect"
        />
        
        <button
          type="button"
          @click="$refs.fileInput.click()"
          :disabled="uploading"
          class="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Icon 
            :name="uploading ? 'heroicons:arrow-path-20-solid' : 'heroicons:photo-20-solid'" 
            :class="['w-4 h-4 mr-2', { 'animate-spin': uploading }]" 
          />
          {{ uploading ? 'Uploading...' : 'Upload Image' }}
        </button>
      </div>
    </div>

    <!-- Upload Progress -->
    <div v-if="uploading" class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
      <div 
        class="bg-purple-600 h-2 rounded-full transition-all duration-300"
        :style="{ width: `${uploadProgress}%` }"
      ></div>
      <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
        Uploading... {{ uploadProgress }}%
      </p>
    </div>

    <!-- Error Message -->
    <div v-if="error" class="text-sm text-red-600 dark:text-red-400">
      {{ error }}
    </div>

    <!-- Image Preview -->
    <div v-if="imageUrl && !uploading" class="mt-4">
      <img 
        :src="imageUrl" 
        :alt="previewAlt"
        class="w-full h-48 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
        @error="handleImageError"
        @load="handleImageLoad"
      />
      <div v-if="imageError" class="mt-2 text-sm text-red-600 dark:text-red-400">
        Failed to load image. Please check the URL or try uploading a different image.
      </div>
    </div>

    <!-- Help Text -->
    <p class="text-xs text-gray-500 dark:text-gray-400">
      {{ helpText }}
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: 'Cover Image'
  },
  placeholder: {
    type: String,
    default: 'https://example.com/image.jpg'
  },
  previewAlt: {
    type: String,
    default: 'Image preview'
  },
  helpText: {
    type: String,
    default: 'Enter an image URL or upload a file. Supported formats: JPEG, PNG, WebP, GIF. Max size: 5MB.'
  },
  inputClasses: {
    type: String,
    default: 'w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent'
  }
})

const emit = defineEmits(['update:modelValue'])

// Generate unique ID for the input
const inputId = `image-input-${Math.random().toString(36).substr(2, 9)}`

// Image upload composable
const { uploading, uploadProgress, uploadImage, validateImageFile } = useImageUpload()

// Reactive data
const imageUrl = ref(props.modelValue)
const error = ref('')
const imageError = ref(false)

// Watch for prop changes
watch(() => props.modelValue, (newValue) => {
  imageUrl.value = newValue
})

// Watch for image URL changes to reset error state
watch(imageUrl, () => {
  imageError.value = false
  error.value = ''
})

// Methods
const handleFileSelect = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  error.value = ''

  // Validate file
  const validation = validateImageFile(file)
  if (!validation.valid) {
    error.value = validation.error
    return
  }

  try {
    const uploadedUrl = await uploadImage(file)
    imageUrl.value = uploadedUrl
    emit('update:modelValue', uploadedUrl)
    
    // Clear the file input
    event.target.value = ''
  } catch (uploadError) {
    error.value = uploadError.message || 'Failed to upload image'
    console.error('Upload error:', uploadError)
  }
}

const handleImageError = () => {
  imageError.value = true
}

const handleImageLoad = () => {
  imageError.value = false
}
</script>