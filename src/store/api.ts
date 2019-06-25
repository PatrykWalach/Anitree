import gql from 'graphql-tag'
import { FetchVariables } from './models'

import apollo from '../apollo'
import { AMedia } from '@/types'

export const query = gql`
  query($search: String, $id_in: [Int]) {
    Page(page: 0, perPage: 50) {
      media(search: $search, id_in: $id_in) {
        id
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
}
