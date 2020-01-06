import gql from 'graphql-tag'

export const Page_page = gql`
  fragment Page_page on Page {
    pageInfo {
      hasNextPage
      currentPage
    }
  }
`
export const Page_media = gql`
  fragment Page_media on Media {
    id
  }
`
