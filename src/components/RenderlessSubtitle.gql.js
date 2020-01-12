import gql from 'graphql-tag'

export const RenderlessSubtitle_media = gql`
  fragment RenderlessSubtitle_media on Media {
    id
    type
    chapters
    episodes
    format
    status
  }
`
