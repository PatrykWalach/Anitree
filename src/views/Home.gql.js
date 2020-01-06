import gql from 'graphql-tag'
import { MediaCard_media } from '../components/MediaCard.js'

export const HomeQuery = gql`
  query HomeQuery($perPage: Int = 50) {
    Page(perPage: $perPage) {
      media(sort: TRENDING_DESC) {
        id
        ...MediaCard_media
      }
    }
  }
  ${MediaCard_media}
`
