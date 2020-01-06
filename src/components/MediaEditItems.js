import gql from 'graphql-tag'
import { MediaEditItemsTab_media } from './MediaEditItemsTab.js'

export const MediaEditItems_media = gql`
  fragment MediaEditItems_media on Media {
    id
    type
    mediaListEntry {
      id
      advancedScores
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
      private
      mediaId
      status
      score
      progress
      progressVolumes
      repeat
      notes
    }
    ...MediaEditItemsTab_media
  }
  ${MediaEditItemsTab_media}
`
export const MediaEditItems_viewer = gql`
  fragment MediaEditItems_viewer on User {
    id
    mediaListOptions {
      scoreFormat
      mangaList {
        advancedScoring
      }
      animeList {
        advancedScoring
      }
    }
  }
`
