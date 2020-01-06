import gql from 'graphql-tag'
import { TheGridCard_media } from './TheGridCard.js'

export const TheGrid_media = gql`
  fragment TheGrid_media on Media {
    id
    ...TheGridCard_media
  }
  ${TheGridCard_media}
`
