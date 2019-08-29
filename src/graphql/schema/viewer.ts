export interface User {
  id: number
  name: string
  avata: UserAvatar
  siteUrl: string
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
export interface UserAvatar {
  large: string
  medium: string
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
