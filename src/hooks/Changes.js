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
