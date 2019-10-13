import VuexCompositionApi from 'vuex-composition-api'
import { commands } from './commands'
import { edit } from './edit'
import { navigation } from './navigation'
import { settings } from './settings'
import { share } from './share'
import { title } from './title'

export const modules = {
  commands,
  edit,
  navigation,
  settings,
  share,
  title,
}

export const store =
  process.env.NODE_ENV === 'production'
    ? undefined
    : new VuexCompositionApi.Store({
        plugins: [
          VuexCompositionApi.plugin([
            commands,
            edit,
            settings,
            title,
            share,
            navigation,
          ]),
        ],
      })
