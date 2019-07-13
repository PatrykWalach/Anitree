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
import {
  apolloMutateSaveMediaListEntry,
  apolloMutateDeleteMediaListEntry
} from '../api'
import submit from './submit'

@Module({ namespaced: true, name: 'edit', store, dynamic: true })
export class ModuleEdit extends VuexModule {
  public mediaId: number | null = null
  public isEdited: boolean = false
  public loading: boolean = false
  public form: Partial<MutationVariables> = {}

  public get media(): AMedia | null {
    const { mediaId } = this
    return (mediaId !== null && media.media[mediaId]) || null
  }

  public get id(): number | null {
    const { media } = this
    return (media && media.mediaListEntry && media.mediaListEntry.id) || null
  }

  @MutationAction
  public async CHANGE_MEDIA_ID(mediaId: number | null) {
    return { mediaId }
  }

  @MutationAction
  public async CHANGE_LOADING(loading: boolean) {
    return { loading }
  }

  @MutationAction
  public async CHANGE_IS_EDITED(isEdited: boolean) {
    return { isEdited }
  }

  @MutationAction
  public async CHANGE_FORM(form: Partial<MutationVariables>) {
    return { form: mergeDeep(this.form, form) }
  }

  @Action
  public async changeForm(form: Partial<MutationVariables>) {
    await this.CHANGE_FORM(form)
    if (submit.auto) this.submit()
  }

  @MutationAction
  public async RESET_FORM() {
    return { form: {} }
  }

  @Action
  public async open(mediaId: number) {
    await media.getMedia(mediaId)
    await this.CHANGE_MEDIA_ID(mediaId)
    this.CHANGE_IS_EDITED(true)
  }

  @Action
  public async submit() {
    const { mediaId, form } = this
    this.CHANGE_LOADING(true)

    if (mediaId !== null) {
      const mediaListEntry = await apolloMutateSaveMediaListEntry({
        mediaId,
        ...form
      })

      await media.ADD_MEDIA(
        mergeDeep(await media.getMedia(mediaId), { mediaListEntry })
      )
    }
    return this.CHANGE_LOADING(false)
  }

  @Action
  public async remove() {
    const { id, mediaId } = this
    this.CHANGE_LOADING(true)
    if (id !== null && mediaId !== null) {
      const mutation = await apolloMutateDeleteMediaListEntry({
        id
      })
      if (mutation && mutation.deleted) {
        await media.ADD_MEDIA(
          mergeDeep(await media.getMedia(mediaId), { mediaListEntry: null })
        )
      }
      return mutation
    }
    return this.CHANGE_LOADING(false)
  }
}
export const edit =getModule(ModuleEdit)
export default edit
