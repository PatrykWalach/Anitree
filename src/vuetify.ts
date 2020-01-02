import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import WebFont from 'webfontloader'

WebFont.load({
  classes: false,
  events: false,
  google: {
    families: ['Roboto:100,300,400,500,700,900&display=swap'],
  },
})

Vue.use(Vuetify)

export const vuetify = new Vuetify({
  icons: {
    iconfont: 'md',
  },
  theme: {
    themes: {
      light: {
        accent: '#EC407A',
        error: '#EB9928',
        primary: '#2F4858',
        secondary: '#365278',
      },
    },
  },
})
