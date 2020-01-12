import gql from 'graphql-tag'

export const useTitle_media = gql`
  fragment useTitle_media on Media {
    id
    title {
      userPreferred
    }
  }
`
