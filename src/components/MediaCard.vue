<template>
  <BaseQuery
    :apollo="{
      Media: {
        ...Media,
        tag: null,
      },
    }"
    v-slot="{ Media, errors, queries }"
  >
    <v-banner v-if="errors.Media" icon="warning" two-line :tile="false">
      There was an error while loading the data. Please make sure your have a
      stable internet connection and try again.
      <template v-slot:actions>
        <v-btn color="error" text @click="queries.Media.refetch()">Retry</v-btn>
      </template>
    </v-banner>
    <v-card :style="{ overflow: 'hidden' }" v-else>
      <MediaCardBanner :media="Media" />
      <MediaCardItem :media="Media" />
      <v-divider class="mx-4"></v-divider>
      <MediaCardActions :media="Media" />
      <MediaCardStatus :media="Media" />
    </v-card>
  </BaseQuery>
</template>
<script lang="ts">
import BaseQuery from './BaseQuery.vue'
import MediaCardActions from './MediaCardActions.vue'
import MediaCardBanner from './MediaCardBanner.vue'
import MediaCardItem from './MediaCardItem.vue'
import MediaCardStatus from './MediaCardStatus.vue'
import { createComponent } from '@vue/composition-api'
import { useMedia } from '@/graphql'

export default createComponent<Readonly<Props>>({
  components: {
    BaseQuery,
    MediaCardActions,
    MediaCardBanner,
    MediaCardItem,
    MediaCardStatus,
  },
  props: {
    id: {
      default: 0,
      required: false,
      type: Number,
    },
  },
  setup(props) {
    return useMedia(() => ({ id: props.id }))
  },
})

export interface Props {
  id: number
}
</script>
