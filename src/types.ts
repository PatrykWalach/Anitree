import { FuzzyDate } from '@/graphql/schema/media'
import { Location } from 'vue-router'
import { MediaListStatus } from './graphql/schema/mediaListCollection'
import Vue from 'vue'

export interface ShareData {
  url?: string
  title?: string
  text?: string
}
export interface NewNavigator extends Navigator {
  share?: (data: ShareData) => Promise<void>
}

export type To = string | false | void | Location
export type Next = (to?: To) => void

export type NextBefore<V extends Vue = Vue> = (
  to?: To | ((vm: V) => any),
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
  status: MediaListStatus | null
  score: number
  progress: number | null
  progressVolumes: number | null
  startedAt: Omit<FuzzyDate, '__typename'>
  completedAt: Omit<FuzzyDate, '__typename'>
  repeat: number
  notes: string | null
  advancedScores: number[]
}

// export interface ValidDate {
//   year: number
//   month: number | null
//   day: number | null
// }