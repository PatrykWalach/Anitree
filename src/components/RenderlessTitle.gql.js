import gql from 'graphql-tag'

import { useTitle_media } from '../hooks/Results.gql.js'

export const RenderlessTitle_media = gql`
  fragment RenderlessTitle_media on Media {
    id
    ...useTitle_media
  }
  ${useTitle_media}
`
