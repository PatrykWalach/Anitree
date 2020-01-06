import { useMutation } from '@vue/apollo-composable'
import {
  DeleteMediaListEntryMutation as DeleteMediaListEntryMutationResult,
  DeleteMediaListEntryMutationVariables,
} from './__generated__/DeleteMediaListEntryMutation'
import {
  DeleteMediaListEntryQuery as DeleteMediaListEntryQueryResult,
  DeleteMediaListEntryQueryVariables,
} from './__generated__/DeleteMediaListEntryQuery'
import {
  DeleteMediaListEntryMutation,
  DeleteMediaListEntryQuery,
} from './DeleteMediaListEntry.gql.js'
import { MutationUpdaterFn } from 'apollo-client'

import { createMediaQuery, produceData } from './changes'

export const useDeleteMediaListEntry = () => {
  const { mutate: change, ...query } = useMutation<
    DeleteMediaListEntryMutationResult,
    DeleteMediaListEntryMutationVariables
  >(DeleteMediaListEntryMutation)

  const mutate = ({
    variables,
    mediaId,
  }: {
    variables: DeleteMediaListEntryMutationVariables
    mediaId: number
  }) => {
    change(variables, {
      update: (cache, result) =>
        updateDeleteMediaListEntry(mediaId)(cache, result),
    })
  }

  return { ...query, mutate }
}

export const updateDeleteMediaListEntry: (
  id: number,
) => MutationUpdaterFn<DeleteMediaListEntryMutationResult> = id => (
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
