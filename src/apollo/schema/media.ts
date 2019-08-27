import { ScoreFormat } from './viewer'
import { MediaList } from './mediaListCollection'

export interface Variables {
  isAdult?: boolean
  id: number
  format?: ScoreFormat
}

export interface Node {
  id: number
  type: MediaType
}

export type MediaType = 'MANGA' | 'ANIME'
export interface FuzzyDate {
  year: number | null
  month: number | null
  day: number | null
}

export interface Media extends Node {
  startDate: FuzzyDate
  endDate: FuzzyDate
  format: string | null
  description: string | null
  season: string | null
  seasonInt: number | null
  episodes: number | null
  chapters: number | null
  volumes: number | null
  isFavourite: boolean
  mediaListEntry: MediaList | null
  title: MediaTitle
  siteUrl: string
  relations: {
    edges: MediaEdge[]
  }
  tags: {
    rank: number
    name: string
  }[]
  studios: {
    nodes: Studio[]
  }
  status: MediaStatus | null
  bannerImage: string | null
  coverImage: MediaCoverImage
  stats: MediaStats
}
export interface MediaStats {
  scoreDistribution: ScoreDistribution[] | null
}
export interface ScoreDistribution {
  score: number
  amount: number
}
export interface MediaTitle {
  romaji: string
  english: string
  native: string
}

export type MediaRelation =
  | 'ADAPTATION'
  | 'PREQUEL'
  | 'SEQUEL'
  | 'PARENT'
  | 'SIDE_STORY'
  | 'CHARACTER'
  | 'SUMMARY'
  | 'ALTERNATIVE'
  | 'SPIN_OFF'
  | 'OTHER'
  | 'SOURCE'
  | 'COMPILATION'
  | 'CONTAINS'

export interface MediaEdge {
  node: Node
  relationType: MediaRelation
  id: number
}

export interface Studio {
  id: number
  name: string
}

export interface MediaCoverImage {
  extraLarge: string | null
  large: string | null
  medium: string | null
  color: string | null
}

export type MediaStatus =
  | 'CURRENT'
  | 'PLANNING'
  | 'COMPLETED'
  | 'DROPPED'
  | 'PAUSED'
  | 'REPEATING'
