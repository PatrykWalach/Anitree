import gql from 'graphql-tag'
import { MediaCardCover_media } from './MediaCardCover.js'

export const TheGridCardCover_media = gql`
  fragment TheGridCardCover_media on Media {
    id
    ...MediaCardCover_media
  }
  ${MediaCardCover_media}
`
