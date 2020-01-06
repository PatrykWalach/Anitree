import { Ref, computed, ref } from '@vue/composition-api'
import { Share_media } from './__generated__/Share_media'
import { useComputedOrCallback } from './reducer'

import { useTitle } from './results'

export const useShare = (value: Ref<Share_media> | (() => Share_media)) => {
  const media = useComputedOrCallback(value)

  const title = useTitle(media)
  const siteUrl = computed(() => media.value.siteUrl)

  const shareData = computed(() => ({
    text: media.value.rawDescription || undefined,
    title: title.value,
    url: siteUrl.value || undefined,
  }))

  const isShared = ref(false)

  const desktopShare = () => {
    isShared.value = true
  }

  const share = () => {
    const shareDataValue = shareData.value
    if (shareDataValue.title && shareDataValue.url) {
      if (navigator.share) {
        navigator.share(shareDataValue)
      } else {
        desktopShare()
      }
    }
  }

  return { isShared, share, shareData }
}
