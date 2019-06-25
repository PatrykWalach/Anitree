import Vue from 'vue'
import Vuex from 'vuex'

// import { getModule } from 'vuex-module-decorators'
Vue.use(Vuex)

import { ModuleMedia } from './modules/media'
import { ModuleTheme } from './modules/theme'
import { ModuleTitle } from './modules/title'

export interface RootState {
  media: ModuleMedia
  theme: ModuleTheme
  title: ModuleTitle
}

export default new Vuex.Store<RootState>({})
