<template>
  <v-timeline-item
    :small="$vuetify.breakpoint.smAndDown && !large"
    :large="!$vuetify.breakpoint.smAndDown && large"
    :color="color"
  >
    <template v-slot:opposite>
      <TheMediaTimelineItemTime :media="media" />
    </template>

    <MediaCard :media="media" />
  </v-timeline-item>
</template>
<script lang="ts">
import { SetupContext, computed, createComponent } from '@vue/composition-api'
import { Media } from '@/graphql/schema/media'
import MediaCard from './MediaCard.vue'
const TheMediaTimelineItemTime = () =>
  import(
    /* webpackChunkName: "TheMediaTimelineItemTime" */ './TheMediaTimelineItemTime.vue'
  )
import { useRouteParams } from '@/App.vue'
import { useTimelineItemColor } from './TheMediaTimelineLoadingItem.vue'

export interface Props {
  media: Media
}

export default createComponent<Readonly<Props>>({
  components: {
    MediaCard,
    TheMediaTimelineItemTime,
  },
  props: {
    media: { default: null, required: true, type: Object },
  },
  setup(props, { root }: SetupContext) {
    const { color: themeColor } = useTimelineItemColor(root)

    const color = computed(() => {
      const coverImageColor = props.media.coverImage.color
      return coverImageColor || themeColor.value
    })

    const { currentId } = useRouteParams(root)

    const large = computed(() => {
      const currentIdValue = currentId.value
      return !!currentIdValue && props.media.id === currentIdValue
    })

    return { color, currentId, large }
  },
})
</script>
