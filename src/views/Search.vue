<template>
  <TheBackdrop>
    <template v-slot:appBar>
      <SearchAppBar />
    </template>
    <template v-slot:backdrop>
      <SearchBackdrop :query="query" />
    </template>
    <template v-slot:default>
      <VCard
        :style="{ flex: 1, borderRadius: '4px 4px 0 0' }"
        :loading="loading && 'accent'"
      >
        <VCardTitle>
          <span v-if="total == '0'"> No results </span>
          <span v-else> See {{ total }} results </span>
        </VCardTitle>
        <VContainer>
          <KeepAlive>
            <TheGridLoading v-if="loading" />
            <the-grid
              v-else-if="page"
              :media="media"
              v-slot="{ showingEverything, increaseShowing }"
            >
              <v-col cols="12" v-if="!showingEverything || hasNextPage">
                <VBtn
                  v-intersect.quiet="() => showMore(increaseShowing)"
                  :disabled="loading"
                  :loading="loadingMore"
                  block
                  color="accent"
                  @click.stop="() => showMore(increaseShowing)"
                >
                  show more
                </VBtn>
              </v-col>
            </the-grid>
          </KeepAlive>
        </VContainer>
        <VDialog
          v-model="showFilters"
          max-width="360px"
          scrollable
          v-if="!$vuetify.breakpoint.xsOnly"
        >
          <ViewSearchFilters :query="query" @close="showFilters = false" />
        </VDialog> </VCard
    ></template>
  </TheBackdrop>
</template>
<script lang="ts">
import {
  SearchQuery as SearchQueryResult,
  SearchQueryVariables,
} from './__generated__/SearchQuery'
import { beforeRouteLeave, createBeforeRouteEnter, useFab } from '@/hooks/fab'
import { computed, createComponent, Ref, ref } from '@vue/composition-api'
import { useResult } from '@vue/apollo-composable'
import { Dictionary } from 'vue-router/types/router'
import { SearchQuery } from './Search.gql.js'

import { asyncComponent } from '@/router'
import { useRoutes } from '@/hooks/route'
import { useNumber } from '@/hooks/intl'
import { useViewer } from '@/hooks/viewer'
import { usePage } from '@/hooks/page'
import TheGridLoading from '@/components/TheGridLoading.vue'
import ViewSearchField from '@/components/ViewSearchField.vue'
import TheBackdrop from '@/components/TheBackdrop.vue'
const SearchAppBar = () =>
  import(
    /* webpackChunkName: "SearchAppBar" */ /* webpackPrefetch: true */ './SearchAppBar.vue'
  )
const SearchBackdrop = () =>
  import(
    /* webpackChunkName: "SearchBackdrop" */ /* webpackPrefetch: true */ './SearchBackdrop.vue'
  )

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

  const isAdult = useResult(
    viewerQuery.result,
    false,
    data => data?.Viewer?.options?.displayAdultContent && undefined,
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
    TheBackdrop,
    TheGridLoading,
    ViewSearchField,
    SearchBackdrop,
    SearchAppBar,
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

    const page = useResult(result, null, data => data?.Page)

    const media = useResult(result, [], data => data?.Page?.media || [])

    const fab = useFab()
    const showFilters = ref(false)

    const showMore = useShowMore(
      media,
      hasNextPage,
      computed(() => loading.value || loadingMore.value),
      loadMore,
    )

    const pageTotal = useResult(
      result,
      0,
      data => data?.Page?.pageInfo?.total || 0,
    )

    const total = useNumber(pageTotal)

    return {
      pageTotal,
      total,
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
