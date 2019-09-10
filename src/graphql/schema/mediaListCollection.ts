import { FuzzyDate, MediaStatus, MediaType } from './media'
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
  status: MediaStatus
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

export interface MediaListCollection {
  lists: {
    entries: MediaList[]
    status: MediaStatus
    name: string
    isCustomList: boolean
  }[]

  hasNextChunk: boolean
}
