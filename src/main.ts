import '@/registerServiceWorker'

import App from '@/App.vue'
import Vue from 'vue'
import { apolloProvider } from '@/graphql'
import * as modules from '@/store/modules'
import router from '@/router'
import { store } from '@/store'
import { vuetify } from '@/vuetify'

Vue.config.productionTip = false

new Vue({
  apolloProvider,
  modules,
  render: h => h(App),
  router,
  store,
  vuetify,
}).$mount('#app')
