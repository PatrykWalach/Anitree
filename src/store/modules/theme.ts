import {
  Module,
  VuexModule,
  getModule,
  MutationAction
} from 'vuex-module-decorators'
import store from '@/store'
import Cookies from 'universal-cookie'
const cookies = new Cookies()
const cookie = cookies.get<{ dark: boolean } | undefined>('theme')

@Module({ namespaced: true, name: 'theme', store, dynamic: true })
export class ModuleTheme extends VuexModule {
  public dark: boolean = (cookie && cookie.dark) || false

  // (Cookies.getJSON('theme') && Cookies.getJSON('theme').dark) || true

  public get light() {
    return !this.dark
  }

  @MutationAction
  public async CHANGE_THEME(dark: boolean) {
    cookies.set(
      'theme',
      { dark },
      { expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) }
    )
    return { dark }
  }
}
export default getModule(ModuleTheme)
