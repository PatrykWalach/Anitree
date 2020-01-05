import gql from 'graphql-tag'

export const MediaCardItemDescription_media = gql`
  fragment MediaCardItemDescription_media on Media {
    id
    description
  }
`
