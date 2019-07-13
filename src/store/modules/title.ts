import {
  Module,
  VuexModule,
  getModule,
  MutationAction
} from 'vuex-module-decorators'
import store from '@/store'

const stored: string | null = localStorage.getItem('TITLE')
@Module({ namespaced: true, name: 'title', store, dynamic: true })
export class ModuleTitle extends VuexModule {
  public prefered: number = (stored && parseInt(stored)) || 0

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
    localStorage.setItem('TITLE', prefered.toString())
    return { prefered }
  }
}

export const title = getModule(ModuleTitle)
export default title
