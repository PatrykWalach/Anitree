import { FuzzyDateInput, MediaListStatus } from '@/../__generated__/globalTypes'
import { Location } from 'vue-router'

import { VuetifyThemeVariant } from 'vuetify/types/services/theme'

export interface ShareData {
  url?: string
  title?: string
  text?: string
}
export type Theme = {
  dark: boolean
  themes: {
    dark: Partial<VuetifyThemeVariant>
    light: Partial<VuetifyThemeVariant>
  }
}
export type NonNullableValues<T> = {
  [K in keyof T]: NonNullable<T[K]>
}

export interface Data<T = any> {
  [index: string]: T
}
export interface NavigationElement<
  A = Partial<{
    to: Location
    exact: boolean
    disabled: boolean
    href: string | null
    rel: string
    target: string
  }>
> {
  props: {
    tooltip?: string
    icon: string
    title?: string
    iconColor?: string
  }
  attrs: A
  on?: Record<string, (e: any) => any>
}

export type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends Object
    ? RecursivePartial<T[P]>
    : T[P]
}
export type Mutable<T> = {
  -readonly [P in keyof T]: T[P]
}
export type RecursiveMutable<T> = {
  -readonly [P in keyof T]: RecursiveMutable<T[P]>
}

export interface Form {
  status: Mutable<MediaListStatus> | null
  score: number
  progress: number | null
  progressVolumes: number | null
  startedAt: Omit<Mutable<FuzzyDateInput>, '__typename'>
  completedAt: Omit<Mutable<FuzzyDateInput>, '__typename'>
  repeat: number
  notes: string | null
  advancedScores: number[]
}

export interface ValidDate {
  year: number
  month: number
  day: number | null
}
