<template>
  <TheBackdrop>
    <template v-slot:appBar>
      <TimelineAppBar v-if="currentMedia" :media="currentMedia" />
    </template>
    <template v-slot:backdrop>
      <TimelineBackdrop :query="query" />
    </template>
    <template v-slot:default>
      <VCard
        :loading="loading && 'accent'"
        :style="{ flex: 1, borderRadius: '4px 4px 0 0' }"
      >
        <VSkeletonLoader v-if="!currentMedia" type="card-heading" />
        <RenderlessTitle v-else :media="currentMedia" v-slot="{ title }">
          <VCardTitle v-text="title" />
        </RenderlessTitle>
        <VSkeletonLoader v-if="!currentMedia" type="card-heading" />
        <RenderlessSubtitle v-else :media="currentMedia" v-slot="{ subtitle }">
          <VCardSubtitle v-text="subtitle" />
        </RenderlessSubtitle>

        <VContainer>
          <TheTimelineLoading v-if="loading" />

          <the-timeline
            v-else-if="media"
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
          </the-timeline>
        </VContainer>
        <VDialog
          v-if="!$vuetify.breakpoint.xsOnly"
          v-model="showFilters"
          max-width="360px"
          scrollable
        >
          <ViewSearchFilters :query="query" @close="showFilters = false" />
        </VDialog>
      </VCard>
    </template>
  </TheBackdrop>
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
} from './__generated__/TimelineQuery'
import {
  TimelineMediaQuery as TimelineMediaQueryResult,
  TimelineMediaQueryVariables,
} from './__generated__/TimelineMediaQuery'
import { beforeRouteLeave, createBeforeRouteEnter } from '../hooks/fab'

import {
  computed,
  SetupContext,
  createComponent,
  ref,
  watch,
} from '@vue/composition-api'
import { useQuery, useQueryLoading, useResult } from '@vue/apollo-composable'
import {
  TimelinePrefetchQuery,
  TimelineQuery,
  TimelineMediaQuery,
} from './Timeline.gql.js'

import TheTimelineLoading from '@/components/TheTimelineLoading.vue'

import RenderlessSubtitle from '@/components/RenderlessSubtitle.vue'
import RenderlessTitle from '@/components/RenderlessTitle.vue'
import { asyncComponent } from '@/router'
import { usePage, updatePageQuery } from '@/hooks/page'
import { useFab } from '@/hooks/fab'
import { useRoutes } from '@/hooks/route'
import { MediaSort } from '@/../__generated__/globalTypes'
import { useShowMore } from './Search.vue'

import TheBackdrop from '@/components/TheBackdrop.vue'
const TimelineAppBar = () =>
  import(
    /* webpackChunkName: "TimelineAppBar" */ /* webpackPrefetch: true */ './TimelineAppBar.vue'
  )
const TimelineBackdrop = () =>
  import(
    /* webpackChunkName: "TimelineBackdrop" */ /* webpackPrefetch: true */ './TimelineBackdrop.vue'
  )

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

  const prefetchedMedia = useResult(
    prefetchQuery.result,
    [],
    data => data?.Page?.media || [],
  )

  watch(prefetchQuery.result, async data => {
    if (data?.Page) {
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
    TheBackdrop,
    TimelineBackdrop,
    TimelineAppBar,
    ViewSearchFilters,
    TheTimeline,
    TheTimelineLoading,
    RenderlessTitle,
    RenderlessSubtitle,
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

    const mediaQuery = useQuery<
      TimelineMediaQueryResult,
      TimelineMediaQueryVariables
    >(TimelineMediaQuery, () => ({
      id: props.currentId,
    }))

    const queryVariables = computed(() => ({
      sort: [MediaSort.START_DATE],
      ...props.queryWithBoolean,
      idIn: filterNull(prefetchedMedia.value).map(({ id }) => id),
    }))

    const { result: queryResult, loadMore, loadingMore, hasNextPage } = usePage<
      TimelineQueryResult,
      TimelineQueryVariables
    >(TimelineQuery, queryVariables, () => ({
      enabled: routeTimeline.value,
    }))

    const media = useResult(queryResult, [], data => data?.Page?.media || [])

    const fab = useFab()

    const loading = useQueryLoading()

    const showMore = useShowMore(
      media,
      hasNextPage,
      computed(() => loading.value || loadingMore.value),
      loadMore,
    )

    const currentMedia = useResult(mediaQuery.result, null)

    return {
      currentMedia,
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
