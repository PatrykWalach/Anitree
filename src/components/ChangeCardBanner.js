import { MediaItemAvatar_media } from './MediaItemAvatar'
import { MediaItemSubtitle_media } from './MediaItemSubtitle'
import { MediaItemTitle_media } from './MediaItemTitle'

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
