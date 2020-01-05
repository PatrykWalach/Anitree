import gql from 'graphql-tag'
import { TheDrawerViewer_viewer } from './TheDrawerViewer.js'

export const TheDrawerQuery = gql`
  query TheDrawerQuery {
    Viewer {
      id
      ...TheDrawerViewer_viewer
    }
  }
  ${TheDrawerViewer_viewer}
`
