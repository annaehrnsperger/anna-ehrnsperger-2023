import { LANGUAGES } from './src/utils/constants'

export default {
  target: 'static',

  head: {
    title: 'Baustelle',
    // TODO
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
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
    '@/src/assets/styles/fallback.css',
    '@/src/assets/styles/fonts.css',
    '@/src/assets/styles/index.css',
    '@/src/assets/styles/normalize.css',
    '@/src/assets/styles/utilities.css',
    '@/src/assets/styles/variables.css'
  ],

  plugins: ['~/src/plugins/sanity-image-builder.js', '~/src/plugins/router.js'],

  // TODO
  modules: ['@nuxtjs/sanity/module', '@nuxtjs/i18n', 'nuxt-shopify'],

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

  // TODO
  i18n: {
    locales: LANGUAGES,
    defaultLocale: LANGUAGES[0],
    skipSettingLocaleOnNavigate: true,
  },

  // TODO
  shopify: {
    domain: process.env.SHOPIFY_DOMAIN,
    storefrontAccessToken: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    unoptimized: false,
  },
}
