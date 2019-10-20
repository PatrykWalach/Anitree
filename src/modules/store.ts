import * as modules from '.'
import { Store, plugin } from 'vuex-composition-api'

export const store =
  process.env.NODE_ENV === 'production'
    ? undefined
    : new Store({
        plugins: [plugin(Object.values(modules))],
      })
