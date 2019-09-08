import { Location } from 'vue-router'
import Vue from 'vue'
import { MediaStatus, FuzzyDate } from '@/graphql/schema/media'

export interface ShareData {
  url?: string
  title?: string
  text?: string
}
export interface NewNavigator extends Navigator {
  share?: (data: ShareData) => Promise<void>
}

// export type RawFilter = (
//   value: MediaEdgeExtended,
//   index: number,
//   array: MediaEdgeExtended[]
// ) => boolean

// export interface Tooltip {
//   attrs: {
//     type?: 'button'
//     role: 'button'
//     'aria-haspopup': true
//     'aria-expanded': 'true' | 'false'
//   }
//   on: {
//     blur: Function
//     focus: Function
//     keydown: Function
//     mouseenter: Function
//     mouseleave: Function
//   }
// }

// export interface Filter {
//   filter: RawFilter
//   exclusive: boolean
//   active: boolean
//   id: string
// }

export type To = string | false | void | Location
export type Next = (to?: To) => void

export type NextBefore<V extends Vue = Vue> = (
  to?: To | ((vm: V) => any)
) => void

export interface Data<T = any> {
  [index: string]: T
}

export type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object
    ? RecursivePartial<T[P]>
    : T[P]
}

export interface Form {
  status: MediaStatus | null
  score: number
  progress: number | null
  progressVolumes: number | null
  startedAt: Omit<FuzzyDate, '__typename'>
  completedAt: Omit<FuzzyDate, '__typename'>
  repeat: number
  notes: string | null
  advancedScores: number[]
}

export interface ValidDate {
  year: number
  month: number | null
  day: number | null
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
