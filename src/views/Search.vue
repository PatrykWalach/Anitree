<template>
  <ApolloQuery
    v-slot="{ result: { data: viewer } }"
    :tag="null"
    :query="require('@/apollo/queries/Viewer.gql')"
    :skip="!token"
  >
    <v-container fill-height grid-list-lg>
      <TheSearchList :user="viewer && viewer.Viewer" v-if="isSearched" />
      <ApolloQuery
        v-else
        v-slot="{ result: { error, data }, isLoading, query }"
        :query="require('@/apollo/queries/Page.gql')"
        :tag="null"
        fetch-policy="cache-and-network"
        :variables="
          Object.assign(
            {
              isAdult:
                viewer && viewer.Viewer.options.displayAdultContent
                  ? undefined
                  : false
            },
            query
          )
        "
      >
        <v-layout
          v-if="isLoading || error || !data.Page.media.length"
          justify-center
          align-center
        >
          <v-progress-circular
            v-if="isLoading"
            indeterminate
            color="primary"
          ></v-progress-circular>
          <template v-else-if="error">
            There was an error
            <!-- <v-btn @click="query.refetch()">Retry</v-btn> -->
          </template>
          <template v-else>
            No results found
          </template>
        </v-layout>
        <media-timeline v-else :media-list="data.Page.media">
          <v-pagination
            v-model="page"
            :length="data.Page.pageInfo.lastPage"
          ></v-pagination>
        </media-timeline>
      </ApolloQuery>
    </v-container>
  </ApolloQuery>
</template>
<script lang="ts">
import MediaTimeline from '../components/MediaTimeline.vue'
import TheSearchList from '../components/TheSearchList.vue'

import { createComponent, computed } from 'vue-function-api'
import useAuth from '../store/auth'

export default createComponent({
  components: {
    MediaTimeline,
    TheSearchList
  },
  setup(_, { root }) {
    const query = computed({
      get: () => root.$route.query,
      set: query =>
        root.$router.replace({
          query
        })
    })

    const isSearched = computed(() => {
      for (const prop in query.value) {
        if (query.value.hasOwnProperty(prop)) {
          return false
        }
      }
      return true
    })

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
      }
    })

    const { token } = useAuth()

    return {
      token,
      query,
      page,
      isSearched
    }
  }
})
</script>
