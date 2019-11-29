import '@/registerServiceWorker'
import { key, store } from '@/store'

import App from '@/App.vue'
import Vue from 'vue'

import { apolloProvider } from '@/apollo'
import { provide } from '@vue/composition-api'
import router from '@/router'
import { vuetify } from '@/vuetify'

Vue.config.productionTip = false

Vue.mixin({
  setup() {
    provide(key, store)
    return {}
  },
})

new Vue({
  apolloProvider,
  render: h => h(App),
  router,

  vuetify,
}).$mount('#app')
