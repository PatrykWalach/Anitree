import { MediaEdgeExtended, MediaNode, AMedia } from '@/types'

export type FetchVariables =
  | {
      id_in: number[]
    }
  | {
      search: string
    }
  | {
      id_in: number[]
      search: string
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
