import { Ref, computed } from '@vue/composition-api'
import { useComputedOrCallback } from './reducer'

import { useTitle_media } from './__generated__/useTitle_media'

export const useTitle = (
  value: Ref<useTitle_media> | (() => useTitle_media),
) => {
  const media = useComputedOrCallback(value)

  return computed(() => {
    const titleValue = media.value.title
    return (titleValue && titleValue.userPreferred) || ''
  })
}
