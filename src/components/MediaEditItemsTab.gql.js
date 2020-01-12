import gql from 'graphql-tag'
import { FormDirector_media } from './FormDirector.gql.js'

export const MediaEditItemsTab_media = gql`
  fragment MediaEditItemsTab_media on Media {
    id
    ...FormDirector_media
  }
  ${FormDirector_media}
`
