import gql from 'graphql-tag'
import { FetchVariables } from '../types'

import apollo from '../apollo'
import { Media as AMedia } from '../types'
import media from '@/store/modules/media'

export const query = gql`
  query(
    $search: String
    $idIn: [Int]
    $page: Int = 0
    $includedTags: [String]
    $year: Int
    $season: MediaSeason
  ) {
    Page(page: $page, perPage: 50) {
      media(
        search: $search
        id_in: $idIn
        tag_in: $includedTags
        seasonYear: $year
        season: $season
      ) {
        id
        season
        seasonInt
        episodes
        rankings {
          rank
          year
          type
          context
          allTime
        }
        bannerImage
        coverImage {
          extraLarge
          large
          medium
          color
        }
        format
        status
        tags {
          name
          id
          rank
        }
        siteUrl
        type
        studios(isMain: true) {
          nodes {
            name
            id
          }
        }
        startDate {
          year
          month
          day
        }
        endDate {
          year
          month
          day
        }
        title {
          romaji
          english
          native
        }
        description
        mediaListEntry {
          status
        }
        relations {
          edges {
            node {
              id
              type
            }
            id
            relationType
          }
        }
      }
    }
  }
`

export function fetchMediaApollo(variables: FetchVariables): Promise<AMedia[]> {
  return apollo
    .query<{ Page: { media: AMedia[] } }>({
      query,
      variables
    })
    .then(({ data }) => data.Page.media)
    .then(newMedia => {
      newMedia.forEach(media.ADD_MEDIA)
      return newMedia
    })
}
