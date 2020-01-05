import gql from 'graphql-tag'
import { MediaCard_media } from './MediaCard.js'
import { TheTimelineItem_media } from './TheTimelineItem.js'

export const TheTimeline_media = gql`
  fragment TheTimeline_media on Media {
    id
    ...TheTimelineItem_media
    ...MediaCard_media
  }
  ${TheTimelineItem_media}
  ${MediaCard_media}
`
