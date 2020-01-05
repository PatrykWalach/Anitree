import gql from 'graphql-tag'

export const MediaCardItemAvatar_media = gql`
  fragment MediaCardItemAvatar_media on Media {
    id
    coverImage {
      medium
      large
      extraLarge
    }
  }
`
