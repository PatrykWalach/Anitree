import gql from 'graphql-tag'
import { MediaEdit_media } from '../components/MediaEdit.js'
import { Share_media } from '../hooks/Share.js'
import { ToggleFavourite_media } from '../hooks/ToggleFavourite.js'

export const TimelineDrawer_media = gql`
  fragment TimelineDrawer_media on Media {
    id
    siteUrl
    ...ToggleFavourite_media
    ...Share_media
    ...MediaEdit_media
  }
  ${ToggleFavourite_media}
  ${Share_media}
  ${MediaEdit_media}
`
