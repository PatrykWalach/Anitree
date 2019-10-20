<template>
  <BaseQuery
    :apollo="{
      Viewer,
      Page: ({ Viewer }) => ({
        query: require('@/graphql/queries/Page.gql'),
        tag: null,
        'fetch-policy': 'cache-and-network',
        variables: {
          isAdult:
            Viewer && Viewer.options.displayAdultContent ? undefined : false,
          ...query,
        },
      }),
    }"
    v-slot="{ Viewer, Page, isLoading, errors }"
  >
    <TheSearchList v-if="!isSearched" :user="Viewer" />

    <v-container v-else>
      <v-row
        justify="center"
        align="center"
        v-if="errors.Page || (Page && !Page.media.length)"
      >
        <template v-if="Page && !Page.media.length">
          No results found
        </template>
        <template v-else>
          There was an error
        </template>
      </v-row>
      <the-media-timeline
        v-else
        :loading="!!isLoading.Page"
        :media-list="Page && Page.media"
      >
        <v-pagination
          v-model="page"
          :length="(Page && Page.pageInfo.lastPage) || 0"
        ></v-pagination>
      </the-media-timeline>
    </v-container>
  </BaseQuery>
</template>
<script lang="ts">
import { computed, createComponent } from '@vue/composition-api'
import BaseQuery from '@/components/BaseQuery.vue'
import TheMediaTimeline from '@/components/TheMediaTimeline.vue'
import TheSearchList from '@/components/TheSearchList.vue'
import { useViewer } from '@/graphql'

export default createComponent({
  components: {
    BaseQuery,
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
        query.value = {
          ...query.value,
          page,
        }
      },
    })

    return {
      isSearched,
      page,
      query,
      ...useViewer(root),
    }
  },
})
</script>
