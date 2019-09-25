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
      <v-container :fill-height="isLoading">
        <v-row
          v-if="isLoading || error || !data || !data.Page.media.length"
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
          <v-subheader v-if="$route.query.search || subheaders.length">
            <template v-if="subheaders.length">

            <span  v-for="subheader in subheaders" :key="subheader.title" class="mr-4" >
              <v-icon>{{ subheader.icon }}</v-icon>
              {{ subheader.title }}
            </span>

            </template>
            <span v-else>
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
import { computed, createComponent } from '@vue/composition-api'
import MediaTimeline from '../components/MediaTimeline.vue'
import TheSearchList from '../components/TheSearchList.vue'

import { isEqual } from 'apollo-utilities'
import { navigation } from '@/store/navigation'
import { settings } from '@/store/settings'

export default createComponent({
  components: {
    MediaTimeline,
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

    const {
      state: { search },
    } = navigation

    const subheaders = computed(() => {
      const { page, sort, ..._query } = query.value
      return search.value.filter(
        ({ to }) => {

          for(const [key, value] of Object.entries(to.query)){
if(root.$route.query[key] !== value)
return false

          }
          return true
          // isEqual(, _query)
          }
        )
      // return find
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
      },
    })

    const {
      state: { token },
    } = settings

    return {
      isSearched,
      page,
      query,
      subheaders,
      token,
    }
  },
})
</script>
