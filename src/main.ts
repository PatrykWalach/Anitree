import '@/registerServiceWorker'

import * as modules from '@/modules'
import App from '@/App.vue'
import Vue from 'vue'
import { apolloProvider } from '@/apollo'
import router from '@/router'
import { store } from '@/modules/store'
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
