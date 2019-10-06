<template>
  <ApolloQuery
    v-slot="{ result: { data: viewer } }"
    :tag="null"
    :query="require('@/graphql/queries/Viewer.gql')"
    :skip="!token"
  >
    <TheSearchList v-if="!isSearched" :user="viewer && viewer.Viewer" />
    <ApolloQuery
      v-else
      v-slot="{ result: { error, data }, isLoading, query }"
      :query="require('@/graphql/queries/Page.gql')"
      :tag="null"
      fetch-policy="cache-and-network"
      :variables="{
        isAdult:
          viewer && viewer.Viewer.options.displayAdultContent
            ? undefined
            : false,
        ...query,
      }"
    >
      <v-container>
        <v-row
          justify="center"
          align="center"
          v-if="error || (data && !data.Page.media.length)"
        >
          <template v-if="data && !data.Page.media.length">
            No results found
          </template>
          <template v-else>
            There was an error
          </template>
        </v-row>
        <the-media-timeline
          v-else
          :loading="!!isLoading"
          :media-list="data && data.Page.media"
        >
          <v-pagination
            v-model="page"
            :length="(data && data.Page.pageInfo.lastPage) || 0"
          ></v-pagination>
        </the-media-timeline>
      </v-container>
    </ApolloQuery>
  </ApolloQuery>
</template>
<script lang="ts">
import { computed, createComponent } from '@vue/composition-api'
import TheMediaTimeline from '../components/TheMediaTimeline.vue'
import TheSearchList from '../components/TheSearchList.vue'

import { settings } from '@/store/settings'

export default createComponent({
  components: {
    TheMediaTimeline,
    TheSearchList,
  },
  setup(_, { root }) {
    const query = computed({
      get: () =>
        Object.fromEntries(
          Object.entries(root.$route.query).map(([key, value]) => {
            switch (value) {
              case 'true':
                return [key, true]
              case 'false':
                return [key, false]
              default:
                return [key, value]
            }
          }),
        ),
      set: query =>
        root.$router.replace({
          query,
        }),
    })

    const isSearched = computed(() => !!Object.values(query.value).length)

    const page = computed({
      get: () => {
        const page = query.value.page
        switch (typeof page) {
          case 'string':
            return parseInt(page)
          case 'number':
            return page
          default:
            return 1
        }
      },

      set: page => {
        query.value = Object.assign({}, query.value, { page })
      },
    })

    const {
      state: { token },
    } = settings

    return {
      isSearched,
      page,
      query,
      token,
    }
  },
})
</script>
