import { MediaItemAvatar_media } from './MediaItemAvatar.gql.js'
import { MediaItemDescription_media } from './MediaItemDescription.gql.js'
import { MediaItemOverline_media } from './MediaItemOverline.gql.js'
import { MediaItemRatings_media } from './MediaItemRatings.gql.js'
import { MediaItemSubtitle_media } from './MediaItemSubtitle.gql.js'
import { MediaItemTitle_media } from './MediaItemTitle.gql.js'

import gql from 'graphql-tag'

export const MediaItem_media = gql`
  fragment MediaItem_media on Media {
    id
    description
    ...MediaItemAvatar_media
    ...MediaItemDescription_media
    ...MediaItemOverline_media
    ...MediaItemRatings_media
    ...MediaItemSubtitle_media
    ...MediaItemTitle_media
  }
  ${MediaItemAvatar_media}
  ${MediaItemDescription_media}
  ${MediaItemOverline_media}
  ${MediaItemRatings_media}
  ${MediaItemSubtitle_media}
  ${MediaItemTitle_media}
`
