import gql from 'graphql-tag'

export const MediaItemOverline_media = gql`
  fragment MediaItemOverline_media on Media {
    id
    studios(isMain: true) {
      nodes {
        id
        name
      }
    }
  }
`
