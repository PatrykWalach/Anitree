import Vue from 'vue'
import Vuex from 'vuex'

// import { getModule } from 'vuex-module-decorators'
Vue.use(Vuex)

import { ModuleMedia } from './modules/media'
import { ModuleTheme } from './modules/theme'
import { ModuleTitle } from './modules/title'
import { ModuleAuth } from './modules/auth'

export interface RootState {
  media: ModuleMedia
  theme: ModuleTheme
  title: ModuleTitle
  auth: ModuleAuth
}

export default new Vuex.Store<RootState>({})
