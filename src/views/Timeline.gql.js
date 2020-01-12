import gql from 'graphql-tag'
import { TheTimeline_media } from '../components/TheTimeline.gql.js'
import { Page_page } from '../hooks/Page.gql.js'
import { RenderlessSubtitle_media } from '@/components/RenderlessSubtitle.gql.js'
import { RenderlessTitle_media } from '@/components/RenderlessTitle.gql.js'
import { TimelineAppBar_media } from './TimelineAppBar.gql.js'

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
      ...Page_page
    }
  }
  ${Page_page}
`

export const TimelineQuery = gql`
  query TimelineQuery(
    $sort: [MediaSort]
    $idIn: [Int]
    $page: Int = 0
    $perPage: Int = 6
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

export const TimelineMediaQuery = gql`
  query TimelineMediaQuery($id: Int) {
    Media(id: $id) {
      id
      ...RenderlessTitle_media
      ...RenderlessSubtitle_media
      ...TimelineAppBar_media
    }
  }
  ${RenderlessTitle_media}
  ${RenderlessSubtitle_media}
  ${TimelineAppBar_media}
`
