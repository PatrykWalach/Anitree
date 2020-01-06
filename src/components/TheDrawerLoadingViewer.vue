<template>
  <v-list-item>
    <MediaItemLoadingAvatar size="40" />
    <v-list-item-content>
      <v-list-item-title>
        <v-skeleton-loader type="text" />
      </v-list-item-title>
    </v-list-item-content>
  </v-list-item>
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
