import VuexCompositionApi from 'vuex-composition-api'
import { commands } from './commands'
import { edit } from './edit'
import { navigation } from './navigation'
import { settings } from './settings'
import { share } from './share'
import { title } from './title'

export const store = new VuexCompositionApi.Store({
  plugins: [
    VuexCompositionApi.Plugin([
      commands,
      edit,
      settings,
      title,
      share,
      navigation,
    ]),
  ],
})
