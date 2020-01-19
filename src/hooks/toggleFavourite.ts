import { Ref, computed } from '@vue/composition-api'
import {
  ToggleFavouriteMutation as ToggleFavouriteMutationResult,
  ToggleFavouriteMutationVariables,
} from './__generated__/ToggleFavouriteMutation'
import {
  ToggleFavouriteQuery as ToggleFavouriteQueryResult,
  ToggleFavouriteQueryVariables,
} from './__generated__/ToggleFavouriteQuery'
import { useMutation, useQueryLoading } from '@vue/apollo-composable'
import { DataProxy } from 'apollo-cache'
import { DocumentNode } from 'graphql'
import {
  ToggleFavouriteQuery,
  ToggleFavouriteMutation,
} from './ToggleFavourite.gql.js'
import { ToggleFavourite_media } from './__generated__/ToggleFavourite_media'
import produce from 'immer'
import { useNumber } from './intl'
import { useToken } from './token'
import { useComputedOrCallback } from './reducer'

export const useFavourites = (
  value: Ref<ToggleFavourite_media> | (() => ToggleFavourite_media),
) => {
  const media = useComputedOrCallback(value)

  const favourites = useNumber(() => media.value.favourites || 0)

  const isFavourite = computed(() => media.value.isFavourite)
  const id = computed(() => media.value.id)

  const { mutate, loading: mutationLoading } = useMutation<
    ToggleFavouriteMutationResult,
    ToggleFavouriteMutationVariables
  >(ToggleFavouriteMutation)

  const variables = computed(() => {
    if (media.value.type === 'MANGA') {
      return {
        mangaId: id.value,
      }
    }
    return {
      animeId: id.value,
    }
  })

  const token = useToken()

  const toggleFavourite = () => {
    if (token.value) {
      mutate(variables.value, {
        update: cache => updateToggleFavourite(cache, id.value),
      })
    }
  }

  const queryLoading = useQueryLoading()

  return {
    favourites,
    isFavourite,
    mutationLoading,
    queryLoading,
    toggleFavourite,
  }
}

const updateToggleFavourite = (cache: DataProxy, mediaId: number) => {
  const query: {
    variables: ToggleFavouriteQueryVariables
    query: DocumentNode
  } = {
    query: ToggleFavouriteQuery,
    variables: { id: mediaId },
  }

  const data: ToggleFavouriteQueryResult | null = cache.readQuery(query)

  cache.writeQuery({
    ...query,
    data: produce(data, draft => {
      if ( draft?.Media) {
        draft.Media.isFavourite = !draft.Media.isFavourite
        if (draft.Media.isFavourite) {
          if (draft.Media.favourites === null) {
            draft.Media.favourites = 1
          } else {
            draft.Media.favourites++
          }
        } else {
          if (draft.Media.favourites === null) {
            draft.Media.favourites = 0
          } else {
            draft.Media.favourites--
          }
        }
      }
    }),
  })
}
