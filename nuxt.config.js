export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#99ee99' },
  /*
   ** Global CSS
   */
  css: ['@/assets/icons.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{ src: '~/plugins/vuex-persist', ssr: false }],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },
  pwa: {
    manifest: {
      name: 'contador-pocha',
      short_name: 'contador-pocha',
      description: 'Un contador de pocha, juego de cartas from Spain',
      icons: [
        {
          src: '/_nuxt/icons/icon_64.5f6a36.png',
          sizes: '64x64',
          type: 'image/png'
        },
        {
          src: '/_nuxt/icons/icon_120.5f6a36.png',
          sizes: '120x120',
          type: 'image/png'
        },
        {
          src: '/_nuxt/icons/icon_144.5f6a36.png',
          sizes: '144x144',
          type: 'image/png'
        },
        {
          src: '/_nuxt/icons/icon_152.5f6a36.png',
          sizes: '152x152',
          type: 'image/png'
        },
        {
          src: '/_nuxt/icons/icon_192.5f6a36.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/_nuxt/icons/icon_384.5f6a36.png',
          sizes: '384x384',
          type: 'image/png'
        },
        {
          src: '/_nuxt/icons/icon_512.5f6a36.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ],
      start_url: '/?standalone=true',
      display: 'standalone',
      lang: 'es',
      background_color: '#999999',
      theme_color: '#99dd99'
    }
  }
}
