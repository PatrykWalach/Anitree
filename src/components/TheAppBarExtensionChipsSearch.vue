<template>
  <ApolloQuery
    v-slot="{ result: { data }, isLoading }"
    :query="require('@/graphql/queries/Page.gql')"
    :tag="null"
    :skip="!$route.query.search"
    :variables="{ search: $route.query.search }"
  >
    <TheAppBarExtensionChipsSearchReady
      v-if="!isLoading"
      :page="data && data.Page"
    />
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
  </ApolloQuery>
</template>
<script lang="ts">
import TheAppBarExtensionChipsSearchReady from './TheAppBarExtensionChipsSearchReady.vue'
import { createComponent } from '@vue/composition-api'

export default createComponent({
  components: {
    TheAppBarExtensionChipsSearchReady,
  },
})
</script>
