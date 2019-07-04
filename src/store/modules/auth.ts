import {
  Module,
  VuexModule,
  getModule,
  MutationAction
} from 'vuex-module-decorators'
import store from '@/store'
import Cookies from 'universal-cookie'
import { Token } from '@/types'
const cookies = new Cookies()
const cookie = cookies.get<Token | null | undefined>('auth')

@Module({ namespaced: true, name: 'auth', store, dynamic: true })
export class ModuleAuth extends VuexModule {
  public auth: Token | null = cookie || null

  public get token() {
    const { auth } = this
    return auth && auth.access_token
  }

  @MutationAction
  public async CHANGE_TOKEN(auth: Token | null) {
    if (auth)
      cookies.set('auth', auth, {
        expires: new Date(auth.expires_in)
      })
    return { auth }
  }
}

export default getModule(ModuleAuth)
