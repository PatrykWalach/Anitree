import { FuzzyDate, MediaType } from './media'
import { ScoreFormat } from './viewer'

export interface Variables {
  type: MediaType
  userId: number
  format?: ScoreFormat
  chunk?: number
}

export interface MediaList {
  __typename: 'MediaList'
  id: number
  mediaId: number
  status: MediaListStatus
  score: number
  progress: number | null
  progressVolumes: number | null
  startedAt: FuzzyDate
  completedAt: FuzzyDate
  repeat: number
  private: boolean
  notes: string | null
  advancedScores: {
    [index: string]: number
  }
}

export interface MediaListGroup {
  entries: MediaList[]
  status: MediaListStatus
  name: string
  isCustomList: boolean
}
export interface MediaListCollection {
  lists: MediaListGroup[]
  hasNextChunk: boolean
}

export type MediaListStatus =
  | 'CURRENT'
  | 'PLANNING'
  | 'COMPLETED'
  | 'DROPPED'
  | 'PAUSED'
  | 'REPEATING'
