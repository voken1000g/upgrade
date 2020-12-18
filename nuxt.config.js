import { join } from 'path'
import BigNumber from 'bignumber.js'

const baseUrl = '/upgrade/'
// const baseUrl = '/'

export default {
  env: {
    vokenUpgradedCap: new BigNumber(21000000000000000)
  },

  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'spa',

  /*
  ** 404 for SPA
  */
  generate: {
    dir: 'docs',
    fallback: true
  },

  router: {
    base: baseUrl
  },

  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',

  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: 'VokenTB Upgrade Program',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Voken1/2 Resale or Upgrade Program' },

      { name: 'msapplication-TileColor', content: '#ffffff' },
      { name: 'msapplication-TileImage', content: baseUrl + 'favicon/ms-icon-144x144.png' },
      { name: 'theme-color', content: '#ffffff' }
    ],
    script: [
      { src: 'https://cdn.jsdelivr.net/gh/ethereum/web3.js@1.3.0/dist/web3.min.js' }
    ],
    link: [
      { rel: 'apple-touch-icon', sizes: '57x57', href: baseUrl + 'favicon/apple-icon-57x57.png' },
      { rel: 'apple-touch-icon', sizes: '60x60', href: baseUrl + 'favicon/apple-icon-60x60.png' },
      { rel: 'apple-touch-icon', sizes: '72x72', href: baseUrl + 'favicon/apple-icon-72x72.png' },
      { rel: 'apple-touch-icon', sizes: '76x76', href: baseUrl + 'favicon/apple-icon-76x76.png' },
      { rel: 'apple-touch-icon', sizes: '114x114', href: baseUrl + 'favicon/apple-icon-114x114.png' },
      { rel: 'apple-touch-icon', sizes: '120x120', href: baseUrl + 'favicon/apple-icon-120x120.png' },
      { rel: 'apple-touch-icon', sizes: '144x144', href: baseUrl + 'favicon/apple-icon-144x144.png' },
      { rel: 'apple-touch-icon', sizes: '152x152', href: baseUrl + 'favicon/apple-icon-152x152.png' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: baseUrl + 'favicon/apple-icon-180x180.png' },

      { rel: 'icon', type: 'image/png', sizes: '192x192', href: baseUrl + 'favicon/android-icon-192x192.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: baseUrl + 'favicon/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '96x96', href: baseUrl + 'favicon/favicon-96x96.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: baseUrl + 'favicon/favicon-16x16.png' },

      { rel: 'manifest', href: baseUrl + 'favicon/manifest.json' }
    ]
  },

  /*
  ** Global CSS
  */
  css: [
    '@/assets/css/main.scss'
  ],

  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [],

  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,

  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/tailwindcss',
    'nuxt-purgecss',
    '@nuxtjs/moment'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/toast',
    'nuxt-i18n',
    'nuxt-fontawesome'
  ],

  /*
  ** Toast
  */
  toast: {
    position: 'top-right',
    duration: 5000
  },

  /**
   * i18n
   */
  i18n: {
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        file: 'en-US.js'
      },
      {
        code: 'zh',
        iso: 'zh-CN',
        file: 'zh-CN.js'
      }
    ],
    lazy: true,
    langDir: 'lang/',
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en'
    },
    vueI18nLoader: true,
    detectBrowserLanguage: {
      useCookie: true,
      cookieSecure: false,
      alwaysRedirect: false,
      fallbackLocale: 'en'
    }
  },

  /*
   ** Font Awesome
   */
  fontawesome: {
    component: 'fa',
    imports: [
      {
        set: '@fortawesome/free-solid-svg-icons',
        icons: [
          'faInfoCircle',
          'faUndo',
          'faArrowRight',
          'faWallet',
          'faCheckSquare',
          'faTimesCircle',
          'faShieldAlt',
          'faGlobeAmericas',
          'faPlaneDeparture',
          'faPaperPlane',
          'faHourglassHalf',
          'faSeedling',
          'faPlay',
          'faStop',
          'faBolt',
          'faMapMarkerAlt',
        ]
      }
    ]
  },

  /*
   ** PurgeCSS
   */
  purgeCSS: {
    mode: 'postcss',
    whitelist: ['svg-inline--fa']
  },

  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
    // analyze: true,
    postcss: {
      plugins: {
        tailwindcss: join(__dirname, 'tailwind.config.js')
      }
    },

    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      //
    }
  }
}
