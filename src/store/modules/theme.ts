import {
  Module,
  VuexModule,
  getModule,
  MutationAction
} from 'vuex-module-decorators'
import store from '@/store'
import Cookies from 'js-cookie'

@Module({ namespaced: true, name: 'theme', store, dynamic: true })
export class ModuleTheme extends VuexModule {
  public dark: boolean =
    (Cookies.getJSON('theme') && Cookies.getJSON('theme').dark) || true

  public get light() {
    return !this.dark
  }

  @MutationAction
  public async CHANGE_THEME(dark: boolean) {
    Cookies.set('theme', { dark }, { expires: Infinity })
    return { dark }
  }
}
export default getModule(ModuleTheme)
