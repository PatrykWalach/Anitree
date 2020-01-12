import gql from 'graphql-tag'
import { RenderlessSubtitle_media } from './RenderlessSubtitle.gql.js'

export const MediaItemSubtitle_media = gql`
  fragment MediaItemSubtitle_media on Media {
    id
    ...RenderlessSubtitle_media
  }
  ${RenderlessSubtitle_media}
`
