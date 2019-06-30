import {
  Module,
  VuexModule,
  getModule,
  MutationAction
} from 'vuex-module-decorators'
import store from '@/store'
import Cookies from 'js-cookie'
import { Token } from '@/types'

@Module({ namespaced: true, name: 'auth', store, dynamic: true })
export class ModuleAuth extends VuexModule {
  public auth: Token | null =
    (Cookies.getJSON('auth') && Cookies.getJSON('auth').auth) || null

  public get token() {
    const { auth } = this
    return auth && auth.access_token
  }

  @MutationAction
  public async CHANGE_TOKEN(auth: Token | null) {
    Cookies.set('auth', { auth }, { expires: Infinity })
    return { auth }
  }
}

export default getModule(ModuleAuth)
