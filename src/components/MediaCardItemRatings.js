import gql from 'graphql-tag'

export const MediaCardItemRatings_media = gql`
  fragment MediaCardItemRatings_media on Media {
    id
    meanScore
    popularity
  }
`
