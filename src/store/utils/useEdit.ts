import { State, useActions } from '../'
import { useDispatch, useSelector } from 'vue-redux-hooks'
import { SaveVariables } from '@/graphql/schema/listEntry'
import { useSaveWithChanges } from './useChanges'

export const useEdit = () => {
  const dispatch = useDispatch()
  const actions = useActions()

  const close = async () => {
    dispatch(actions.edit.CHANGE_IS_EDITED(false))
    dispatch(actions.edit.RESET_FORM())
  }

  const mediaId = useSelector((state: State) => state.edit.mediaId)
  const form = useSelector((state: State) => state.edit.form)

  const { mutate: saveEntry, loading } = useSaveWithChanges()

  const submit = () => {
    if (mediaId.value) {
      saveEntry({
        mediaId: mediaId.value,
        ...form.value,
      })

      dispatch(actions.edit.RESET_FORM())
    }
  }

  const syncChanges = useSelector((state: State) => state.settings.syncChanges)

  const changeForm = ({ form }: { form: Partial<SaveVariables> }) => {
    dispatch(actions.edit.CHANGE_FORM(form))

    if (syncChanges.value) {
      submit()
    }
  }

  const open = (_mediaId: number) => {
    dispatch(actions.edit.CHANGE_IS_EDITED(true))
    dispatch(actions.edit.CHANGE_MEDIA_ID(_mediaId))
  }

  return {
    changeForm,
    close,
    loading,
    open,
    submit,
  }
}
