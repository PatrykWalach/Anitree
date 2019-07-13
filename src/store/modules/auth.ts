import {
  Module,
  VuexModule,
  getModule,
  MutationAction
} from 'vuex-module-decorators'
import store from '@/store'

import { Token, User } from '@/types'
import { apolloQueryViewer } from '../api'
const stored = localStorage.getItem('AUTH')

@Module({ namespaced: true, name: 'auth', store, dynamic: true })
export class ModuleAuth extends VuexModule {
  public auth: Token | null = (stored && JSON.parse(stored)) || null
  public user: User | null = null

  public get token() {
    const { auth } = this
    if (auth && Date.now() < parseInt(auth.expires_in)) {
      return auth.access_token
    }
    return null
  }

  public get authorized() {
    return !!this.token
  }

  @MutationAction
  public async CHANGE_TOKEN(auth: Token | null) {
    if (auth) {
      const newAuth: Token = {
        ...auth,
        /* eslint-disable-next-line @typescript-eslint/camelcase */
        expires_in: (Date.now() + parseInt(auth.expires_in)).toString()
      }
      localStorage.setItem('AUTH', JSON.stringify(newAuth))
      return { auth: newAuth }
    }
    return { auth }
  }

  @MutationAction
  public async CHANGE_USER() {
    const user = await apolloQueryViewer()
    return { user }
  }
}
export const auth = getModule(ModuleAuth)
export default auth

auth.CHANGE_USER()
