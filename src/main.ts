import '@/registerServiceWorker'

import App from '@/App.vue'
// import  from '@vue/composition-api'
import Vue from 'vue'
import { apolloProvider } from '@/graphql'
import router from '@/router'
// Vue.use(CompositionApi)
import { store } from '@/store'
import { vuetify } from '@/vuetify'

Vue.config.productionTip = false

new Vue({
  apolloProvider,
  render: h => h(App),
  router,
  store,
  vuetify,
}).$mount('#app')
