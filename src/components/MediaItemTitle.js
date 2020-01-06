import gql from 'graphql-tag'

export const MediaItemTitle_media = gql`
  fragment MediaItemTitle_media on Media {
    id
    title {
      userPreferred
    }
  }
`
