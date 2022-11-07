export default {
  target: 'static',

  server: {
    host: '0.0.0.0',
  },

  head: {
    title: 'Anna Ehrnsperger',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
  },

  generate: {
    fallback: true
  },

  dir: {
    assets: 'src/assets',
    app: 'src/app',
    layouts: 'src/layouts',
    middleware: 'src/middleware',
    pages: 'src/pages',
    static: 'src/static',
    store: 'src/store'
  },

  css: [
    '@/src/assets/styles/index.css',
    '@/src/assets/styles/normalize.css',
    '@/src/assets/styles/utilities.css',
    '@/src/assets/styles/variables.css'
  ],

  plugins: ['~/src/plugins/sanity-image-builder.js'],

  modules: ['@nuxtjs/sanity/module'],

  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/svg',
    '@nuxt/postcss8'
  ],

  build: {
    transpile: [
      "gsap"
    ],
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },

  sanity: {
    projectId: process.env.SANITY_PROJECT_ID,
    apiVersion: '2022-03-24',
  },
}
