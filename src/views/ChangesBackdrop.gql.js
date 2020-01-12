import gql from 'graphql-tag'
import { TheDrawerViewer_viewer } from '../components/TheDrawerViewer.gql.js'

export const ChangesBackdropQuery = gql`
  query ChangesBackdropQuery {
    Viewer {
      id
      ...TheDrawerViewer_viewer
    }
  }
  ${TheDrawerViewer_viewer}
`
