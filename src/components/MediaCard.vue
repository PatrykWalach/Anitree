<template>
  <v-card>
    <MediaCardBanner v-if="media.bannerImage" :media="media" />
    <MediaItem :media="media" />
    <v-divider class="mx-4" />

    <MediaCardActions :media="media" />

    <MediaCardStatus :media="media" />
  </v-card>
</template>
<script lang="ts">
import MediaCardActions from './MediaCardActions.vue'

import MediaItem from './MediaItem.vue'
import MediaCardLoadingBanner from './MediaCardLoadingBanner.vue'
import MediaCardStatus from './MediaCardStatus.vue'
import { MediaCard_media } from './__generated__/MediaCard_media'
import { asyncComponent } from '@/router'
import { createComponent } from '@vue/composition-api'

const MediaCardBanner = () =>
  asyncComponent(
    import(
      /* webpackChunkName: "MediaCardBanner" */ /* webpackPrefetch: true */ './MediaCardBanner.vue'
    ),
    MediaCardLoadingBanner,
  )

export interface Props {
  media: MediaCard_media
}

export default createComponent<Readonly<Props>>({
  components: {
    MediaCardActions,
    MediaCardBanner,
    MediaItem,
    MediaCardStatus,
  },
  props: {
    media: {
      default: null,
      required: true,
      type: Object,
    },
  },
})
</script>
