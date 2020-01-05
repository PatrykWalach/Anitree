import { MediaEdit_media } from './MediaEdit.js'
import { ToggleFavourite_media } from '../hooks/ToggleFavourite.js'
import { Share_media } from '../hooks/Share.js'

import gql from 'graphql-tag'

export const MediaCardActions_media = gql`
  fragment MediaCardActions_media on Media {
    id
    type
    siteUrl
    ...ToggleFavourite_media
    ...Share_media
    ...MediaEdit_media
  }
  ${ToggleFavourite_media}
  ${Share_media}
  ${MediaEdit_media}
`
