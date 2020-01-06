import gql from 'graphql-tag'

export const MediaItemRatings_media = gql`
  fragment MediaItemRatings_media on Media {
    id
    meanScore
    popularity
  }
`
