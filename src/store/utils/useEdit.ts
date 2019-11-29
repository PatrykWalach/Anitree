import { DollarApollo } from 'vue-apollo/types/vue-apollo'
import { SaveCommand } from '../modules/commands/SaveCommand'
import { SaveVariables } from '@/graphql/schema/listEntry'
import Vue from 'vue'
import { useCommands } from './useCommands'
import { useState } from './useState'
import { useStore } from './useStore'

export const useEdit = () => {
  const { dispatch, actions } = useStore()
  const { add } = useCommands()

  const close = async () => {
    dispatch(actions.edit.CHANGE_IS_EDITED(false))
    dispatch(actions.edit.RESET_FORM())
  }

  const mediaId = useState(state => state.edit.mediaId)
  const form = useState(state => state.edit.form)

  const submit = async (apollo: DollarApollo<Vue>) => {
    if (mediaId.value) {
      dispatch(actions.edit.CHANGE_LOADING(true))

      await add(
        new SaveCommand({
          apollo,
          variables: {
            mediaId: mediaId.value,
            ...form.value,
          },
        }),
      )

      dispatch(actions.edit.RESET_FORM())
      dispatch(actions.edit.CHANGE_LOADING(false))
    }
  }

  const changeForm = ({
    form,
    apollo,
  }: {
    form: Partial<SaveVariables>
    apollo: DollarApollo<Vue>
  }) => {
    const syncChanges = useState(state => state.settings.syncChanges)
    dispatch(actions.edit.CHANGE_FORM(form))
    if (syncChanges.value) {
      submit(apollo)
    }
  }

  const open = (_mediaId: number) => {
    dispatch(actions.edit.CHANGE_IS_EDITED(true))
    dispatch(actions.edit.CHANGE_MEDIA_ID(_mediaId))
  }

  return {
    changeForm,
    close,
    open,
    submit,
  }
}
