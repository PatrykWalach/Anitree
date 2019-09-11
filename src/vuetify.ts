import(
  // @ts-ignore
  /* webpackPreload: true */ 'material-design-icons-iconfont/dist/material-design-icons.css'
)

import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export const vuetify = new Vuetify({
  icons: {
    iconfont: 'md',
  },
})
