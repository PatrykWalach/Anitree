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
import { SetupContext, computed, createComponent } from '@vue/composition-api'
import { Media } from '@/graphql/schema/media'
import MediaCard from './MediaCard.vue'
import MediaCardTime from './MediaCardTime.vue'

export interface Props {
  media: Media | null
}

export default createComponent<Readonly<Props>>({
  components: {
    MediaCard,
    MediaCardTime,
  },
  props: {
    media: { default: null, required: true, type: null },
  },
  setup(props, { root }: SetupContext) {
    const color = computed(
      () =>
        (props.media && props.media.coverImage.color) ||
        (root.$vuetify.theme.dark ? '#555' : '#e0e0e0'),
    )

    const currentId = computed(() => parseInt(root.$route.params.mediaId, 10))

    const large = computed(
      () =>
        !!currentId.value &&
        (props.media && props.media.id === currentId.value),
    )

    return { color, currentId, large }
  },
})
</script>
