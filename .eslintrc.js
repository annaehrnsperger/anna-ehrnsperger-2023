module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'prettier'],
  plugins: [],
  rules: {
    'vue/multi-word-component-names': 0, 
    'vue/require-default-prop': 0,
    'no-unused-vars': 1,
    'vue/no-unused-components': 1
  },
}
