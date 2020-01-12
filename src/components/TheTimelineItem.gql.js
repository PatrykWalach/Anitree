import gql from 'graphql-tag'
import { TheTimelineItemTime_media } from './TheTimelineItemTime.gql.js'

export const TheTimelineItem_media = gql`
  fragment TheTimelineItem_media on Media {
    id
    ...TheTimelineItemTime_media
  }
  ${TheTimelineItemTime_media}
`
