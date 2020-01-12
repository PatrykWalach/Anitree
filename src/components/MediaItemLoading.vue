<template>
  <VListItem three-line>
    <VListItemContent>
      <MediaItemLoadingOverline />
      <MediaItemLoadingTitle />
      <MediaItemLoadingSubtitle />
      <MediaItemLoadingDescription />
    </VListItemContent>
    <MediaItemLoadingAvatar />
  </VListItem>
</template>
<script lang="ts">
import MediaItemLoadingAvatar from '@/components/MediaItemLoadingAvatar.vue'
import MediaItemLoadingDescription from '@/components/MediaItemLoadingDescription.vue'
import MediaItemLoadingOverline from '@/components/MediaItemLoadingOverline.vue'
import MediaItemLoadingSubtitle from '@/components/MediaItemLoadingSubtitle.vue'
import MediaItemLoadingTitle from '@/components/MediaItemLoadingTitle.vue'
import { createComponent } from '@vue/composition-api'

export default createComponent({
  components: {
    MediaItemLoadingAvatar,
    MediaItemLoadingDescription,
    MediaItemLoadingOverline,
    MediaItemLoadingSubtitle,
    MediaItemLoadingTitle,
  },
})
</script>
