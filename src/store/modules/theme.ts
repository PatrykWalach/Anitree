import {
  Module,
  VuexModule,
  getModule,
  MutationAction
} from 'vuex-module-decorators'
import store from '@/store'
@Module({ namespaced: true, name: 'theme', store, dynamic: true })
export class ModuleTheme extends VuexModule {
  public dark: boolean = true

  get light() {
    return !this.dark
  }

  @MutationAction
  public async CHANGE_THEME(dark: boolean) {
    return { dark }
  }
}
export default getModule(ModuleTheme)
