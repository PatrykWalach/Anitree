import '@/registerServiceWorker'
import CompositionApi, { provide, ref } from '@vue/composition-api'

import App from '@/App.vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { DefaultFab } from './hooks/fab'
import Vue from 'vue'
import VueReduxHooks from 'vue-redux-hooks'
import { apollo } from '@/apollo'
import VueResizeObserver from 'vue-resize-observer'
import router from '@/router'
import { store } from './store'
import { vuetify } from '@/vuetify'




Vue.use(VueResizeObserver)

Vue.use(CompositionApi)
Vue.use(VueReduxHooks, store)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  setup() {
    provide(DefaultApolloClient, apollo)
    provide(DefaultFab, ref(null))
    return {}
  },
  vuetify,
}).$mount('#app')
