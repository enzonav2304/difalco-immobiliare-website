import axios from 'axios'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  static: {
    prefix: false
  },
  env: {
    mailUrl: process.env.MAIL_URL //|| 'http://localhost:3000'
  },
  error: {
    /*layout: 'error',*/
    page: '/error/404'
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'di-falco-immobiliare',
    htmlAttrs: {
      lang: 'it',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'stylesheet', href: '/css/theme.min.css'},
      { rel: 'stylesheet', href: '/vendor/nouislider/dist/nouislider.min.css'},
      { rel: 'stylesheet', href: '/vendor/simplebar/dist/simplebar.min.css'},
      { rel: 'stylesheet', href: '/vendor/tiny-slider/dist/tiny-slider.css'},      
      { rel: 'apple-touch-icon', type: 'image/x-icon', href: '/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/x-icon', href: 'favicon-32x32.png' },
      { rel: 'icon', type: 'image/x-icon', href: 'favicon-16x16.png' },
      { rel: 'mask-icon', type: 'image/x-icon', href: 'safari-pinned-tab.svg' }
    ],
    script: [
      { src: '/vendor/smooth-scroll/dist/smooth-scroll.min.js', body: true},
      { src: '/js/theme.min.js', body: true},
      { src: '/vendor/bootstrap/dist/js/bootstrap.bundle.min.js', body: true},
      { src: '/vendor/nouislider/dist/nouislider.min.js', body: true},
      { src: '/vendor/simplebar/dist/simplebar.min.js', body: true},
      { src: '/vendor/jarallax/dist/jarallax.min.js', body: true},
      { src: '/vendor/tiny-slider/dist/min/tiny-slider.js', body: true},      
      { src: '/vendor/@lottiefiles/lottie-player/dist/lottie-player.js', body: true},
      { src: '/vendor/flatpickr/dist/flatpickr.min.js', body: true}
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/style.css',
    /*'@/assets/css/no-result.css'*/
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src: '~/plugins/tiny-slider.js', ssr: false },
    {src: '~/plugins/eventBus.js', ssr: false },
    {src: '~/plugins/functions.js', ssr: false},
    {src: '~/plugins/header.js', ssr: false}, 
    {src: '~/plugins/ramda.js', ssr: false},
    {src: '~/plugins/storage.js', ssr: false},
    {src: '~/plugins/image-handler.js', ssr: false},
    {src: '~/node_modules/vue-flux', ssr: false},
    {src: '~/plugins/fb-sdk.js', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/pwa',
    '@nuxt/image',
    '@aceforth/nuxt-optimized-images'
  ],

  image: {    
    domains: [
      'dropboxusercontent.com'
    ]  
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/style-resources',      
    [
      "nuxt-cookie-control",
      {
        barPosition: "bottom-full",
        blockIframe: true,
        colors: {
          barTextColor: "#fff",
          barBackground: "#12957b",
          barButtonColor: "#fff",
          barButtonBackground: "#206569",
          barButtonHoverColor: "#fff",
          barButtonHoverBackground: "#2e495e",
          modalButtonBackground: "#206569",
          modalButtonHoverColor: "#fff",
          controlButtonBackground: "#12957b",
          controlButtonHoverBackground: "#2e495e",
          controlButtonIconHoverColor: "#fff",
          controlButtonIconColor: "#fff",
          modalButtonHoverBackground: "#2e495e",
          checkboxActiveBackground: "#2e495e",
          checkboxInactiveBackground: "#ede1e1",
          checkboxActiveCircleBackground: "#00c58e",
          checkboxInactiveCircleBackground: "#f44336",
          checkboxDisabledBackground: "#ddd",
          checkboxDisabledCircleBackground: "#fff"
        }
      }
    ]
  ],
  auth: {
    strategies: {
      auth0: {
        domain: 'dev-25--qfzo.eu.auth0.com',
        clientId: 'z5f0vuskpcUxL3rN2uJmogjIBPa7rfOd'
      }
    },
    redirect: {
      login: '/login',
      logout: '/',
      callback: '/auth/signed-in',
      home: '/'
    }
  },
  cookies: {
    necessary: [
      {
        name: {
          en: "Default cookies",
          hr: "Osnovni kolačići"
        },

        description: {
          en: "Used for cookie control."
        },
        cookies: ["cookie_control_consent", "cookie_control_enabled_cookies"]
      }
    ],
    optional: [
      {
        name: {
          en: "Google Analytics",
          de: "Google Analytics",
          es: "Google Analytics",
          fr: "Google Analytics",
          hr: "Google Analitika",
          it: "Google Analytics"
        },
        description: {
          en:
            "Google Analytics is a web analytics service offered by Google that tracks and reports website traffic."
        },
        src: "https://www.googletagmanager.com/gtag/js?id=UA-138616567-1",
        async: true,
        cookies: ["_ga", "_gat_gtag_UA_138616567_1", "_gid"],
        accepted: () => {
          window.dataLayer = window.dataLayer || [];
          function gtag() {
            dataLayer.push(arguments);
          }
          gtag("js", new Date());
          gtag("config", "UA-138616567-1");
        }
      }
    ]
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    vendor : ['vue-flux']
  },
  generate: {
    fallback: '404.html'
    /*
    routes: function () {
      return axios.get('http://localhost:3000/estate')
      .then((res) => {
        return res.data.map((estate) => {
          return '/estate/' + estate.id
        })
      })
    }
    */
  }
}
