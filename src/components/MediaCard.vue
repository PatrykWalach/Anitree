<template>
  <ApolloQuery
    v-slot="{ result: { error, data }, isLoading, query }"
    :query="require('@/graphql/queries/Media.gql')"
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

      <!-- <v-divider class="mx-4"></v-divider> -->

      <MediaCardActions :media="data && data.Media" />
      <MediaCardStatus :media="data && data.Media" />
    </v-card>
  </ApolloQuery>
</template>
<script lang="ts">
import { Ref, computed, createComponent } from '@vue/composition-api'
import MediaCardActions from './MediaCardActions.vue'
import MediaCardBanner from './MediaCardBanner.vue'
import MediaCardStatus from './MediaCardStatus.vue'
import MediaCardTabs from './MediaCardTabs.vue'

import { Variables } from '@/graphql/schema/media'

export default createComponent<Readonly<Props>>({
  components: {
    MediaCardActions,
    MediaCardBanner,
    MediaCardStatus,
    MediaCardTabs,
  },
  props: {
    id: {
      default: 2,
      required: true,
      type: Number,
    },
  },
  setup(props) {
    const variables: Ref<Variables> = computed(() => {
      return { id: props.id }
    })

    return { variables }
  },
})
export interface Props {
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

import { MEDIA } from '@/graphql'
import { Media } from '@/graphql/schema/media'

import { createElement } from '@vue/composition-api'

export default createComponent<Readonly<Props>>({
  setup: () => {
    const h = createElement

    return (props ) => {
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

export interface Props {
  id: number
}
</script>
-->
