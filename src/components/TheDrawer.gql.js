import gql from 'graphql-tag'
import { TheDrawerViewer_viewer } from './TheDrawerViewer.gql.js'

export const TheDrawerQuery = gql`
  query TheDrawerQuery {
    Viewer {
      id
      ...TheDrawerViewer_viewer
    }
  }
  ${TheDrawerViewer_viewer}
`
