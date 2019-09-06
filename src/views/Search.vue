<template>
  <ApolloQuery
    v-slot="{ result: { data: viewer } }"
    :tag="null"
    :query="require('@/graphql/queries/Viewer.gql')"
    :skip="!token"
  >
    <TheSearchList :user="viewer && viewer.Viewer" v-if="!isSearched" />
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
        ...query
      }"
    >
      <v-container :fill-height="isLoading">
        <v-row
          v-if="isLoading || error || !data.Page.media.length"
          justify="center"
          align="center"
        >
          <v-progress-circular
            v-if="isLoading"
            indeterminate
            color="primary"
          ></v-progress-circular>
          <template v-else-if="error">
            There was an error
          </template>
          <template v-else>
            No results found
          </template>
        </v-row>
        <template v-else>
          <v-subheader>
            <span v-if="$route.query.search">
              Search resuts for:
              {{ $route.query.search }}
            </span>
            <v-spacer></v-spacer>
            <!-- <v-select
              hide-details
              solo
              single-line
              label="Sort"
              :items="['one', 'two']"
            >
              <template v-slot:append>
                <v-icon>sort</v-icon>
              </template>
            </v-select> -->
          </v-subheader>

          <media-timeline :media-list="data.Page.media">
            <v-pagination
              v-model="page"
              :length="data.Page.pageInfo.lastPage"
            ></v-pagination>
          </media-timeline>
        </template>
      </v-container>
    </ApolloQuery>
  </ApolloQuery>
</template>
<script lang="ts">
import MediaTimeline from '../components/MediaTimeline.vue'
import TheSearchList from '../components/TheSearchList.vue'

import { computed, createComponent } from '@vue/composition-api'
import useSettings from '../store/settings'

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
      }
    })

    const { token } = useSettings()

    return {
      token,
      query,
      page,
      isSearched
    }
  }
})
</script>
