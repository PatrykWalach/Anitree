import {
  Module,
  VuexModule,
  getModule,
  MutationAction
} from 'vuex-module-decorators'
import store from '@/store'
import Cookies from 'js-cookie'

@Module({ namespaced: true, name: 'title', store, dynamic: true })
export class ModuleTitle extends VuexModule {
  public prefered: number =
    (Cookies.getJSON('title') && Cookies.getJSON('title').prefered) || 0

  public titles: ['romaji', 'english', 'native'] = [
    'romaji',
    'english',
    'native'
  ]

  public get preferedTitle() {
    const { titles, prefered } = this

    return titles[prefered]
  }

  @MutationAction
  public async CHANGE_PREFERED(prefered: number) {
    Cookies.set('title', { prefered }, { expires: 365 })
    return { prefered }
  }
}

export default getModule(ModuleTitle)
