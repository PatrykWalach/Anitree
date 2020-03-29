import { Ref, computed } from '@vue/composition-api'
import { useComputedOrCallback } from './reducer'

import { useTitle_media } from './__generated__/useTitle_media'

export const useTitle = (
  value: Ref<useTitle_media> | (() => useTitle_media),
) => {
  const media = useComputedOrCallback(value)

  return computed(() => media.value.title?.userPreferred || '')
}

import gql from 'graphql-tag'

export const useTitleFragments = {
  media: gql`
    fragment useTitle_media on Media {
      id
      title {
        userPreferred
      }
    }
  `,
}
