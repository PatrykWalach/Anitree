import { Media } from './media'
import { ScoreFormat } from './viewer'

export interface Variables {
  animeId?: number
  mangaId?: number
  characterId?: number
  staffId?: number
  studioId?: number
  format?: ScoreFormat
}

export interface Favourites {
  anime: {
    nodes: Media[]
  }
  manga: {
    nodes: Media[]
  }
}
