import gql from 'graphql-tag'

export const MediaCardBanner_media = gql`
  fragment MediaCardBanner_media on Media {
    id
    bannerImage
  }
`
