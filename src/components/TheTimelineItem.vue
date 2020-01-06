<template>
  <v-timeline-item
    :small="$vuetify.breakpoint.smAndDown && !large"
    :large="!$vuetify.breakpoint.smAndDown && large"
    color="accent"
  >
    <template v-slot:opposite>
      <TheTimelineItemTime :media="media" />
    </template>

    <MediaCard :media="media" />
  </v-timeline-item>
</template>
<script lang="ts">
import { SetupContext, computed, createComponent } from '@vue/composition-api'

import MediaCard from './MediaCard.vue'

import { useRouteParams } from '@/hooks/route'
import { TheTimelineItem_media } from './__generated__/TheTimelineItem_media'
const TheTimelineItemTime = () =>
  import(
    /* webpackChunkName: "TheTimelineItemTime" */ /* webpackPrefetch: true */ './TheTimelineItemTime.vue'
  )

export interface Props {
  media: TheTimelineItem_media
}

export default createComponent<Readonly<Props>>({
  components: {
    MediaCard,
    TheTimelineItemTime,
  },
  props: {
    media: { default: null, required: true, type: Object },
  },
  setup(props, { root }: SetupContext) {
    const { currentId } = useRouteParams(root)

    const large = computed(() => {
      const currentIdValue = currentId.value
      return !!currentIdValue && props.media.id === currentIdValue
    })

    return { currentId, large }
  },
})
</script>
