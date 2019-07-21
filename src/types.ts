import { Location } from 'vue-router'
import Vue from 'vue'
export interface HTMLElementEvent<T extends HTMLElement = HTMLElement>
  extends Event {
  target: T
  currentTarget: T
}
export interface Token {
  access_token: string
  token_type: string
  expires_in: string
}
export type ScoreFormat =
  | 'POINT_100'
  | 'POINT_10_DECIMAL'
  | 'POINT_10'
  | 'POINT_5'
  | 'POINT_3'

export interface MediaListTypeOptions {
  customLists: string[]
  advancedScoring: string[]
  advancedScoringEnabled: boolean
}
export interface User {
  options: {
    profileColor: string
    displayAdultContent: boolean
  }
  mediaListOptions: {
    scoreFormat: ScoreFormat
    animeList: MediaListTypeOptions
    mangaList: MediaListTypeOptions
  }
}

export interface FetchVariables {
  isAdult?: boolean
  search?: string
  idIn?: number[] | number
  page?: number
  includedTags?: string[] | string
  year?: number
  season?: string
  sort?: string | string[]
}

export type RawFilter = (
  value: MediaEdgeExtended,
  index: number,
  array: MediaEdgeExtended[]
) => boolean

export interface Filter {
  filter: RawFilter
  exclusive: boolean
  active: boolean
  id: string
}
export type To = string | false | void | Location
export type Next = (to?: To) => void

export type NextBefore<V extends Vue = Vue> = (
  to?: To | ((vm: V) => any)
) => void

export interface Data<T = any> {
  [index: string]: T
}

export interface MediaDate {
  year: number | null
  month: number | null
  day: number | null
}
// export type MediaDate = Nullable<ValidDate>
export interface MediaNode {
  id: number
  type: string
}

export interface MediaEdge {
  node: MediaNode
  relationType: string
  id: number
}

export interface CoverImage {
  extraLarge: string
  large: string
  medium: string
  color: string | null
}
export type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object
    ? RecursivePartial<T[P]>
    : T[P]
}

export interface StudioNode {
  id: number
  name: string
}
export interface MediaList {
  id: number
  status: MediaListStatus
  score: number
  progress: number | null
  progressVolumes: number | null
  startedAt: MediaDate
  completedAt: MediaDate
  repeat: number
  private: boolean
  notes: string | null
  advancedScores: {
    [index: string]: number
  }
}
export interface Form {
  [index: string]: any
  status: MediaListStatus | null
  score: number
  progress: number
  progressVolumes: number
  startedAt: MediaDate
  completedAt: MediaDate
  repeat: number
  notes: string
  advancedScores: number[]
}

export type MediaListStatus =
  | 'CURRENT'
  | 'PLANNING'
  | 'COMPLETED'
  | 'DROPPED'
  | 'PAUSED'
  | 'REPEATING'
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
export interface MutationVariables extends Partial<Form> {
  id?: number
  mediaId: number
  scoreRaw?: number
  private?: boolean
}
export interface ValidDate {
  [index: string]: null | number
  year: number
  month: number | null
  day: number | null
}
export interface Media extends MediaNode {
  filtered?: boolean
  startDate: MediaDate
  endDate: MediaDate
  format: string | null
  season: string | null
  seasonInt: number | null
  episodes: number | null
  chapters: number | null
  volumes: number | null
  isFavourite: boolean
  title: {
    romaji: string

    english: string
    native: string
  }
  siteUrl: string
  relations: {
    edges: MediaEdge[]
  }
  tags: {
    rank: number
    name: string
  }[]
  studios: {
    nodes: StudioNode[]
  }
  mediaListEntry: null | MediaList
  status: MediaListStatus | null
  bannerImage: string | null
  coverImage: CoverImage
}

export interface MediaEdgeExtended {
  node: Media
  relationType: string
}

//trello
export interface TrelloList {
  closed: boolean
  id: string
  idBoard: string
  name: string
  pos: number
  softLimit: null
  subsribed: boolean
}

export interface Label {
  color: string
  id: string
  idBoard: string
  name: string
}

export interface TrelloCard {
  badges: {
    attachments: number
    attachmentsByType: {
      trello: {
        board: number
        card: number
      }
    }
    checkItems: number
    checkItemsChecked: number
    comments: number
    description: boolean
    due: null | string
    dueComplete: boolean
    fogbugz: string
    location: boolean
    subscribed: boolean
    wievingMemberVoted: boolean
    votes: number
  }

  checkItemStates: null | []
  closed: boolean
  dateLastactivity: string
  desc: string
  descData: null | { emoji: { [index: string]: string } }
  due: null | string
  dueComplete: boolean
  dueReminder: null | string
  id: string
  idAttachmentCover: null | string
  idBoard: string
  idChecklists: string[]
  idLabels: string[]
  idList: string
  idMembers: string[]
  idMembersVoted: string[]
  idShort: number
  labels: Label[]
  manualCoverAttachment: boolean
  name: string
  pos: number
  shortLink: string
  shortUrl: string
  subscribed: boolean
  url: string
}

export type Cards = {
  card: TrelloCard
  checklists: TrelloChecklist[]
  // progress: number
}[]

export interface TrelloChecklist {
  checkItems: [
    {
      id: string
      idChecklist: string
      name: string
      nameData: null
      pos: number
      state: string
    }
  ]
  id: string
  idBoard: string
  idCard: string
  name: string
  pos: number
}
