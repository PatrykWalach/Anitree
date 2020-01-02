<template>
  <v-timeline-item :small="$vuetify.breakpoint.smAndDown" :color="color">
    <template v-slot:opposite>
      <v-skeleton-loader
        tile
        :style="{ display: 'inline-block' }"
        type="chip"
      />
    </template>

    <MediaCardLoading />
  </v-timeline-item>
</template>
<script lang="ts">
import { SetupContext, computed, createComponent } from '@vue/composition-api'
import MediaCardLoading from './MediaCardLoading.vue'

export const useTimelineItemColor = (root: SetupContext['root']) => {
  const color = computed(() => (root.$vuetify.theme.dark ? '#555' : '#e0e0e0'))
  return { color }
}

export default createComponent({
  components: {
    MediaCardLoading,
  },
  setup(props, { root }: SetupContext) {
    return useTimelineItemColor(root)
  },
})
</script>
