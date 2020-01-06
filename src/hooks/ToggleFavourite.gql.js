import gql from 'graphql-tag'
export const ToggleFavourite_media = gql`
  fragment ToggleFavourite_media on Media {
    id
    favourites
    isFavourite
    type
  }
`

export const ToggleFavouriteQuery = gql`
  query ToggleFavouriteQuery($id: Int) {
    Media(id: $id) {
      id
      isFavourite
      favourites
    }
  }
`

export const ToggleFavouriteMutation = gql`
  mutation ToggleFavouriteMutation($animeId: Int, $mangaId: Int) {
    ToggleFavourite(animeId: $animeId, mangaId: $mangaId) {
      anime {
        pageInfo {
          hasNextPage
        }
      }
      manga {
        pageInfo {
          hasNextPage
        }
      }
    }
  }
`
