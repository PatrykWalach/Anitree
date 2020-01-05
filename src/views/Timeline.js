import gql from 'graphql-tag'
import { TheTimeline_media } from '../components/TheTimeline.js'
import { Page_page } from '../hooks/Page.js'

export const TimelinePrefetchQuery = gql`
  query TimelinePrefetchQuery(
    $idIn: [Int]
    $page: Int = 0
    $perPage: Int = 50
  ) {
    Page(page: $page, perPage: $perPage) {
      media(id_in: $idIn) @connection(key: "media", filter: ["id_in"]) {
        id
        relations {
          edges {
            id
            node {
              id
            }
          }
        }
      }
    }
  }
`

export const TimelineQuery = gql`
  query TimelineQuery(
    $sort: [MediaSort]
    $idIn: [Int]
    $page: Int = 0
    $perPage: Int = 10
    $isAdult: Boolean
    $onList: Boolean
    $type: MediaType
    $status: [MediaStatus]
  ) {
    Page(page: $page, perPage: $perPage) {
      media(
        id_in: $idIn
        isAdult: $isAdult
        onList: $onList
        type: $type
        sort: $sort
        status_in: $status
      )
        @connection(
          key: "media"
          filter: ["id_in", "isAdult", "onList", "type", "sort", "status_in"]
        ) {
        ...TheTimeline_media
      }
      ...Page_page
    }
  }
  ${TheTimeline_media}
  ${Page_page}
`
