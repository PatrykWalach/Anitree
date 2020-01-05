import { MediaCardItemAvatar_media } from './MediaCardItemAvatar'
import { MediaCardItemSubtitle_media } from './MediaCardItemSubtitle'
import { MediaCardItemTitle_media } from './MediaCardItemTitle'

import gql from 'graphql-tag'

export const ChangeCardBanner_media = gql`
  fragment ChangeCardBanner_media on Media {
    id
    title {
      userPreferred
    }
    ...MediaCardItemAvatar_media
    ...MediaCardItemSubtitle_media
    ...MediaCardItemTitle_media
  }
  ${MediaCardItemAvatar_media}
  ${MediaCardItemSubtitle_media}
  ${MediaCardItemTitle_media}
`
