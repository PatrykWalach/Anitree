import gql from 'graphql-tag'
import { TheGrid_media } from '../components/TheGrid.js'
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
    $perPage: Int = 12
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
        id
        ...TheGrid_media
      }
      ...Page_page
    }
  }
  ${TheGrid_media}
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
