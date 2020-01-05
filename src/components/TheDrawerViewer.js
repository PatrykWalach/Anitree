import gql from 'graphql-tag'

export const TheDrawerViewer_viewer = gql`
  fragment TheDrawerViewer_viewer on User {
    id
    name
    avatar {
      large
    }
    siteUrl
  }
`
