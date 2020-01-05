import gql from 'graphql-tag'

export const MediaCardStatus_media = gql`
  fragment MediaCardStatus_media on Media {
    id
    type
    episodes
    chapters
    mediaListEntry {
      id
      status
      progress
    }
  }
`
