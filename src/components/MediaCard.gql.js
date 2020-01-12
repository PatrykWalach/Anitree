import { MediaCardActions_media } from './MediaCardActions.gql.js'
import { MediaCardBanner_media } from './MediaCardBanner.gql.js'
import { MediaItem_media } from './MediaItem.gql.js'
import { MediaCardStatus_media } from './MediaCardStatus.gql.js'

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
