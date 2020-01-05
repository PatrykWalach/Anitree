import gql from 'graphql-tag'

export const FormDirector_media = gql`
  fragment FormDirector_media on Media {
    id
    volumes
    chapters
    episodes
  }
`
