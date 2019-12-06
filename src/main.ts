import '@/registerServiceWorker'

import App from '@/App.vue'
import Vue from 'vue'
import VueReduxHooks from 'vue-redux-hooks'
import { apolloProvider } from '@/apollo'

import router from '@/router'
import { store } from './store'
import { vuetify } from '@/vuetify'

Vue.use(VueReduxHooks, store)
Vue.config.productionTip = false

new Vue({
  apolloProvider,
  render: h => h(App),
  router,
  vuetify,
}).$mount('#app')
