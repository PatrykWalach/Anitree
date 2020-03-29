import { useMutation } from '@vue/apollo-composable'
import {
  SaveMediaListEntryMutation as SaveMediaListEntryMutationResult,
  SaveMediaListEntryMutationVariables,
} from './__generated__/SaveMediaListEntryMutation'
import {
  SaveMediaListEntryQuery as SaveMediaListEntryQueryResult,
  SaveMediaListEntryQueryVariables,
} from './__generated__/SaveMediaListEntryQuery'
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

import gql from 'graphql-tag'

export const SaveMediaListEntryMutation = gql`
  mutation SaveMediaListEntryMutation(
    $id: Int
    $mediaId: Int
    $status: MediaListStatus
    $score: Float
    $scoreRaw: Int
    $progress: Int
    $progressVolumes: Int
    $repeat: Int
    $private: Boolean
    $notes: String
    $advancedScores: [Float]
    $startedAt: FuzzyDateInput
    $completedAt: FuzzyDateInput
  ) {
    SaveMediaListEntry(
      id: $id
      mediaId: $mediaId
      status: $status
      score: $score
      scoreRaw: $scoreRaw
      progress: $progress
      progressVolumes: $progressVolumes
      repeat: $repeat
      private: $private
      notes: $notes
      advancedScores: $advancedScores
      startedAt: $startedAt
      completedAt: $completedAt
    ) {
      id
      mediaId
      status
      score
      progress
      progressVolumes
      repeat
      private
      notes
      advancedScores
      startedAt {
        day
        month
        year
      }
      completedAt {
        day
        month
        year
      }
    }
  }
`

export const SaveMediaListEntryQuery = gql`
  query SaveMediaListEntryQuery($id: Int) {
    Media(id: $id) {
      id
      mediaListEntry {
        id
      }
    }
  }
`
