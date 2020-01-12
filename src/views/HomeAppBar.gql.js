import gql from 'graphql-tag'

export const HomeAppBarQuery = gql`
  query HomeAppBarQuery {
    Viewer {
      id
      siteUrl
      name
      avatar {
        large
      }
    }
  }
`
