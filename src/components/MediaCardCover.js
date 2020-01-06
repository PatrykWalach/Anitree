import gql from 'graphql-tag'

export const MediaCardCover_media = gql`
  fragment MediaCardCover_media on Media {
    id
    coverImage {
      medium
      large
      extraLarge
    }
  }
`
