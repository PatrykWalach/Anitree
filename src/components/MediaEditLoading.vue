<template>
  <VCard>
    <VCardText class="pa-0">
      <MediaCardLoadingBanner />
      <MediaItemLoading />
      <VDivider />
      <MediaEditLoadingTabs
        :style="{ position: 'sticky', top: 0, 'z-index': 2 }"
      />
      <VContainer>
        <v-row justify="center" align="center">
          <v-progress-circular indeterminate />
        </v-row>
      </VContainer>
    </VCardText>
    <VDivider />
    <MediaEditLoadingActions @close="$emit('close')" />
  </VCard>
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
