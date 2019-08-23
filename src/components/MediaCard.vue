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

import { createComponent, Ref, computed } from 'vue-function-api'

export default createComponent({
  setup(props: Readonly<Props>) {
    const variables: Ref<Variables> = computed(() => {
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
  props: {
    id: {
      type: Number,
      required: true
    }
  }
})
interface Props {
  id: number
}
</script>

<!--
<script lang="tsx">
import MediaCardBanner from './MediaCardBanner.vue'
import MediaCardStatus from './MediaCardStatus.vue'
import MediaCardTabs from './MediaCardTabs.vue'
import MediaCardActions from './MediaCardActions.vue'
import { VDivider, VBtn, VBanner, VCard } from 'vuetify/lib'

import { MEDIA } from '@/apollo'
import { Media } from '@/apollo/schema/media'

import { createElement } from 'vue-function-api'

export default createComponent({
  setup: () => {
    const h = createElement

    return (props: Readonly<Props>) => {
      const card = (media: Media | null) => (
        <VCard>
          <MediaCardBanner media={media} />
          <MediaCardTabs media={media} />
          <VDivider class="mx-4"></VDivider>
          <MediaCardActions media={media} />
          <MediaCardStatus media={media} />
        </VCard>
      )

      const banner = query => (
        <VBanner
          icon="warning"
          two-line
          tile={false}
          scopedSlots={{
            actions: () => (
              <VBtn color="error" text onClick={query.refetch()}>
                Retry
              </VBtn>
            )
          }}
        >
          There was an error while loading the data. Please make sure your have
          a stable internet connection and try again.
        </VBanner>
      )

      return (
        <ApolloQuery
          scopedSlots={{
            default: ({ result: { error, data }, query }) =>
              error ? banner(query) : card(data && data.Media)
          }}
          query={MEDIA}
          variables={{ id: props.id }}
          tag={null}
        ></ApolloQuery>
      )
    }
  },
  props: {
    id: {
      type: Number,
      required: true
    }
  } 
})

interface Props {
  id: number
}
</script>
-->
