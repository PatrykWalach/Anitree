import gql from 'graphql-tag'

export const TheTimelineItemTime_media = gql`
  fragment TheTimelineItemTime_media on Media {
    id
    startDate {
      day
      year
      month
    }
    endDate {
      day
      year
      month
    }
  }
`