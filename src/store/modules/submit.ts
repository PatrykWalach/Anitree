import {
  Module,
  VuexModule,
  getModule,
  MutationAction
} from 'vuex-module-decorators'
import store from '@/store'

const stored: string | null = localStorage.getItem('SUBMIT')

@Module({ namespaced: true, name: 'submit', store, dynamic: true })
export class ModuleSubmit extends VuexModule {
  public auto: boolean = stored === 'true' || false

  @MutationAction
  public async CHANGE_AUTO(auto: boolean) {
    localStorage.setItem('SUBMIT', auto.toString())
    return { auto }
  }
}

export const submit =getModule(ModuleSubmit)
export default submit