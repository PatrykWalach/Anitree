<template>
  <VListItem>
    <MediaItemLoadingAvatar size="40" />
    <VListItemContent>
      <VListItemTitle>
        <v-skeleton-loader type="text" />
      </VListItemTitle>
    </VListItemContent>
  </VListItem>
</template>

<script lang="ts">
import MediaItemLoadingAvatar from './MediaItemLoadingAvatar.vue'
import { createComponent } from '@vue/composition-api'

export default createComponent({
  components: {
    MediaItemLoadingAvatar,
  },
})
</script>
