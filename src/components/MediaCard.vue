<template>
  <v-card>
    <MediaCardBanner :media="media" />
    <MediaCardItem :media="media" />
    <v-divider class="mx-4"></v-divider>
    <MediaCardActions :media="media" />
    <MediaCardStatus :media="media" />
  </v-card>
</template>
<script lang="ts">
import { Media } from '../graphql/schema/media'
import MediaCardActions from './MediaCardActions.vue'
import MediaCardBanner from './MediaCardBanner.vue'
import MediaCardItem from './MediaCardItem.vue'
import MediaCardStatus from './MediaCardStatus.vue'
import { createComponent } from '@vue/composition-api'

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
