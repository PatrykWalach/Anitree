import gql from 'graphql-tag'

export const MediaCardItemOverline_media = gql`
  fragment MediaCardItemOverline_media on Media {
    id
    studios(isMain: true) {
      nodes {
        id
        name
      }
    }
  }
`
