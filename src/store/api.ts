import gql from 'graphql-tag'
import { FetchVariables, User, MutationVariables, MediaList } from '../types'

import apollo from '../apollo'
import { Media as AMedia } from '../types'

export const viewerQuery = gql`
  {
    Viewer {
      options {
        profileColor
      }
      mediaListOptions {
        scoreFormat
        animeList {
          customLists
          advancedScoring
          advancedScoringEnabled
        }
        mangaList {
          customLists
          advancedScoring
          advancedScoringEnabled
        }
      }
    }
  }
`
export const mutation = gql`
  mutation(
    $id: Int
    $mediaId: Int
    $status: MediaListStatus
    $score: Float
    $scoreRaw: Int
    $progress: Int
    $progressVolumes: Int
    $repeat: Int
    $private: Boolean
    $notes: String
    $advancedScores: [Float]
    $startedAt: FuzzyDateInput
    $completedAt: FuzzyDateInput
  ) {
    SaveMediaListEntry(
      id: $id
      mediaId: $mediaId
      status: $status
      score: $score
      scoreRaw: $scoreRaw
      progress: $progress
      progressVolumes: $progressVolumes
      repeat: $repeat
      private: $private
      notes: $notes
      advancedScores: $advancedScores
      startedAt: $startedAt
      completedAt: $completedAt
    ) {
      id
      status
      score(format: POINT_10_DECIMAL)
      progress
      private
      progressVolumes
      startedAt {
        year
        month
        day
      }
      completedAt {
        year
        month
        day
      }
      repeat
      notes
      advancedScores
    }
  }
`

export const query = gql`
  query(
    $search: String
    $idIn: [Int]
    $page: Int = 0
    $includedTags: [String]
    $year: Int
    $season: MediaSeason
    $sort: [MediaSort]
  ) {
    Page(page: $page, perPage: 50) {
      media(
        search: $search
        id_in: $idIn
        tag_in: $includedTags
        seasonYear: $year
        season: $season
        sort: $sort
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
        isFavourite
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
        volumes
        chapters
        mediaListEntry {
          id
          status
          score(format: POINT_10_DECIMAL)
          progress
          private
          progressVolumes
          startedAt {
            year
            month
            day
          }
          completedAt {
            year
            month
            day
          }
          repeat
          notes
          advancedScores
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

export function fetchViewerApollo(): Promise<User> {
  return apollo
    .query<{ Viewer: User }>({
      query: viewerQuery
    })
    .then(({ data }) => data.Viewer)
}

export function mutationSaveMediaEntryApollo(
  variables: MutationVariables
): Promise<MediaList | undefined> {
  return apollo
    .mutate<{ SaveMediaListEntry: MediaList }>({
      mutation,
      variables
    })
    .then(({ data }) => data && data.SaveMediaListEntry)
}

export function mutationDeleteMediaEntryApollo(variables: {
  id: number
}): Promise<{ deleted: boolean } | undefined> {
  return apollo
    .mutate<{ DeleteMediaListEntry: { deleted: boolean } }>({
      mutation: gql`
        mutation($id: Int) {
          DeleteMediaListEntry(id: $id) {
            deleted
          }
        }
      `,
      variables
    })
    .then(({ data }) => data && data.DeleteMediaListEntry)
}
