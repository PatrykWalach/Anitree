<template>
  <keep-alive>
    <TheSearchNavigation v-if="!isSearched" :user="viewer" />
    <v-container v-else>
      <keep-alive>
        <TheMediaTimelineLoading v-if="loading" />
        <template v-else-if="page">
          <v-row justify="center" align="center" v-if="!media.length">
            No results found
          </v-row>
          <TheMediaTimeline v-else :media-list="media" />
        </template>
      </keep-alive>
      <v-btn
        v-if="hasNextPage"
        @click="loadMore"
        :disabled="loading || loadingMore"
        block
        color="accent"
        >show more</v-btn
      >
    </v-container>
  </keep-alive>
</template>
<script lang="ts">
import {
  AsyncComponentFactory,
  AsyncComponentPromise,
  Component,
  EsModuleComponent,
} from 'vue/types/options'
import { PAGE, useViewer } from '@/graphql'
import { Page, Variables } from '@/graphql/schema/page'
import { computed, createComponent, ref } from '@vue/composition-api'
import { useQuery, useQueryLoading, useResult } from '@vue/apollo-composable'
import TheMediaTimelineLoading from '@/components/TheMediaTimelineLoading.vue'
import TheSearchNavigation from '@/components/TheSearchNavigation.vue'
import { usePagination } from './MediaTimeline.vue'
import { useRoutes } from '@/components/TheAppBar.vue'

export const asyncComponent = (
  component: Promise<any>,
  loading?: Component | EsModuleComponent,
): ReturnType<AsyncComponentFactory> => ({
  component: (component as unknown) as AsyncComponentPromise,
  delay: 0,
  loading,
})

const TheMediaTimeline = () =>
  asyncComponent(
    import(
      /* webpackChunkName: "TheMediaTimeline" */ '@/components/TheMediaTimeline.vue'
    ),
    TheMediaTimelineLoading,
  )

export default createComponent({
  components: {
    TheMediaTimeline,
    TheMediaTimelineLoading,
    TheSearchNavigation,
  },
  setup(_, { root }) {
    const query = computed(() =>
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
    )

    const isSearched = computed(() => !!Object.values(query.value).length)

    const { Viewer: viewer, result: viewerResult } = useViewer()

    const isAdult = useResult(
      viewerResult,
      false,
      data => data.Viewer.options.displayAdultContent && undefined,
    )

    const { routeSearch } = useRoutes(root)

    const variables = computed(() => ({
      isAdult: isAdult.value,
      perPage: 10,
      ...query.value,
    }))

    const { result, fetchMore } = useQuery<{ Page: Page }, Variables>(
      PAGE,
      variables,
      () => ({
        enabled: routeSearch.value,
        // fetchPolicy: 'cache-and-network',
        notifyOnNetworkStatusChange: false,
      }),
    )

    const { loadNextPage } = usePagination()

    const page = useResult(result, null, data => data.Page)
    const media = useResult(result, null, data => data.Page.media)

    const currentPage = useResult(
      result,
      0,
      data => data.Page.pageInfo.currentPage,
    )

    const hasNextPage = useResult(
      result,
      null,
      data => data.Page.pageInfo.hasNextPage,
    )

    const loading = useQueryLoading()

    const loadingMore = ref(false)

    const loadMore = async () => {
      loadingMore.value = true
      await loadNextPage(fetchMore, {
        ...variables,
        page: 1 + currentPage.value,
      })
      loadingMore.value = false
    }

    return {
      hasNextPage,
      isSearched,
      loadMore,
      loading,
      loadingMore,
      media,
      page,
      viewer,
    }
  },
})
</script>
