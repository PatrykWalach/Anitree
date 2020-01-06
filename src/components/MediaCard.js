import { MediaCardActions_media } from './MediaCardActions.js'
import { MediaCardBanner_media } from './MediaCardBanner.js'
import { MediaItem_media } from './MediaItem.js'
import { MediaCardStatus_media } from './MediaCardStatus.js'

import gql from 'graphql-tag'

export const MediaCard_media = gql`
  fragment MediaCard_media on Media {
    id
    bannerImage
    ...MediaItem_media
    ...MediaCardActions_media
    ...MediaCardBanner_media
    ...MediaCardStatus_media
  }
  ${MediaItem_media}
  ${MediaCardActions_media}
  ${MediaCardBanner_media}
  ${MediaCardStatus_media}
`
