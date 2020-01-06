<template>
  <div>
    <v-container>
      <TheTimelineLoading v-if="loading" />

      <the-timeline
        v-else-if="media"
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
      </the-timeline>
    </v-container>
    <v-dialog v-model="showFilters" max-width="360px" scrollable>
      <ViewSearchFilters :query="query" @close="showFilters = false" />
    </v-dialog>
  </div>
</template>
<script lang="ts">
import {
  ApolloQueryResult,
  FetchMoreOptions,
  FetchMoreQueryOptions,
} from 'apollo-client'

import {
  TimelinePrefetchQuery as TimelinePrefetchQueryResult,
  TimelinePrefetchQueryVariables,
  TimelinePrefetchQuery_Page_media,
  TimelinePrefetchQuery_Page_media_relations_edges,
} from './__generated__/TimelinePrefetchQuery'
import {
  TimelineQuery as TimelineQueryResult,
  TimelineQueryVariables,
  TimelineQuery_Page_media,
} from './__generated__/TimelineQuery'
import { beforeRouteLeave, createBeforeRouteEnter } from '../hooks/fab'

import {
  computed,
  SetupContext,
  createComponent,
  ref,
  watch,
} from '@vue/composition-api'
import { useQuery, useQueryLoading, useResult } from '@vue/apollo-composable'
import { TimelinePrefetchQuery, TimelineQuery } from './Timeline.gql.js'
import { RecursiveNonNullable } from '../types'
import TheTimelineLoading from '@/components/TheTimelineLoading.vue'
import { asyncComponent } from '@/router'
import { usePage, updatePageQuery } from '@/hooks/page'
import { useFab } from '@/hooks/fab'
import { useRoutes } from '@/hooks/route'
import { MediaSort } from '__generated__/globalTypes'
import { useShowMore } from './Search.vue'

const ViewSearchFilters = () =>
  import(
    /* webpackChunkName: "ViewSearchFilters" */ /* webpackPrefetch: true */ '@/components/ViewSearchFilters.vue'
  )
const TheTimeline = () =>
  asyncComponent(
    import(
      /* webpackChunkName: "TheTimeline" */ /* webpackPrefetch: true */ '@/components/TheTimeline.vue'
    ),
    TheTimelineLoading,
  )

export type FetchMore<Data, Variables> = <K extends keyof Variables>(
  options: FetchMoreQueryOptions<Variables, K> &
    FetchMoreOptions<Data, Variables>,
) => Promise<ApolloQueryResult<Data>>

const find = <R, D>(
  mapFn: (el: D, i: number, arr: readonly D[]) => R,
  data: readonly D[],
) => filterNull(data.map(mapFn) as readonly R[])

function filterNull<D>(data: readonly D[]) {
  return data.filter(data => data !== null) as NonNullable<D>[]
}

const findRelativeMedia = (
  someMedia: readonly (TimelinePrefetchQuery_Page_media | null)[],
) => {
  const filteredMedia = filterNull(someMedia)
  const relations = find(({ relations }) => relations, filteredMedia)

  const edges: TimelinePrefetchQuery_Page_media_relations_edges[] = find(
    ({ edges }) => edges,
    relations,
  ).flat()
  const nodes = find(({ node }) => node, edges)
  const ids = new Set(nodes.map(({ id }) => id))

  return filteredMedia.reduce((acc, { id }) => {
    acc.delete(id)
    return acc
  }, ids)
}

const usePrefetchMedia = (
  props: Readonly<Props>,
  root: SetupContext['root'],
) => {
  const variables = computed(() => ({
    idIn: [props.currentId],
  }))

  const { routeTimeline } = useRoutes(root)

  const prefetchQuery = useQuery<
    TimelinePrefetchQueryResult,
    TimelinePrefetchQueryVariables
  >(TimelinePrefetchQuery, variables, () => ({
    enabled: routeTimeline.value,
    notifyOnNetworkStatusChange: true,
  }))

  const prefetchedMedia = useResult<
    readonly TimelinePrefetchQuery_Page_media[],
    readonly TimelinePrefetchQuery_Page_media[]
  >(
    prefetchQuery.result,
    [],
    (data: RecursiveNonNullable<TimelinePrefetchQueryResult>) =>
      data.Page.media,
  )

  watch(prefetchQuery.result, async data => {
    if (data && data.Page) {
      const media = data.Page.media
      if (media) {
        const ids = findRelativeMedia(media)

        if (ids.size) {
          await prefetchQuery.fetchMore({
            updateQuery: updatePageQuery,
            variables: { idIn: [...ids] },
          })
        }
      }
    }
  })

  return prefetchedMedia
}

interface Props {
  currentId: number
  query: TimelineQueryVariables
  queryWithBoolean: TimelineQueryVariables
}

export default createComponent({
  beforeRouteEnter: createBeforeRouteEnter(vm => ({
    icon: 'sort',
    on: () => {
      vm.showFilters = true
    },
    title: 'sort',
  })),
  beforeRouteLeave,
  components: {
    ViewSearchFilters,
    TheTimeline,
    TheTimelineLoading,
  },
  props: {
    currentId: { default: null, required: true, type: Number },
    query: { default: null, required: true, type: Object },
    queryWithBoolean: { default: null, required: true, type: Object },
  },

  setup(props, { root }) {
    const prefetchedMedia = usePrefetchMedia(props, root)

    const { routeTimeline } = useRoutes(root)

    const order = ref(1)

    const queryVariables = computed(() => ({
      sort: ['START_DATE'] as MediaSort[],
      ...props.queryWithBoolean,
      idIn: prefetchedMedia.value.map(({ id }) => id),
    }))

    const { result: queryResult, loadMore, loadingMore, hasNextPage } = usePage<
      TimelineQueryResult,
      TimelineQueryVariables
    >(TimelineQuery, queryVariables, () => ({
      enabled: routeTimeline.value,
    }))

    const media = useResult<
      readonly TimelineQuery_Page_media[],
      readonly TimelineQuery_Page_media[]
    >(
      queryResult,
      [],
      (data: RecursiveNonNullable<TimelineQueryResult>) => data.Page.media,
    )

    const fab = useFab()

    const loading = useQueryLoading()

    const showMore = useShowMore(
      media,
      hasNextPage,
      computed(() => loading.value || loadingMore.value),
      loadMore,
    )

    return {
      loadMore,
      loadingMore,
      hasNextPage,
      showMore,
      loading,
      media,
      order,
      showFilters: ref(false),
      fab,
    }
  },
})
</script>
