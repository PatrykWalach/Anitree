<template>
  <ApolloQuery
    v-slot="{ result: { error, data }, isLoading, query }"
    :query="require('@/apollo/queries/Media.gql')"
    :variables="variables"
    :tag="null"
  >
    <v-banner v-if="error" icon="warning" two-line :tile="false">
      There was an error while loading the data. Please make sure your have a
      stable internet connection and try again.

      <template v-slot:actions>
        <v-btn color="error" text @click="query.refetch()">Retry</v-btn>
      </template>
    </v-banner>

    <v-card v-else>
      <MediaCardBanner :media="data && data.Media" />
      <MediaCardTabs :media="data && data.Media" />
      <v-divider class="mx-4"></v-divider>
      <MediaCardActions :media="data && data.Media" />
      <MediaCardStatus :media="data && data.Media" />
    </v-card>
  </ApolloQuery>
</template>
<script lang="ts">
import MediaCardBanner from './MediaCardBanner.vue'
import MediaCardStatus from './MediaCardStatus.vue'
import MediaCardTabs from './MediaCardTabs.vue'
import MediaCardActions from './MediaCardActions.vue'

import { Variables } from '@/apollo/schema/media'

import { createComponent, Wrapper, computed } from 'vue-function-api'

export default createComponent({
  setup(props) {
    const variables: Wrapper<Variables> = computed(() => {
      return { id: props.id }
    })

    return { variables }
  },
  components: {
    MediaCardBanner,
    MediaCardTabs,
    MediaCardStatus,
    MediaCardActions
  },
  props: ({
    id: {
      type: Number,
      required: true
    }
  } as unknown) as Readonly<Props>
})
interface Props {
  id: number
}
</script>
