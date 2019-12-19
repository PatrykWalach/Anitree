<template>
  <v-list-item>
    <MediaCardLoadingItemAvatar tile size="40" />
    <v-list-item-content>
      <v-list-item-title>
        <v-skeleton-loader type="text"></v-skeleton-loader>
      </v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script lang="ts">
import MediaCardLoadingItemAvatar from './MediaCardLoadingItemAvatar.vue'
import { createComponent } from '@vue/composition-api'

export default createComponent({
  components: {
    MediaCardLoadingItemAvatar,
  },
})
</script>
