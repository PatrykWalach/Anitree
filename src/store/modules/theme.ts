import {
  Module,
  VuexModule,
  getModule,
  MutationAction
} from 'vuex-module-decorators'
import store from '@/store'
const stored: boolean = localStorage.getItem('THEME') === 'true'

@Module({ namespaced: true, name: 'theme', store, dynamic: true })
export class ModuleTheme extends VuexModule {
  public dark: boolean = stored

  public get light() {
    return !this.dark
  }

  @MutationAction
  public async CHANGE_THEME(dark: boolean) {
    localStorage.setItem('THEME', dark.toString())
    return { dark }
  }
}
export default getModule(ModuleTheme)
