import '@/registerServiceWorker'
import '@/assets/css/style.scss'
import App from '@/App.vue'
import CompositionApi from '@vue/composition-api'
import Vue from 'vue'
import { apolloProvider } from '@/graphql'
import router from '@/router'
import vuetify from '@/vuetify'

Vue.use(CompositionApi)

Vue.config.productionTip = false

new Vue({
  apolloProvider,
  render: h => h(App),
  router,
  vuetify,
}).$mount('#app')
