import { Media, MediaType } from './media'
import { ScoreFormat } from './viewer'

export interface Variables {
  idIn?: number[] | number
  page?: number
  format?: ScoreFormat
  isAdult?: boolean
  onList?: boolean
  search?: string
  includedTags?: string[]
  year?: number
  type?: MediaType
  season?: MediaSeason
  sort?: MediaSort[]
}

export type MediaSeason = 'WINTER'
export type MediaSort = 'POPULARITY_DESC'

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
