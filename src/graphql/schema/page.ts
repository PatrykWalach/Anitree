import { Media, MediaType } from './media'
import { ScoreFormat } from './viewer'

export interface Variables {
  idIn?: readonly number[] | number
  page?: number
  format?: ScoreFormat
  isAdult?: boolean
  onList?: boolean
  search?: string
  includedTags?: string[] | string
  year?: number
  type?: MediaType
  season?: MediaSeason
  sort?: MediaSort[] | MediaSort
  perPage?: number
}

export type MediaSeason = 'WINTER' | 'SPRING' | 'SUMMER' | 'FALL'
export type MediaSort =
  | 'ID'
  | 'ID_DESC'
  | 'TITLE_ROMAJI'
  | 'TITLE_ROMAJI_DESC'
  | 'TITLE_ENGLISH'
  | 'TITLE_ENGLISH_DESC'
  | 'TITLE_NATIVE'
  | 'TITLE_NATIVE_DESC'
  | 'TYPE'
  | 'TYPE_DESC'
  | 'FORMAT'
  | 'FORMAT_DESC'
  | 'START_DATE'
  | 'START_DATE_DESC'
  | 'END_DATE'
  | 'END_DATE_DESC'
  | 'SCORE'
  | 'SCORE_DESC'
  | 'POPULARITY'
  | 'POPULARITY_DESC'
  | 'TRENDING'
  | 'TRENDING_DESC'
  | 'EPISODES'
  | 'EPISODES_DESC'
  | 'DURATION'
  | 'DURATION_DESC'
  | 'STATUS'
  | 'STATUS_DESC'
  | 'CHAPTERS'
  | 'CHAPTERS_DESC'
  | 'VOLUMES'
  | 'VOLUMES_DESC'
  | 'UPDATED_AT'
  | 'UPDATED_AT_DESC'
  | 'SEARCH_MATCH'
  | 'FAVOURITES'
  | 'FAVOURITES_DESC'

export interface PageInfo {
  total: number
  hasNextPage: boolean
  lastPage: number
  currentPage: number
}

export interface Page {
  pageInfo: PageInfo
  media: Media[]
}
