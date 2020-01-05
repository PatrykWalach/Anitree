import gql from 'graphql-tag'

export const Page_page = gql`
  fragment Page_page on Page {
    pageInfo {
      hasNextPage
      currentPage
    }
  }
`
