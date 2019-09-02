import Vue from 'vue'
import router from '@/router'
import vuetify from '@/vuetify'
import { apolloProvider } from '@/graphql'

import App from '@/App.vue'

import CompositionApi from '@vue/composition-api'
Vue.use(CompositionApi)

import '@/registerServiceWorker'
import '@/assets/css/style.scss'

Vue.config.productionTip = false

new Vue({
  apolloProvider,
  render: h => h(App),
  router,
  vuetify
}).$mount('#app')
