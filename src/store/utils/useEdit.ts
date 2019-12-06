import { State, useActions } from '../'
import { useDispatch, useSelector } from 'vue-redux-hooks'
import { DollarApollo } from 'vue-apollo/types/vue-apollo'
import { SaveCommand } from '../modules/commands/SaveCommand'
import { SaveVariables } from '@/graphql/schema/listEntry'
import Vue from 'vue'
import { useCommands } from './useCommands'

export const useEdit = () => {
  const dispatch = useDispatch()
  const actions = useActions()
  const { add } = useCommands()

  const close = async () => {
    dispatch(actions.edit.CHANGE_IS_EDITED(false))
    dispatch(actions.edit.RESET_FORM())
  }

  const mediaId = useSelector((state: State) => state.edit.mediaId)
  const form = useSelector((state: State) => state.edit.form)

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
    const syncChanges = useSelector(
      (state: State) => state.settings.syncChanges,
    )
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
