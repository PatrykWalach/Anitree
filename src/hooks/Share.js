import gql from 'graphql-tag'

export const Share_media = gql`
  fragment Share_media on Media {
    id
    siteUrl
    title {
      userPreferred
    }
    rawDescription: description(asHtml: false)
  }
`
