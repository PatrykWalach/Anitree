<template>
  <v-card>
    <v-card-text class="pa-0">
      <MediaCardLoadingBanner />
      <MediaItemLoading />
      <v-divider />
      <MediaEditLoadingTabs
        :style="{ position: 'sticky', top: 0, 'z-index': 2 }"
      />
      <v-container>
        <v-row justify="center" align="center">
          <v-progress-circular indeterminate />
        </v-row>
      </v-container>
    </v-card-text>
    <v-divider />
    <MediaEditLoadingActions @close="$emit('close')" />
  </v-card>
</template>
<script lang="ts">
import MediaCardLoadingBanner from './MediaCardLoadingBanner.vue'
import MediaItemLoading from './MediaItemLoading.vue'
import MediaEditLoadingActions from './MediaEditLoadingActions.vue'
import MediaEditLoadingTabs from './MediaEditLoadingTabs.vue'
import { createComponent } from '@vue/composition-api'

export default createComponent({
  components: {
    MediaCardLoadingBanner,
    MediaItemLoading,
    MediaEditLoadingActions,
    MediaEditLoadingTabs,
  },
})
</script>
