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
} from './SaveMediaListEntry.gql.js'
import { MutationUpdaterFn } from 'apollo-client'

import { createMediaQuery, produceData } from './changes'
import { useComputedOrCallback } from './reducer'
import { Ref } from '@vue/composition-api'

export const useSaveMediaListEntry = <
  V extends SaveMediaListEntryMutationVariables
>(
  variablesValue: Ref<V> | (() => V),
) => {
  const variables = useComputedOrCallback(variablesValue)

  const { mutate: change, ...query } = useMutation<
    SaveMediaListEntryMutationResult,
    V
  >(SaveMediaListEntryMutation, () => ({
    variables: variables.value,
    update: updateSaveMediaListEntry,
  }))

  const mutate = (overrideVariables = variables.value) => {
    change(overrideVariables, {})
  }

  return { ...query, mutate, variables }
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
