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
        <TheGridLoading v-if="loading" />
        <template v-else-if="page">
          <v-row justify="center" align="center" v-if="!media.length">
            No results found
          </v-row>
          <the-grid
            v-else
            :media="media"
            v-slot="{ showingEverything, increaseShowing }"
          >
            <v-col cols="12" v-if="!showingEverything || hasNextPage">
              <v-btn
                v-intersect.quiet="() => showMore(increaseShowing)"
                :disabled="loading"
                :loading="loadingMore"
                block
                color="accent"
                @click.stop="() => showMore(increaseShowing)"
              >
                show more
              </v-btn>
            </v-col>
          </the-grid>
        </template>
      </keep-alive>
    </v-container>
    <v-dialog
      v-model="showFilters"
      max-width="360px"
      scrollable
      :fullscreen="$vuetify.breakpoint.xsOnly"
    >
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
import { computed, createComponent, Ref, ref } from '@vue/composition-api'
import { useResult } from '@vue/apollo-composable'
import { Dictionary } from 'vue-router/types/router'
import { SearchQuery } from './Search.gql.js'
import { RecursiveNonNullable } from '../types'
import { asyncComponent } from '@/router'
import { useRoutes } from '@/hooks/route'
import { useViewer } from '@/hooks/viewer'
import { usePage } from '@/hooks/page'
import TheGridLoading from '@/components/TheGridLoading.vue'
import ViewSearchField from '@/components/ViewSearchField.vue'

const TheGrid = () =>
  asyncComponent(
    import(
      /* webpackChunkName: "TheGrid" */ /* webpackPrefetch: true */ '@/components/TheGrid.vue'
    ),
    TheGridLoading,
  )

const ViewSearchFilters = () =>
  import(
    /* webpackChunkName: "ViewSearchFilters" */ /* webpackPrefetch: true */ '@/components/ViewSearchFilters.vue'
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
    ...props.queryWithBoolean,
  }))

  return {
    variables,
  }
}

export const useShowMore = (
  media: Ref<readonly any[]>,
  hasNextPage: Ref<boolean>,
  loading: Ref<boolean>,
  loadMore: () => Promise<void>,
) => {
  const showMore = async (
    dispatch: (
      callback: (dispatch: () => void, value: Ref<number>) => any,
    ) => void,
  ) => {
    if (!loading.value) {
      dispatch(async (dispatch, show) => {
        dispatch()

        if (show.value > media.value.length && hasNextPage.value) {
          await loadMore()
        }
      })
    }
  }

  return showMore
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
    TheGrid,
    TheGridLoading,
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

    const { routeSearch } = useRoutes(root)

    const { result, loadMore, loadingMore, loading, hasNextPage } = usePage<
      SearchQueryResult,
      SearchQueryVariables
    >(SearchQuery, variables, () => ({
      enabled: routeSearch.value,
      notifyOnNetworkStatusChange: false,
    }))

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

    const showMore = useShowMore(
      media,
      hasNextPage,
      computed(() => loading.value || loadingMore.value),
      loadMore,
    )

    return {
      fab,
      showMore,
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
