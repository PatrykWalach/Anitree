import { FuzzyDate } from '@/graphql/schema/media'
import { Location } from 'vue-router'
import { MediaListStatus } from './graphql/schema/mediaListCollection'
import Vue from 'vue'

export interface ShareData {
  url?: string
  title?: string
  text?: string
}

export type To = string | false | void | Location
export type Next = (to?: To) => void

export type NextBefore<V extends Vue = Vue> = (
  to?: To | ((vm: V) => any),
) => void

export interface Data<T = any> {
  [index: string]: T
}
export interface NavigationElement<
  Bind = Partial<{
    to: Location
    exact: boolean
    disabled: boolean
    href: string | null
    rel: string
    target: string
  }>
> {
  title: string
  icon: string
  bind: Bind
  on?: Record<string, (e: any) => any>
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

export interface ValidDate {
  year: number
  month: number
  day: number | null
}
