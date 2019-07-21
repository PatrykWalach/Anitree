import {
  Module,
  VuexModule,
  getModule,
  MutationAction,
  Action
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
    const { token, user } = this
    return !!(token && user)
  }

  public get adultContent(): boolean {
    return (this.user && this.user.options.displayAdultContent) || false
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
  public async CHANGE_USER(user: User | null) {
    return { user }
  }

  @Action
  public async fetchUser() {
    if (this.token) {
      await apolloQueryViewer().then(this.CHANGE_USER)
    }
  }
}
export const auth = getModule(ModuleAuth)
export default auth

auth.fetchUser()
