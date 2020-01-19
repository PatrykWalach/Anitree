import { DocumentNode } from 'apollo-link'

import {
  ChangesQuery,
  ChangesQuery_Media_mediaListEntry,
} from './__generated__/ChangesQuery'

import produce from 'immer'

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
