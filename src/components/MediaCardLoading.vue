<template>
  <v-card>
    <MediaCardLoadingBanner />
    <MediaCardLoadingItem />
    <v-divider class="mx-4"></v-divider>
    <v-skeleton-loader type="actions"></v-skeleton-loader>
  </v-card>
</template>
<script lang="ts">
import MediaCardLoadingBanner from '@/components/MediaCardLoadingBanner.vue'
import MediaCardLoadingItem from '@/components/MediaCardLoadingItem.vue'
import { createComponent } from '@vue/composition-api'

export default createComponent({
  components: {
    MediaCardLoadingBanner,
    MediaCardLoadingItem,
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
