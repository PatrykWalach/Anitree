import { MediaCardItemAvatar_media } from './MediaCardItemAvatar.js'
import { MediaCardItemDescription_media } from './MediaCardItemDescription.js'
import { MediaCardItemOverline_media } from './MediaCardItemOverline.js'
import { MediaCardItemRatings_media } from './MediaCardItemRatings.js'
import { MediaCardItemSubtitle_media } from './MediaCardItemSubtitle.js'
import { MediaCardItemTitle_media } from './MediaCardItemTitle.js'

import gql from 'graphql-tag'

export const MediaCardItem_media = gql`
  fragment MediaCardItem_media on Media {
    id
    description
    ...MediaCardItemAvatar_media
    ...MediaCardItemDescription_media
    ...MediaCardItemOverline_media
    ...MediaCardItemRatings_media
    ...MediaCardItemSubtitle_media
    ...MediaCardItemTitle_media
  }
  ${MediaCardItemAvatar_media}
  ${MediaCardItemDescription_media}
  ${MediaCardItemOverline_media}
  ${MediaCardItemRatings_media}
  ${MediaCardItemSubtitle_media}
  ${MediaCardItemTitle_media}
`
