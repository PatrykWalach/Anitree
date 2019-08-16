import { Form } from '@/types'
import { ScoreFormat } from './viewer'

export interface SaveVariables extends Partial<Form> {
  id?: number
  mediaId: number
  scoreRaw?: number
  private?: boolean
  format?: ScoreFormat
}

export interface DeleteVariables {
  id: number
}
