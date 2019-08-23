<template>
  <v-timeline-item
    :small="$vuetify.breakpoint.smAndDown && !large"
    :large="!$vuetify.breakpoint.smAndDown && large"
    :color="color"
  >
    <template v-slot:opposite>
      <MediaCardTime v-if="media" :media="media" />
    </template>

    <MediaCard :id="media.id" />
  </v-timeline-item>
</template>
<script lang="ts">
import MediaCardTime from './MediaCardTime.vue'

import MediaCard from './MediaCard.vue'

import { Media } from '@/apollo/schema/media'
import { createComponent, computed, SetupContext } from 'vue-function-api'

interface Props {
  media: Media | null
}
export default createComponent({
  components: {
    MediaCardTime,
    MediaCard
  },
  props: {
    media: { required: true }
  },
  setup(props: Readonly<Props>, { root }: SetupContext) {
    const color = computed(
      () =>
        (props.media && props.media.coverImage.color) ||
        (root.$vuetify.theme.dark ? '#555' : '#e0e0e0')
    )

    const currentId = computed(() => parseInt(root.$route.params.mediaId, 10))

    const large = computed(
      () =>
        !!currentId.value && (props.media && props.media.id === currentId.value)
    )

    return { color, currentId, large }
  }
})
</script>
