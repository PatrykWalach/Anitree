import { useMutation } from '@vue/apollo-composable'
import {
  SaveMediaListEntryMutation as SaveMediaListEntryMutationResult,
  SaveMediaListEntryMutationVariables,
} from './__generated__/SaveMediaListEntryMutation'
import {
  SaveMediaListEntryQuery as SaveMediaListEntryQueryResult,
  SaveMediaListEntryQueryVariables,
} from './__generated__/SaveMediaListEntryQuery'
import {
  SaveMediaListEntryMutation,
  SaveMediaListEntryQuery,
} from './SaveMediaListEntry.js'
import { MutationUpdaterFn } from 'apollo-client'

import { createMediaQuery, produceData } from './changes'

export const useSaveMediaListEntry = <
  V = SaveMediaListEntryMutationVariables
>() => {
  const { mutate: change, ...query } = useMutation<
    SaveMediaListEntryMutationResult,
    V
  >(SaveMediaListEntryMutation)

  const mutate = (variables: V) => {
    change(variables, {
      update: updateSaveMediaListEntry,
    })
  }

  return { ...query, mutate }
}

export const updateSaveMediaListEntry: MutationUpdaterFn<SaveMediaListEntryMutationResult> = (
  cache,
  { data: result },
) => {
  if (!result || !result.SaveMediaListEntry) return

  const id = result.SaveMediaListEntry.mediaId

  const query = createMediaQuery<SaveMediaListEntryQueryVariables>(
    SaveMediaListEntryQuery,
    {
      id,
    },
  )

  const data = cache.readQuery<
    SaveMediaListEntryQueryResult,
    SaveMediaListEntryQueryVariables
  >(query)

  cache.writeQuery({
    ...query,
    data: produceData(data, result.SaveMediaListEntry),
  })
}
