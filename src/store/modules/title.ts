import {
  Module,
  VuexModule,
  getModule,
  MutationAction
} from 'vuex-module-decorators'
import store from '@/store'
import Cookies from 'universal-cookie'
const cookies = new Cookies()
const cookie = cookies.get<{ prefered: number } | undefined>('title')
@Module({ namespaced: true, name: 'title', store, dynamic: true })
export class ModuleTitle extends VuexModule {
  public prefered: number = (cookie && cookie.prefered) || 0

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
    cookies.set(
      'title',
      { prefered },
      { expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) }
    )
    return { prefered }
  }
}

export default getModule(ModuleTitle)
