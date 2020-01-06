<template>
  <v-card>
    <MediaCardLoadingBanner />
    <MediaItemLoading />
    <v-divider class="mx-4" />
    <v-skeleton-loader type="actions" />
    <MediaCardLoadingStatus />
  </v-card>
</template>
<script lang="ts">
import MediaCardLoadingBanner from '@/components/MediaCardLoadingBanner.vue'
import MediaCardLoadingStatus from '@/components/MediaCardLoadingStatus.vue'
import MediaItemLoading from '@/components/MediaItemLoading.vue'
import { createComponent } from '@vue/composition-api'

export default createComponent({
  components: {
    MediaCardLoadingBanner,
    MediaCardLoadingStatus,
    MediaItemLoading,
  },
})
</script>

<style lang="scss">
.loader {
  height: 100%;
}
.loader > .v-skeleton-loader__image.v-skeleton-loader__bone {
  height: 100%;
}
</style>
