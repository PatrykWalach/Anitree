import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

global.console.error = () => {}
;(global as any).IntersectionObserver = class {
  observe() {}
}
;(global as any).fetch = jest.fn()
