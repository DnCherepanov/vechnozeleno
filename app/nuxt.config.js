export default {
  head: {
    htmlAttrs: {
      lang: 'ru',
    },
    title: 'Эко магазин товаров для дома в Южно-Сахалинске',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'keywords',
        name: 'keywords',
        content:
          'экотовары, экомагазин, эко, интернет магазин ,товары для дома, сахалин, южно-сахалинск',
      },
      {
        hid: 'description',
        name: 'description',
        content:
          'Натуральные, экологически чистые товары без пластика. Организуй красивый и экологичный быт с минимальным воздействием на окружающую среду. Собираем экобоксы, общаемся и делимся советами на разные темы в области экологии.',
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'Эко магазин товаров для дома в Южно-Сахалинске',
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content:
          'Натуральные, экологически чистые товары без пластика. Организуй красивый и экологичный быт с минимальным воздействием на окружающую среду. Собираем экобоксы, общаемся и делимся советами на разные темы в области экологии.',
      },
      { name: 'yandex-verification', content: '2876a4aa05a1ba0c' },
      {
        name: 'google-site-verification',
        content: 'ijVQAqOJSUMp3zzNMQxETYFSa8bVkEq7_dRhLGqtgmc',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  css: ['@/assets/scss/main'],

  plugins: ['@/plugins/after-each.client.js', '@/plugins/globals.js'],

  components: true,

  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/stylelint-module',
    'nuxt-purgecss',
    'nuxt-font-loader',
    '@nuxtjs/pwa',
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    '@luxdamore/nuxt-prune-html',
    [
      'nuxt-vuex-localstorage',
      {
        localStorage: ['cart'],
      },
    ],
  ],

  publicRuntimeConfig: {
    accessToken: process.env.INSTAGRAM_TOKEN,
    telegaToken: process.env.TELEGA_TOKEN,
    telegaChatID: process.env.TELEGA_CHATID,
  },

  fontLoader: {
    url: {
      local: '/icons/font/remixicon.css',
      google:
        'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&display=swap',
    },
    prefetch: true,
    preconnect: true,
  },

  telemetry: false,

  axios: { baseURL: process.env.BASE_URL, proxy: true },

  sitemap: {
    hostname: 'https://pourtoi.ru',
    gzip: true,
    exclude: ['/prilavok/**'],
  },

  robots: {
    UserAgent: '*',
    Disallow: '/prilavok',
  },

  render: {
    bundleRenderer: {
      shouldPreload: (file, type) => {
        return ['script', 'style', 'font'].includes(type)
      },
    },
  },

  pwa: {
    meta: {
      title: 'Pourtoi',
      author: 'Denis Cherepanov',
    },
    manifest: {
      name: 'Эко магазин товаров для дома в Южно-Сахалинске',
      lang: 'ru',
      theme_color: '#ffffff',
      short_name: 'Pourtoi',
      description: 'Эко магазин товаров для дома',
    },
  },

  auth: {
    strategies: {
      local: {
        token: {
          property: 'token',
          // required: true,
          // type: 'Bearer'
        },
        user: {
          property: 'user',
          // autoFetch: true
        },
        endpoints: {
          login: { url: '/api/auth/login', method: 'post' },
          logout: { url: '/api/auth/logout', method: 'post' },
          user: { url: '/api/auth/user', method: 'get' },
        },
      },
    },
    redirect: {
      login: '/prilavok/login',
      logout: `${process.env.BASE_URL}`,
      home: '/prilavok',
    },
  },

  serverMiddleware: ['~/api/index.js'],

  purgeCSS: {
    mode: 'postcss',
    enabled: ({ isDev, isClient }) => !isDev && isClient, // or `false` when in dev/debug mode
    paths: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
    ],
    styleExtensions: ['.css'],
    whitelist: ['body', 'html', 'nuxt-progress'],
    extractors: [
      {
        extractor: (content) => content.match(/[A-z0-9-:\\/]+/g) || [],
        extensions: ['html', 'vue', 'js'],
      },
    ],
  },
  build: {
    extractCSS: true,
    html: {
      minify: {
        collapseBooleanAttributes: true,
        decodeEntities: true,
        minifyCSS: true,
        minifyJS: true,
        processConditionalComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        trimCustomFragments: true,
        useShortDoctype: true,
      },
    },
    babel: { compact: true },
    extend(config, ctx) {
      if (!config.externals) {
        config.externals = {}
      }
      config.externals.moment = 'moment'
    },
  },
}
