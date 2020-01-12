import { MediaItemAvatar_media } from './MediaItemAvatar.gql.js'
import { MediaItemSubtitle_media } from './MediaItemSubtitle.gql.js'
import { MediaItemTitle_media } from './MediaItemTitle.gql.js'

import gql from 'graphql-tag'

export const ChangeCardBanner_media = gql`
  fragment ChangeCardBanner_media on Media {
    id
    title {
      userPreferred
    }
    ...MediaItemAvatar_media
    ...MediaItemSubtitle_media
    ...MediaItemTitle_media
  }
  ${MediaItemAvatar_media}
  ${MediaItemSubtitle_media}
  ${MediaItemTitle_media}
`
