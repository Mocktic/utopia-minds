export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxt/icon'
  ],
  compatibilityDate: '2025-08-27',
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET,
    mongodbUri: process.env.MONGODB_URI,
    public: {
      appUrl: process.env.NUXT_PUBLIC_APP_URL || 'http://localhost:3000'
    }
  },
  nitro: {
    experimental: {
      wasm: true
    }
  },
  app: {
    head: {
      title: 'Utopia Minds - Nurturing minds, fostering growth',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Utopia Minds is here to remind you- your thoughts matter, your journey matters, and your mind is worth exploring.' },
        { name: 'author', content: 'Utopia Minds' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'Utopia Minds - Nurturing minds, fostering growth' },
        { property: 'og:description', content: 'Utopia Minds is here to remind you, your thoughts matter, your journey matters, and your mind is worth exploring.' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Utopia Minds - Nurturing minds, fostering growth' },
        { name: 'twitter:description', content: 'Utopia Minds is here to remind you- your thoughts matter, your journey matters, and your mind is worth exploring.' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'apple-touch-icon', href: '/favicon.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap' }
      ]
    }
  }
})
