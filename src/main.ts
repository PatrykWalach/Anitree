import '@/registerServiceWorker'

import App from '@/App.vue'
import Vue from 'vue'
import { apolloProvider } from '@/graphql'
import { modules } from '@/store'
import router from '@/router'
import { store } from '@/store'
import { vuetify } from '@/vuetify'

// Vue.use(Vue =>
//   Vue.mixin({
//     beforeCreate: function() {
//       const options = this.$options
//       if (options.modules) {
//         this.$modules = options.modules
//       } else if (options.parent && options.parent.$modules) {
//         this.$modules = options.parent.$modules
//       }
//     },
//   }),
// )
Vue.config.productionTip = false

new Vue({
  apolloProvider,
  modules,
  render: h => h(App),
  router,
  store,
  vuetify,
}).$mount('#app')
