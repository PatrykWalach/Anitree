import(
  // @ts-ignore
  /* webpackChunkName: "MaterialDesignIcons" */ /* webpackPreload: true */ 'material-design-icons-iconfont/dist/material-design-icons.css'
)
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
})
