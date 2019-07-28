import {
  Module,
  VuexModule,
  getModule,
  MutationAction
} from 'vuex-module-decorators'
import store from '@/store'
import { ShareOptions } from '@/types'

@Module({ namespaced: true, name: 'share', store, dynamic: true })
export class ModuleShare extends VuexModule {
  public options: ShareOptions | null = null
  public isShared: boolean = false

  @MutationAction
  public async CHANGE_OPTIONS(options: ShareOptions | null) {
    return { options }
  }

  @MutationAction
  public async CHANGE_IS_SHARED(isShared: boolean) {
    return { isShared }
  }
}

export const share = getModule(ModuleShare)
export default share
