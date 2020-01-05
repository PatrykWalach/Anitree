<template>
  <div>
    <v-container>
      <v-row justify="center" dense>
        <v-col cols="12" md="6">
          <ViewSearchField :query="query" />
        </v-col>
      </v-row>
    </v-container>

    <v-container>
      <keep-alive>
        <TheTimelineLoading v-if="loading" />
        <template v-else-if="page">
          <v-row justify="center" align="center" v-if="!media.length">
            No results found
          </v-row>
          <the-timeline v-else :media-list="media">
            <v-col v-if="hasNextPage">
              <v-btn
                @click.stop="loadMore"
                :disabled="loading"
                :loading="loadingMore"
                block
                color="accent"
                >show more</v-btn
              >
            </v-col>
          </the-timeline>
        </template>
      </keep-alive>
    </v-container>
    <v-dialog v-model="showFilters" max-width="360px" scrollable>
      <ViewSearchFilters :query="query" @close="showFilters = false" />
    </v-dialog>
  </div>
</template>
<script lang="ts">
import {
  SearchQuery as SearchQueryResult,
  SearchQueryVariables,
  SearchQuery_Page,
  SearchQuery_Page_media,
} from './__generated__/SearchQuery'
import { beforeRouteLeave, createBeforeRouteEnter, useFab } from '@/hooks/fab'
import { computed, createComponent, ref } from '@vue/composition-api'
import { useResult } from '@vue/apollo-composable'
import { Dictionary } from 'vue-router/types/router'
import { SearchQuery } from './Search.js'
import { RecursiveNonNullable } from '../types'
import TheTimelineLoading from '@/components/TheTimelineLoading.vue'
import ViewSearchField from '@/components/ViewSearchField.vue'
import { asyncComponent } from '@/router'
import { useRoutes } from '@/hooks/route'
import { useViewer } from '@/hooks/viewer'
import { usePage } from '@/hooks/page'

const TheTimeline = () =>
  asyncComponent(
    import(
      /* webpackChunkName: "TheTimeline" */ '@/components/TheTimeline.vue'
    ),
    TheTimelineLoading,
  )

const ViewSearchFilters = () =>
  import(
    /* webpackChunkName: "ViewSearchFilters" */ '@/components/ViewSearchFilters.vue'
  )

export interface Props {
  queryWithBoolean: Partial<SearchQueryVariables>
  query: Dictionary<string | (string | null)[]>
}

const useVariables = (props: Readonly<Props>) => {
  const viewerQuery = useViewer()

  const isAdult = useResult<false | undefined, false>(
    viewerQuery.result,
    false,
    data => data.Viewer.options.displayAdultContent && undefined,
  )

  const variables = computed(() => ({
    isAdult: isAdult.value,
    perPage: 10,
    ...props.queryWithBoolean,
  }))

  return {
    variables,
  }
}

export default createComponent({
  beforeRouteEnter: createBeforeRouteEnter(vm => ({
    icon: 'tune',
    on: () => {
      vm.showFilters = true
    },
    title: 'Filter',
  })),
  beforeRouteLeave,
  components: {
    TheTimeline,
    TheTimelineLoading,
    ViewSearchField,
    ViewSearchFilters,
  },
  props: {
    query: { default: null, required: true, type: Object },
    queryWithBoolean: { default: null, required: true, type: Object },
  },
  setup(props, { root }) {
    const { variables } = useVariables(props)

    const isSearched = computed(
      () => !!Object.values(props.queryWithBoolean).length,
    )

    // const loadingMore = ref(false)

    const { routeSearch } = useRoutes(root)

    // const { result, fetchMore, onError } = useQuery<
    //   SearchQueryResult,
    //   SearchQueryVariables
    // >(SearchQuery, variables, () => ({
    //   enabled: routeSearch.value,
    //   notifyOnNetworkStatusChange: false,
    // }))

    const { result, loadMore, loadingMore, loading, hasNextPage } = usePage<
      SearchQueryResult,
      SearchQueryVariables
    >(SearchQuery, variables, () => ({
      enabled: routeSearch.value,
      notifyOnNetworkStatusChange: false,
    }))

    // onError((...e) => console.log(e))

    // const currentPage = useResult<number, number>(
    //   result,
    //   0,
    //   (data: RecursiveNonNullable<SearchQueryResult>) =>
    //     data.Page.pageInfo.currentPage,
    // )

    // const hasNextPage = useResult<boolean, boolean>(
    //   result,
    //   true,
    //   (data: RecursiveNonNullable<SearchQueryResult>) =>
    //     data.Page.pageInfo.hasNextPage,
    // )

    // const loading = useQueryLoading()

    // const loadMore = async () => {
    //   loadingMore.value = true
    //   await fetchMore({
    //     updateQuery: updatePageQuery,
    //     variables: {
    //       ...variables,
    //       page: 1 + currentPage.value,
    //     },
    //   })
    //   loadingMore.value = false
    // }

    const page = useResult<SearchQuery_Page, null>(
      result,
      null,
      (data: RecursiveNonNullable<SearchQueryResult>) => data.Page,
    )

    const media = useResult<
      readonly SearchQuery_Page_media[],
      readonly SearchQuery_Page_media[]
    >(
      result,
      [],
      (data: RecursiveNonNullable<SearchQueryResult>) => data.Page.media,
    )

    const fab = useFab()
    const showFilters = ref(false)

    return {
      fab,
      hasNextPage,
      isSearched,
      loadMore,
      loading,
      loadingMore,
      media,
      page,
      showFilters,
    }
  },
})
</script>
