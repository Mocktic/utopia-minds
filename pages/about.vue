<template>
  <div class="py-20">
    <!-- Hero Section -->
    <section class="relative py-16 overflow-hidden">
      <!-- Background Elements -->
      <div
        class="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-900/20">
      </div>
      <div
        class="absolute top-10 left-10 w-64 h-64 bg-emerald-200/20 dark:bg-emerald-800/10 rounded-full blur-3xl animate-float">
      </div>
      <div
        class="absolute bottom-10 right-10 w-80 h-80 bg-indigo-200/20 dark:bg-indigo-800/10 rounded-full blur-3xl animate-float"
        style="animation-delay: -3s;"></div>

      <div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="mb-8">
          <div
            class="inline-flex items-center px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 text-sm font-medium mb-6 animate-fade-in">
            <span class="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></span>
            About Our Journey
          </div>
        </div>

        <h1
          class="text-5xl md:text-6xl font-playfair font-semibold text-slate-900 dark:text-slate-100 mb-8 animate-fade-in tracking-tight">
          Welcome to <span
            class="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">Utopia
            Minds</span>
        </h1>

        <p
          class="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed animate-fade-in">
          A journey into the depths of human consciousness, where psychology meets personal growth and mental wellness
          becomes a way of life.
        </p>
      </div>
    </section>

    <!-- Main Content -->
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Mission Section -->
      <div class="utopia-card-elevated p-8 md:p-12 mb-12 animate-slide-up">
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-8">
            <div
              class="w-16 h-16 mindfulness-gradient rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
              <Icon name="heroicons:heart-20-solid" class="w-8 h-8 text-white" />
            </div>
            <h2 class="text-4xl font-playfair font-semibold text-slate-900 dark:text-slate-100 mb-6 tracking-tight">
              Our Mission
            </h2>
          </div>

          <div class="prose prose-lg prose-slate dark:prose-invert max-w-none text-center">
            <p class="text-xl leading-relaxed mb-6">
              Utopia Minds isn't just another blog — it's a sanctuary for exploring the intricate landscape of human
              psychology.
              We delve into the science of emotions, uncover practical pathways to mental balance, and create a space
              where
              awareness flourishes alongside meaningful conversations.
            </p>
            <p class="text-lg leading-relaxed mb-6">
              Every article we publish stems from a fundamental belief: knowledge isn't merely for understanding — it's
              a
              powerful tool for healing, connecting with others, and living with greater purpose and fulfillment.
            </p>
            <p class="text-lg leading-relaxed">
              While we occasionally venture into the realm of technology (because our minds and the digital age are
              deeply interconnected), our heart remains focused on people — our struggles, our growth, and our
              remarkable capacity to learn and transform.
            </p>
          </div>
        </div>
      </div>

      <!-- What We Explore -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div class="utopia-card p-6 text-center animate-slide-up" style="animation-delay: 0.1s">
          <div class="w-12 h-12 mindfulness-gradient rounded-lg flex items-center justify-center mx-auto mb-4">
            <Icon name="heroicons:brain-20-solid" class="w-6 h-6 text-white" />
          </div>
          <h3 class="text-xl font-playfair font-semibold text-slate-900 dark:text-slate-100 mb-3">Psychology & Science
          </h3>
          <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
            Evidence-based insights into cognitive processes, emotional intelligence, and the fascinating workings of
            the human mind.
          </p>
        </div>

        <div class="utopia-card p-6 text-center animate-slide-up" style="animation-delay: 0.2s">
          <div class="w-12 h-12 mindfulness-gradient rounded-lg flex items-center justify-center mx-auto mb-4">
            <Icon name="heroicons:scale-20-solid" class="w-6 h-6 text-white" />
          </div>
          <h3 class="text-xl font-playfair font-semibold text-slate-900 dark:text-slate-100 mb-3">Mental Wellness</h3>
          <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
            Practical strategies for emotional balance, stress management, and cultivating resilience in our daily
            lives.
          </p>
        </div>

        <div class="utopia-card p-6 text-center animate-slide-up" style="animation-delay: 0.3s">
          <div class="w-12 h-12 mindfulness-gradient rounded-lg flex items-center justify-center mx-auto mb-4">
            <Icon name="heroicons:sparkles-20-solid" class="w-6 h-6 text-white" />
          </div>
          <h3 class="text-xl font-playfair font-semibold text-slate-900 dark:text-slate-100 mb-3">Personal Growth</h3>
          <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
            Exploring pathways to self-discovery, mindfulness practices, and the continuous journey of becoming our best
            selves.
          </p>
        </div>
      </div>

      <!-- Philosophy Section -->
      <div class="utopia-card p-8 mb-12 animate-slide-up" style="animation-delay: 0.4s">
        <h2 class="text-3xl font-playfair font-semibold text-slate-900 dark:text-slate-100 mb-6 text-center">Our
          Philosophy</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="space-y-6">
            <div>
              <h3 class="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3 flex items-center">
                <span class="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                Curiosity-Driven
              </h3>
              <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
                We believe that curiosity is the gateway to understanding. Every question about the mind is worth
                exploring,
                and every insight has the potential to spark transformation.
              </p>
            </div>
            <div>
              <h3 class="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3 flex items-center">
                <span class="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                Compassionate Approach
              </h3>
              <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
                Mental health and personal growth are deeply personal journeys. We approach every topic with empathy,
                understanding, and respect for individual experiences.
              </p>
            </div>
          </div>
          <div class="space-y-6">
            <div>
              <h3 class="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3 flex items-center">
                <span class="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                Evidence-Based
              </h3>
              <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
                While we honor personal experiences, our content is grounded in scientific research and proven
                methodologies
                that support mental wellness and psychological understanding.
              </p>
            </div>
            <div>
              <h3 class="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3 flex items-center">
                <span class="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                Community-Focused
              </h3>
              <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
                We're building a community where thoughts matter, journeys are honored, and minds are celebrated.
                Together, we explore the endless possibilities of human consciousness.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Inspiration Section -->
      <div class="text-center utopia-card-elevated p-8 md:p-12 animate-slide-up" style="animation-delay: 0.5s">
        <div class="max-w-3xl mx-auto">
          <div
            class="w-20 h-20 mindfulness-gradient rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <Icon name="heroicons:light-bulb-20-solid" class="w-10 h-10 text-white" />
          </div>

          <h2 class="text-4xl font-playfair font-semibold text-slate-900 dark:text-slate-100 mb-6 tracking-tight">
            A Gentle Reminder
          </h2>

          <div class="space-y-6 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            <p class="text-xl font-medium text-slate-800 dark:text-slate-200">
              Utopia Minds is here to remind you:
            </p>
            <p>
              Your thoughts matter. Your journey matters. Your mind is worth exploring.
            </p>
            <p>
              Whether you're seeking to understand the complexities of human emotion, looking for practical tools
              to enhance your mental wellness, or simply curious about the incredible capabilities of the human mind,
              you've found your sanctuary.
            </p>
            <p class="text-emerald-600 dark:text-emerald-400 font-medium">
              Welcome to a space where psychology meets possibility, and where every mind is celebrated as a universe
              of infinite potential.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Meta tags
useSeoMeta({
  title: 'About - Utopia Minds',
  description: 'Discover Utopia Minds - a journey into human psychology, mental wellness, and personal growth. Explore evidence-based insights for emotional balance and cognitive understanding.',
  ogTitle: 'About - Utopia Minds',
  ogDescription: 'Discover Utopia Minds - a journey into human psychology, mental wellness, and personal growth. Explore evidence-based insights for emotional balance and cognitive understanding.',
  ogType: 'website'
})
</script>
