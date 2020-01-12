import gql from 'graphql-tag'
import { MediaCard_media } from './MediaCard.gql.js'
import { TheTimelineItem_media } from './TheTimelineItem.gql.js'

export const TheTimeline_media = gql`
  fragment TheTimeline_media on Media {
    id
    ...TheTimelineItem_media
    ...MediaCard_media
  }
  ${TheTimelineItem_media}
  ${MediaCard_media}
`
