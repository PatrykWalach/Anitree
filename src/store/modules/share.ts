import {
  Module,
  VuexModule,
  getModule,
  MutationAction
} from 'vuex-module-decorators'
import store from '@/store'
import { ShareData } from '@/types'

@Module({ namespaced: true, name: 'share', store, dynamic: true })
export class ModuleShare extends VuexModule {
  public options: ShareData | null = null
  public isShared: boolean = false

  @MutationAction
  public async CHANGE_OPTIONS(options: ShareData | null) {
    return { options }
  }

  @MutationAction
  public async CHANGE_IS_SHARED(isShared: boolean) {
    return { isShared }
  }
}

export const share = getModule(ModuleShare)
export default share
