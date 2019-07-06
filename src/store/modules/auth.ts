import {
  Module,
  VuexModule,
  getModule,
  MutationAction
} from 'vuex-module-decorators'
import store from '@/store'

import { Token } from '@/types'
const stored = localStorage.getItem('AUTH')

@Module({ namespaced: true, name: 'auth', store, dynamic: true })
export class ModuleAuth extends VuexModule {
  public auth: Token | null = (stored && JSON.parse(stored)) || null

  public get token() {
    const { auth } = this
    if (auth && Date.now() < parseInt(auth.expires_in)) {
      return auth.access_token
    }
    return null
  }

  @MutationAction
  public async CHANGE_TOKEN(auth: Token | null) {
    if (auth) {
      localStorage.setItem(
        'AUTH',
        JSON.stringify({
          ...auth,
          /* eslint-disable-next-line @typescript-eslint/camelcase */
          expires_in: Date.now() + parseInt(auth.expires_in)
        })
      )
    }
    return { auth }
  }
}

export default getModule(ModuleAuth)
