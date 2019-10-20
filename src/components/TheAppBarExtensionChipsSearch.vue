<template>
  <BaseQuery
    :apollo="{
      Viewer,
      Page: ({ Viewer }) => ({
        skip: !$route.query.search,
        query: require('@/graphql/queries/Page.gql'),
        tag: null,
        variables: {
          isAdult:
            Viewer && Viewer.options.displayAdultContent ? undefined : false,
          search: $route.query.search,
        },
      }),
    }"
    v-slot="{ Page, isLoading }"
  >
    <TheAppBarExtensionChipsSearchReady v-if="!isLoading.Page" :page="Page" />
    <v-chip-group
      v-else
      :style="{
        'max-width': '100%',
      }"
    >
      <v-skeleton-loader
        class="my-1 mr-2"
        v-for="i in 12"
        :key="i"
        type="chip"
      />
    </v-chip-group>
  </BaseQuery>
</template>
<script lang="ts">
import BaseQuery from './BaseQuery.vue'
import TheAppBarExtensionChipsSearchReady from './TheAppBarExtensionChipsSearchReady.vue'
import { createComponent } from '@vue/composition-api'
import { useViewer } from '@/graphql'

export default createComponent({
  components: {
    BaseQuery,
    TheAppBarExtensionChipsSearchReady,
  },
  setup(_, { root }) {
    return useViewer(root)
  },
})
</script>
