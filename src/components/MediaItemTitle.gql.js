import gql from 'graphql-tag'
import { RenderlessTitle_media } from './RenderlessTitle.gql.js'

export const MediaItemTitle_media = gql`
  fragment MediaItemTitle_media on Media {
    id
    ...RenderlessTitle_media
  }
  ${RenderlessTitle_media}
`
