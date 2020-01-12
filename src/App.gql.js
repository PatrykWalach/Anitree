import gql from 'graphql-tag'
import { MediaEdit_viewer } from './components/MediaEdit.gql.js'
import { Search_viewer } from './views/Search.gql.js'

export const AppQuery = gql`
  query AppQuery {
    Viewer {
      id
      ...MediaEdit_viewer
      ...Search_viewer
    }
  }
  ${MediaEdit_viewer}
  ${Search_viewer}
`
