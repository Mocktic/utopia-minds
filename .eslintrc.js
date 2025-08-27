module.exports = {
  root: true,
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'prettier'
  ],
  rules: {
    // Add custom rules here
    'vue/multi-word-component-names': 'off'
  }
}
