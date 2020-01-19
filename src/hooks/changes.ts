import { DocumentNode } from 'apollo-link'
import { Ref, ref } from '@vue/composition-api'
import {
  ChangesQuery,
  ChangesQuery_Media_mediaListEntry,
} from './__generated__/ChangesQuery'

import produce from 'immer'

export const useHandleError = <V>(
  {
    onError,
    mutate: change,
  }: {
    mutate(variables: V): any
    onError(call: () => void): { off: () => void }
  },
  handleError: (variables: V) => any,
) => {
  const pending: Ref<V | null> = ref(null)

  const mutation = (variables: V) => {
    pending.value = variables
    change(variables)
  }

  onError(() => {
    if (pending.value) handleError(pending.value)
    // dispatch(changesActions.UNSHIFT_PENDING(pending.value))
  })

  return mutation
}

export const produceData = (
  data: ChangesQuery | null,
  value: ChangesQuery_Media_mediaListEntry | null,
) =>
  produce(data, draft => {
    if (draft?.Media) {
      draft.Media.mediaListEntry = value
    }
  })

export const createMediaQuery = <V>(query: DocumentNode, variables: V) => ({
  query,
  variables,
})
