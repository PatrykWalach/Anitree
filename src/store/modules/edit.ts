import {
  Module,
  VuexModule,
  getModule,
  MutationAction,
  Action
} from 'vuex-module-decorators'
import store from '@/store'
import { Media as AMedia, MutationVariables } from '@/types'
import media from './media'
import { mergeDeep } from 'apollo-utilities'
import { mutationSaveMediaEntryApollo } from '../api'

@Module({ namespaced: true, name: 'edit', store, dynamic: true })
export class ModuleEdit extends VuexModule {
  public mediaId: number | null = null
  public isEdited: boolean = false

  public form: Partial<MutationVariables> = {}

  public get media(): AMedia | null {
    const { mediaId } = this
    return (mediaId !== null && media.media[mediaId]) || null
  }

  @MutationAction
  public async CHANGE_MEDIA_ID(mediaId: number | null) {
    return { mediaId }
  }

  @MutationAction
  public async CHANGE_IS_EDITED(isEdited: boolean) {
    return { isEdited }
  }

  @MutationAction
  public async CHANGE_FORM(form: Partial<MutationVariables>) {
    return { form: mergeDeep(this.form, form) }
  }

  @MutationAction
  public async RESET_FORM() {
    return { form: {} }
  }

  @Action
  public async open(mediaId: number) {
    media.fetchMedia({ idIn: [mediaId] })
    await this.CHANGE_MEDIA_ID(mediaId)
    this.CHANGE_IS_EDITED(true)
  }

  @Action
  public async submit() {
    const { mediaId, form } = this
    if (mediaId) {
      const mediaListEntry = await mutationSaveMediaEntryApollo({
        mediaId,
        ...form
      })

      media.ADD_MEDIA(
        mergeDeep(await media.getMedia(mediaId), { mediaListEntry })
      )
    }
  }
}

export default getModule(ModuleEdit)
