import { ChangeCardBanner_media } from './ChangeCardBanner'

import gql from 'graphql-tag'

export const ChangeCardQuery = gql`
  query ChangeCardQuery($id: Int) {
    Media(id: $id) {
      id
      ...ChangeCardBanner_media
    }
  }
  ${ChangeCardBanner_media}
`
