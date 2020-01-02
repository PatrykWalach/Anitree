<template>
  <v-card>
    <v-card-text class="pa-0">
      <MediaCardLoadingBanner />
      <MediaCardLoadingItem />
      <v-divider></v-divider>
      <MediaEditLoadingTabs
        :style="{ position: 'sticky', top: 0, 'z-index': 2 }"
      />
      <v-container>
        <v-row justify="center" align="center">
          <v-progress-circular indeterminate></v-progress-circular>
        </v-row>
      </v-container>
    </v-card-text>
    <v-divider></v-divider>
    <MediaEditLoadingActions @close="$emit('close')" />
  </v-card>
</template>
<script lang="ts">
import MediaCardLoadingBanner from './MediaCardLoadingBanner.vue'
import MediaCardLoadingItem from './MediaCardLoadingItem.vue'
import MediaEditLoadingActions from './MediaEditLoadingActions.vue'
import MediaEditLoadingTabs from './MediaEditLoadingTabs.vue'
import { createComponent } from '@vue/composition-api'

export default createComponent({
  components: {
    MediaCardLoadingBanner,
    MediaCardLoadingItem,
    MediaEditLoadingActions,
    MediaEditLoadingTabs,
  },
})
</script>
