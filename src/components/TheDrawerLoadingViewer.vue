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
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  components: {
    MediaItemLoadingAvatar,
  },
})
</script>
