<template>
  <v-list-item selectable :[lines]="true">
    <v-list-item-content>
      <MediaCardItemOverline :media="media" v-if="media.studios.nodes.length" />
      <MediaCardItemTitle :media="media" />
      <MediaCardItemRatings :media="media" />
      <MediaCardItemSubtitle :media="media" />
      <MediaCardItemDescription :media="media" />
    </v-list-item-content>
    <MediaCardItemAvatar :media="media" />
  </v-list-item>
</template>

<script lang="ts">
import MediaCardItemAvatar from './MediaCardItemAvatar.vue'
import MediaCardItemDescription from './MediaCardItemDescription.vue'
import MediaCardItemRatings from './MediaCardItemRatings.vue'
import MediaCardItemSubtitle from './MediaCardItemSubtitle.vue'
import MediaCardItemTitle from './MediaCardItemTitle.vue'
import { computed, createComponent } from '@vue/composition-api'

import MediaCardLoadingItemOverline from './MediaCardLoadingItemOverline.vue'
import { asyncComponent } from '@/router'
import { MediaCardItem_media } from './__generated__/MediaCardItem_media'

const MediaCardItemOverline = () =>
  asyncComponent(
    import(
      /* webpackChunkName: "MediaCardItemOverline" */ './MediaCardItemOverline.vue'
    ),
    MediaCardLoadingItemOverline,
  )

export interface Props {
  media: MediaCardItem_media
}

export default createComponent<Readonly<Props>>({
  components: {
    MediaCardItemAvatar,
    MediaCardItemDescription,
    MediaCardItemOverline,
    MediaCardItemRatings,
    MediaCardItemSubtitle,
    MediaCardItemTitle,
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
