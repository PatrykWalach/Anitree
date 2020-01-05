import gql from 'graphql-tag'
import { TheTimeline_media } from '../components/TheTimeline.js'
import { Page_page } from '../hooks/Page.js'

export const SearchQuery = gql`
  query SearchQuery(
    $isAdult: Boolean
    $search: String
    $page: Int = 0
    $includedTags: [String]
    $onList: Boolean
    $year: Int
    $type: MediaType
    $status: [MediaStatus]
    $season: MediaSeason
    $sort: [MediaSort]
    $perPage: Int = 10
  ) {
    Page(page: $page, perPage: $perPage) {
      media(
        isAdult: $isAdult
        search: $search
        tag_in: $includedTags
        onList: $onList
        seasonYear: $year
        season: $season
        type: $type
        sort: $sort
        status_in: $status
      )
        @connection(
          key: "media"
          filter: [
            "isAdult"
            "search"
            "tag_in"
            "onList"
            "seasonYear"
            "season"
            "type"
            "sort"
            "status_in"
          ]
        ) {
        ...TheTimeline_media
      }
      ...Page_page
    }
  }
  ${TheTimeline_media}
  ${Page_page}
`

export const Search_viewer = gql`
  fragment Search_viewer on User {
    id
    options {
      displayAdultContent
    }
  }
`
