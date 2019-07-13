import Vue from 'vue'
import Vuex from 'vuex'

// import { getModule } from 'vuex-module-decorators'
Vue.use(Vuex)

import { ModuleMedia } from './modules/media'
import { ModuleTitle } from './modules/title'
import { ModuleAuth } from './modules/auth'
import { ModuleSubmit } from './modules/submit'
import { ModuleEdit } from './modules/edit'

export interface RootState {
  media: ModuleMedia
  title: ModuleTitle
  auth: ModuleAuth
  edit: ModuleEdit
  submit: ModuleSubmit
}

export default new Vuex.Store<RootState>({})
