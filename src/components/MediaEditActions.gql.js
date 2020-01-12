import gql from 'graphql-tag'

export const MediaEditActions_media = gql`
  fragment MediaEditActions_media on Media {
    id
    mediaListEntry {
      id
    }
  }
`
