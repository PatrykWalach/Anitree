import gql from 'graphql-tag'
import { MediaCardCover_media } from './MediaCardCover.js'

export const MediaItemAvatar_media = gql`
  fragment MediaItemAvatar_media on Media {
    id
    ...MediaCardCover_media
  }
  ${MediaCardCover_media}
`
