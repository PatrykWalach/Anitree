import gql from 'graphql-tag'
import { MediaCardBanner_media } from './MediaCardBanner.js'
import { MediaCardItem_media } from './MediaCardItem.js'
import { MediaEditActions_media } from './MediaEditActions.js'
import {
  MediaEditItems_media,
  MediaEditItems_viewer,
} from './MediaEditItems.js'

export const MediaEdit_media = gql`
  fragment MediaEdit_media on Media {
    id
    bannerImage
    ...MediaEditItems_media
    ...MediaEditActions_media
    ...MediaCardBanner_media
    ...MediaCardItem_media
  }
  ${MediaCardBanner_media}
  ${MediaCardItem_media}
  ${MediaEditActions_media}
  ${MediaEditItems_media}
`

export const MediaEdit_viewer = gql`
  fragment MediaEdit_viewer on User {
    id
    ...MediaEditItems_viewer
  }
  ${MediaEditItems_viewer}
`
