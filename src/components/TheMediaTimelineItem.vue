<template>
  <v-timeline-item
    :small="$vuetify.breakpoint.smAndDown && !large"
    :large="!$vuetify.breakpoint.smAndDown && large"
    :color="color"
  >
    <template v-slot:opposite>
      <v-skeleton-loader
        tile
        :style="{ display: 'inline-block' }"
        :loading="!media"
        type="chip"
      >
        <MediaCardTime :media="media" />
      </v-skeleton-loader>
    </template>

    <MediaCard :id="(media && media.id) || 0" />
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
    const color = computed(() => {
      const { media } = props
      return (
        (media && media.coverImage.color) ||
        (root.$vuetify.theme.dark ? '#555' : '#e0e0e0')
      )
    })

    const currentId = computed(() => parseInt(root.$route.params.mediaId, 10))

    const large = computed(() => {
      const { media } = props
      const _currentId = currentId.value

      return !!_currentId && (media && media.id === _currentId)
    })

    return { color, currentId, large }
  },
})
</script>
