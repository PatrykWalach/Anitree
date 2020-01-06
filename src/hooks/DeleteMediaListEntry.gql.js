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
