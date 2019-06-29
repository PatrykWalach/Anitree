import { MediaEdgeExtended } from '@/types'

export type FetchVariables =
  | {
      idIn: number[]
      page?: number
    }
  | {
      search: string
      page?: number
    }
  | {
      idIn: number[]
      search: string
      page?: number
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

// export interface Relation {
//   id: number
//   parent: MediaNode
//   child: MediaNode
//   relationType: string
// }
