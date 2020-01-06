<template>
  <v-list-item selectable :[lines]="true">
    <v-list-item-content>
      <MediaItemOverline v-if="media.studios.nodes.length" :media="media" />
      <MediaItemTitle headline :media="media" />
      <MediaItemRatings :media="media" />
      <MediaItemSubtitle body1 :media="media" />
      <MediaItemDescription :media="media" />
    </v-list-item-content>
    <MediaItemAvatar :media="media" />
  </v-list-item>
</template>

<script lang="ts">
import MediaItemAvatar from './MediaItemAvatar.vue'
import MediaItemDescription from './MediaItemDescription.vue'
import MediaItemRatings from './MediaItemRatings.vue'
import MediaItemSubtitle from './MediaItemSubtitle.vue'
import MediaItemTitle from './MediaItemTitle.vue'
import { computed, createComponent } from '@vue/composition-api'

import MediaItemLoadingOverline from './MediaItemLoadingOverline.vue'
import { asyncComponent } from '@/router'
import { MediaItem_media } from './__generated__/MediaItem_media'

const MediaItemOverline = () =>
  asyncComponent(
    import(
      /* webpackChunkName: "MediaItemOverline" */ /* webpackPrefetch: true */ './MediaItemOverline.vue'
    ),
    MediaItemLoadingOverline,
  )

export interface Props {
  media: MediaItem_media
}

export default createComponent<Readonly<Props>>({
  components: {
    MediaItemAvatar,
    MediaItemDescription,
    MediaItemOverline,
    MediaItemRatings,
    MediaItemSubtitle,
    MediaItemTitle,
  },
  props: {
    media: {
      default: null,
      required: true,
      type: Object,
    },
  },
  setup(props) {
    const lines = computed(() => {
      return props.media.description ? 'three-line' : 'two-line'
    })

    return { lines }
  },
})
</script>
