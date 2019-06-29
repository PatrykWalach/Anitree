import { Location } from 'vue-router'
import Vue from 'vue'
// import VueRouter from 'vue-router'
export interface HTMLElementEvent<T extends HTMLElement> extends Event {
  target: T
  currentTarget: T
}

export type Next<V extends Vue = Vue> = (
  to?: string | false | void | Location | ((vm: V) => any) | undefined
) => void

export interface Data<T = any> {
  [index: string]: T
}

export interface MediaDate {
  year: number | null
  month: number | null
  day: number | null
}
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
export interface StudioNode {
  id: number
  name: string
}
export interface AMedia extends MediaNode {
  filtered?: boolean
  startDate: MediaDate
  endDate: MediaDate
  format: string
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
  mediaListEntry: null | {
    status: string
  }
  status: string
  bannerImage: string
  coverImage: CoverImage
}

export interface MediaEdgeExtended {
  node: AMedia
  relationType: string
}

//trello
export interface TrelloList {
  closed: boolean
  id: string
  idBoard: string
  name: string
  pos: number
  softLimit: null // not in documentation
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
  dueReminder: null | string // not in documentation
  // email:null // my requst didn't have this
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
  // address: string // my requst didn't have this
  // loactionName: string // my requst didn't have this
  // coordinates: string | { latitude: number; longitude: number } // my requst didn't have this
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

export interface LoadingState {
  loading: null | Promise<any>
}
