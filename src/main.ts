import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'

import './registerServiceWorker'
import './assets/css/style.styl'

import Vuetify from 'vuetify'

Vue.use(Vuetify, {
  iconfont: 'md'
  // theme: {
  //   primary: '#4DBA87',
  //   accent: '#6ac59a'
  // }
})

import '../node_modules/material-design-icons-iconfont/dist/material-design-icons.css'
import '../node_modules/vuetify/dist/vuetify.min.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
