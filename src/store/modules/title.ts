import {
  Module,
  VuexModule,
  getModule,
  MutationAction
} from 'vuex-module-decorators'
import store from '@/store'

@Module({ namespaced: true, name: 'title', store, dynamic: true })
export class ModuleTitle extends VuexModule {
  public prefered: number = 0

  public titles: ['romaji', 'english', 'native'] = [
    'romaji',
    'english',
    'native'
  ]

  get preferedTitle() {
    return this.titles[this.prefered]
  }

  @MutationAction
  public async CHANGE_PREFERED(prefered: number) {
    return { prefered }
  }
}

export default getModule(ModuleTitle)
