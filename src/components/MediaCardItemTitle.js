import gql from 'graphql-tag'

export const MediaCardItemTitle_media = gql`
  fragment MediaCardItemTitle_media on Media {
    id
    title {
      userPreferred
    }
  }
`
