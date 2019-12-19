<template>
  <v-card>
    <MediaCardBanner v-if="media.bannerImage" :media="media" />
    <MediaCardItem :media="media" />
    <v-divider class="mx-4"></v-divider>
    <MediaCardActions :media="media" />
    <MediaCardStatus :media="media" />
  </v-card>
</template>
<script lang="ts">
import { Media } from '../graphql/schema/media'
import MediaCardActions from './MediaCardActions.vue'
import MediaCardItem from './MediaCardItem.vue'
import MediaCardLoadingBanner from './MediaCardLoadingBanner.vue'
import MediaCardStatus from './MediaCardStatus.vue'
import { asyncComponent } from '../views/Search.vue'
import { createComponent } from '@vue/composition-api'

const MediaCardBanner = () =>
  asyncComponent(
    import(/* webpackChunkName: "MediaCardBanner" */ './MediaCardBanner.vue'),
    MediaCardLoadingBanner,
  )

export default createComponent<Readonly<Props>>({
  components: {
    MediaCardActions,
    MediaCardBanner,
    MediaCardItem,
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

export interface Props {
  media: Media
}
</script>
