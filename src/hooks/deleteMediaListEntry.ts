import { useMutation } from '@vue/apollo-composable'
import {
  DeleteMediaListEntryMutation as DeleteMediaListEntryMutationResult,
  DeleteMediaListEntryMutationVariables,
} from './__generated__/DeleteMediaListEntryMutation'
import {
  DeleteMediaListEntryQuery as DeleteMediaListEntryQueryResult,
  DeleteMediaListEntryQueryVariables,
} from './__generated__/DeleteMediaListEntryQuery'
import { MutationUpdaterFn } from 'apollo-client'

import { createMediaQuery, produceData } from './changes'
import { useComputedOrCallback } from './reducer'
import { Ref } from '@vue/composition-api'

export const useDeleteMediaListEntry = (
  variablesValue:
    | Ref<DeleteMediaListEntryMutationVariables>
    | (() => DeleteMediaListEntryMutationVariables),
  mediaIdValue: Ref<number> | (() => number),
) => {
  const variables = useComputedOrCallback(variablesValue)
  const mediaId = useComputedOrCallback(mediaIdValue)

  const { mutate: change, ...query } = useMutation<
    DeleteMediaListEntryMutationResult,
    DeleteMediaListEntryMutationVariables
  >(DeleteMediaListEntryMutation, () => ({
    variables: variables.value,
    update: (cache, result) =>
      updateDeleteMediaListEntry(mediaId.value)(cache, result),
  }))

  const mutate = (overrideVariables = variables.value) =>
    change(overrideVariables, {})

  return { ...query, variables, mediaId, mutate }
}

export const updateDeleteMediaListEntry: (
  id: number,
) => MutationUpdaterFn<DeleteMediaListEntryMutationResult> = (id) => (
  cache,
  { data: result },
) => {
  if (
    !result ||
    !result.DeleteMediaListEntry ||
    !result.DeleteMediaListEntry.deleted
  ) {
    return
  }

  const query = createMediaQuery<DeleteMediaListEntryQueryVariables>(
    DeleteMediaListEntryQuery,
    { id },
  )

  const data = cache.readQuery<
    DeleteMediaListEntryQueryResult,
    DeleteMediaListEntryQueryVariables
  >(query)

  cache.writeQuery({
    ...query,
    data: produceData(data, null),
  })
}

import gql from 'graphql-tag'

export const DeleteMediaListEntryMutation = gql`
  mutation DeleteMediaListEntryMutation($id: Int) {
    DeleteMediaListEntry(id: $id) {
      deleted
    }
  }
`
export const DeleteMediaListEntryQuery = gql`
  query DeleteMediaListEntryQuery($id: Int) {
    Media(id: $id) {
      id
      mediaListEntry {
        id
      }
    }
  }
`
