export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Todo App",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["element-ui/lib/theme-chalk/index.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "@/plugins/element-ui",
    { src: "~/plugins/localStorage.client.js" },
    "~/plugins/firebase.js"
  ],
  mode: "spa",

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    "@nuxtjs/eslint-module"
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    [
      "@nuxtjs/firebase",
      {
        config: {
          apiKey: "AIzaSyCaoEI3jL_60gPiGcRHFTpFhVetIJZaGl4",
          authDomain: "nuxt-todo-7fdf4.firebaseapp.com",
          projectId: "nuxt-todo-7fdf4",
          storageBucket: "nuxt-todo-7fdf4.appspot.com",
          messagingSenderId: "228326877724",
          appId: "1:228326877724:web:0333b04e3e52165fea8dd9",
          measurementId: "G-BQ6ST3B1HR"
        },
        services: {
          analytics: true,
          auth: {
            ssr: true
          }
        }
      }
    ]
  ],

  // auth: {
  //   redirect: {
  //     login: "/signin",
  //     logout: "/signout",
  //     home: "/home"
  //   },
  //   strategies: {
  //     local: {
  //       token: {
  //         property: "accessToken",
  //         required: true
  //       },
  //       user: {
  //         property: false
  //       },
  //       endpoints: {
  //         login: { url: "/signin", method: "post" }
  //       }
  //     }
  //   }
  // },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/]
  }
};
