import { ScoreFormat } from './viewer'
import { MediaList } from './mediaListCollection'

export interface Variables {
  isAdult?: boolean
  id: number
  format?: ScoreFormat
}

export interface Node {
  __typename: 'Media'
  id: number
  type: MediaType
}

export type MediaType = 'MANGA' | 'ANIME'
export interface FuzzyDate {
  __typename: 'FuzzyDate'
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
  ranknigs: MediaRank[]
  mediaListEntry: MediaList | null
  title: MediaTitle
  siteUrl: string
  relations: MediaConnection
  tags: MediaTag[]
  studios: StudioConnection
  status: MediaStatus | null
  bannerImage: string | null
  coverImage: MediaCoverImage
  stats: MediaStats
}
export interface MediaConnection {
  __typename: 'MediaConnection'
  edges: MediaEdge[]
}
export interface MediaTag {
  __typename: 'MediaTag'
  id: number
  rank: number
  name: string
}
export interface StudioConnection {
  __typename: 'StudioConnection'

  nodes: Studio[]
}
export interface MediaRank {
  __typename: 'MediaRank'
  allTime: boolean
  context: string
  rank: number
  type: 'RATED' | 'POPULAR'
  year: null | number
}
export interface MediaStats {
  __typename: 'MediaStats'
  scoreDistribution: ScoreDistribution[] | null
}
export interface ScoreDistribution {
  __typename: 'ScoreDistribution'
  score: number
  amount: number
}
export interface MediaTitle {
  __typename: 'MediaTitle'
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
  __typename: 'MediaEdge'
  node: Node
  relationType: MediaRelation
  id: number
}

export interface Studio {
  __typename: 'Studio'
  id: number
  name: string
}

export interface MediaCoverImage {
  __typename: 'MediaCoverImage'
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
