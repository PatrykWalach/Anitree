import gql from 'graphql-tag'

export const MediaCardItemSubtitle_media = gql`
  fragment MediaCardItemSubtitle_media on Media {
    id
    type
    chapters
    episodes
    format
    status
  }
`
