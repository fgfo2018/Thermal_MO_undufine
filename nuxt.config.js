import colors from 'vuetify/es5/util/colors'
// import webpack from 'webpack'
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Thermal_MO',
    title: 'Thermal_MO',
    meta: [
      {
        charset: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        hid: 'description',
        name: 'description',
        content: '',
      },
      {
        name: 'format-detection',
        content: 'telephone=no',
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
      {
        rel: 'stylesheet',
        href: 'css/details.css',
      },
    ],
    script: [
      // {
      //   // src: '/js/pixi.min.js',
      //   src: 'https://cdn.jsdelivr.net/npm/pixi.js@7.x/dist/pixi.min.js',
      //   type: 'text/javascript',
      //   body: true // 将脚本放在 body 标签底部
      // },
      {
        src: '/js/jquery.js',
        type: 'text/javascript',
      },
      {
        src: '/js/jquery.pep.js',
        type: 'text/javascript',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['vue-slick-carousel/dist/vue-slick-carousel.css'],
  transpileDependencies: ['some-imported-lib'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: '~/plugins/slick',
      mode: 'client',
    },
    {
      src: './plugins/vue-slick-carousel.js',
    },
    {
      src: './plugins/jqureyui.js',
      mode: 'client',
    },
    {
      src: '~/plugins/vue2-datepicker.js',
      ssr: false,
    },
    {
      src: '~/plugins/vuekonva',
      mode: 'client',
    },
    { src: '~plugins/vue-draggable.js', ssr: false },
    { src: '~plugins/vue-horizontal-timeline.js', ssr: false },

    { src: '@/plugins/swiper', ssr: false },

    { src: '~/plugins/swiper.js', ssr: false },
    { src: '~/config.js' },
    // { src: '~/plugins/pixi.js', mode: 'client' }
    // { src: '~/plugins/pixi.js', ssr: false }
    { src: '~/plugins/webscoket.js', ssr: false },
    { src: '~/plugins/main.js', ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    // 字體
    // '@nuxtjs/google-fonts',
  ],
  googleFonts: {
    families: {
      Inter: [900, 700, 500],
    },
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    // auth 登入用
    '@nuxtjs/auth-next',
  ],
  //登入使用之設定(開始)
  // 補充1:AUTH認證需要裝以下額外的套件:
  // (express)npm install express
  // (cookie-parser)npm install cookie-parser
  // (express-jwt)npm install express-jwt
  // 補充2:請先檢查nuxt.config.js設定，是否跟以下設定會有衝突，
  // 如同一個類別設定重複，可能會導致設定失效。
  // , '../api/courseAPI.js'
  serverMiddleware: ['../api/auth', '../api/courseAPI.js'], // SERVER中間件AUTH認證使用
  // AXIOS設定
  axios: {
    credentials: true, //啟用證書通過認證，在localhost認證需要啟用這個
    proxy: true, //axios啟用代理設定，為必要啟用，不然沒辦法使用api
  },
  proxy: {
    '/api': 'http://localhost:3000', // api代理端口，這邊會吃api裡面的Routes
  },
  // router為設定全域都需要經過auth認證，這可以拿掉改由單一頁面使用。
  router: {
    middleware: ['auth'],
  },
  // AUTH 核心設定
  auth: {
    redirect: {
      login: '/login', //登入時的頁面導向
      home: '/', //home的路徑
      logout: '/login', //登出後導向的頁面
      callback: '/login', // //還沒登入時導向的路徑
    },
    // 認證才取的方式(方法)
    strategies: {
      local: {
        //方法名稱(可以看login底下的js)
        token: {
          property: 'token.accessToken', //存取cookie的名稱
        },
      },
    },
    // cookie 存取時間，攸關使用者登入後的認證時間，但使用者可以自行刪除cookie
    cookie: {
      options: {
        // expires: 8,
        maxAge: 31622400,
      },
    },
  },
  //登入使用之設定(結束)

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },
  // 切換ip
  server: {
    // host: '192.168.0.182', // Ray
    host: '0.0.0.0', // Louis
    port: 3000,
  },
  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: '#4f5e62',
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
        light: {
          primary: '#4f5e62',
          secondary: '#b0bec5',
          accent: '#8c9eff',
          error: '#b71c1c',
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    cssSourceMap: false,
    extend(config, ctx) { },
    transpile: ['konva'],
    // plugins: [
    //   new webpack.ProvidePlugin({
    //     $: 'jquery',
    //     // jQuery: 'jquery',
    //     // 'window.jQuery': 'jquery'
    //   })
    // ]
  },
  // 關閉eslint校驗提醒
  lintOnSave: false,
}
