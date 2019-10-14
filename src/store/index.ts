import VuexCompositionApi from 'vuex-composition-api'
import * as modules from './modules'

export const store =
  process.env.NODE_ENV === 'production'
    ? undefined
    : new VuexCompositionApi.Store({
        plugins: [VuexCompositionApi.plugin(Object.values(modules))],
      })
