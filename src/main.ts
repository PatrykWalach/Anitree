import '@/registerServiceWorker'
import CompositionApi, { provide } from '@vue/composition-api'

import App from '@/App.vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import Vue from 'vue'
import VueReduxHooks from 'vue-redux-hooks'
import { apollo } from '@/apollo'

import router from '@/router'
import { store } from './store'
import { vuetify } from '@/vuetify'

Vue.use(CompositionApi)
Vue.use(VueReduxHooks, store)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  setup() {
    provide(DefaultApolloClient, apollo)
    return {}
  },
  vuetify,
}).$mount('#app')
