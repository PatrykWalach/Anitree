import gql from 'graphql-tag'
import { TimelineAppBar_media } from './views/TimelineAppBar.js'
import { TimelineDrawer_media } from './views/TimelineDrawer.js'

export const RouterTimelineAppBarQuery = gql`
  query RouterTimelineAppBarQuery($id: Int) {
    Media(id: $id) {
      id
      ...TimelineAppBar_media
    }
  }
  ${TimelineAppBar_media}
`

export const RouterTimelineDrawerQuery = gql`
  query RouterTimelineDrawerQuery($id: Int) {
    Media(id: $id) {
      id
      ...TimelineDrawer_media
    }
  }
  ${TimelineDrawer_media}
`

export const RouterTimelineQuery = gql`
  query RouterTimelineQuery($id: Int) {
    Media(id: $id) {
      id
      title {
        userPreferred
      }
    }
  }
`
