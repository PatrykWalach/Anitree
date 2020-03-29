import { DocumentNode } from 'apollo-link'

import {
  ChangesQuery as ChangesQueryResult,
  ChangesQuery_Media_mediaListEntry,
} from './__generated__/ChangesQuery'

import produce from 'immer'

export const produceData = (
  data: ChangesQueryResult | null,
  value: ChangesQuery_Media_mediaListEntry | null,
) =>
  produce(data, (draft) => {
    if (draft?.Media) {
      draft.Media.mediaListEntry = value
    }
  })

export const createMediaQuery = <V>(query: DocumentNode, variables: V) => ({
  query,
  variables,
})

import gql from 'graphql-tag'

export const ChangesQuery = gql`
  query ChangesQuery($id: Int) {
    Media(id: $id) {
      id
      mediaListEntry {
        id
      }
    }
  }
`
