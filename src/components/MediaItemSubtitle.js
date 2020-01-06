import gql from 'graphql-tag'

export const MediaItemSubtitle_media = gql`
  fragment MediaItemSubtitle_media on Media {
    id
    type
    chapters
    episodes
    format
    status
  }
`
