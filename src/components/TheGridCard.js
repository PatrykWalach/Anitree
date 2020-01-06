import gql from 'graphql-tag'
import { TheGridCardCover_media } from './TheGridCardCover.js'
import { MediaItemTitle_media } from './MediaItemTitle.js'
import { MediaItemSubtitle_media } from './MediaItemSubtitle.js'

export const TheGridCard_media = gql`
  fragment TheGridCard_media on Media {
    id
    type
    ...TheGridCardCover_media
    ...MediaItemTitle_media
    ...MediaItemSubtitle_media
  }
  ${TheGridCardCover_media}
  ${MediaItemTitle_media}
  ${MediaItemSubtitle_media}
`
