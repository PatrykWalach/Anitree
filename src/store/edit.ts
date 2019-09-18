import VuexCompositionApi, { State } from 'vuex-composition-api'
import { Form } from '@/types'
import { SaveCommand } from './commands/SaveCommand'
import { SaveVariables } from '@/graphql/schema/listEntry'
import { commands } from './commands'
import { mergeDeep } from 'apollo-utilities'
import { settings } from './settings'

export const edit = new VuexCompositionApi.Module({
  name: 'edit',
  namespaced: true,
  setup({ state, mutation }) {
    const mediaId: State<number | null> = state(null)
    const isEdited = state(false)
    const loading = state(false)
    const form: State<Partial<Form>> = state({})

    const tabs = state([
      { href: 'edit1', icon: 'dashboard', title: 'Progress' },
      { href: 'edit2', icon: 'date_range', title: 'Dates' },
      { href: 'edit3', icon: 'insert_comment', title: 'Notes' },
      { href: 'edit4', icon: 'edit', title: ' Advanced Scores' },
    ])

    const tab = state('edit1')

    const CHANGE_FORM = mutation(
      'CHANGE_FORM',
      { form },
      (state, payload: Partial<SaveVariables>) => {
        state.form = mergeDeep(form.value, payload)
      },
    )

    const RESET_FORM = mutation('RESET_FORM', { form }, state => {
      state.form = {}
    })

    const CHANGE_IS_EDITED = mutation(
      'CHANGE_IS_EDITED',
      { isEdited },
      (state, payload: boolean) => {
        state.isEdited = payload
      },
    )

    const CHANGE_TAB = mutation(
      'CHANGE_TAB',
      { tab },
      (state, payload: string) => {
        state.tab = payload
      },
    )

    const CHANGE_LOADING = mutation(
      'CHANGE_LOADING',
      { loading },
      (state, payload: boolean) => {
        state.loading = payload
      },
    )

    const CHANGE_MEDIA_ID = mutation(
      'CHANGE_MEDIA_ID',
      { mediaId },
      (state, payload: number | null) => {
        state.mediaId = payload
      },
    )

    const open = (_mediaId: number) => {
      CHANGE_MEDIA_ID(_mediaId)
      CHANGE_IS_EDITED(true)
    }

    const close = async () => {
      CHANGE_IS_EDITED(false)
      RESET_FORM()
    }

    const submit = async () => {
      if (mediaId.value) {
        loading.value = true

        await commands.actions.add(
          new SaveCommand({
            variables: { mediaId: mediaId.value, ...form.value },
          }),
        )

        await RESET_FORM()
        CHANGE_LOADING(false)
      }
    }

    const changeForm = async (form: Partial<SaveVariables>) => {
      await CHANGE_FORM(form)
      if (settings.state.syncChanges.value) {
        submit()
      }
    }

    return {
      actions: {
        changeForm,
        close,
        open,
        submit,
      },
      mutations: {
        CHANGE_FORM,
        CHANGE_IS_EDITED,
        CHANGE_LOADING,
        CHANGE_TAB,
        RESET_FORM,
      },
      state: {
        form,
        isEdited,
        loading,
        mediaId,
        tab,
        tabs,
      },
    }
  },
})
