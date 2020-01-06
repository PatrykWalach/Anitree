import gql from 'graphql-tag'

export const MediaItemDescription_media = gql`
  fragment MediaItemDescription_media on Media {
    id
    description
  }
`
