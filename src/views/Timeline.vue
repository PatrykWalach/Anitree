<template>
  <v-container>
    <TheTimelineLoading v-if="loading" />

    <the-timeline v-else-if="mediaSorted" :media-list="mediaSorted">
      <v-col>
        <v-btn
          v-if="hasNextPage"
          @click.stop="loadAll"
          :disabled="loading"
          block
          color="accent"
          >show all</v-btn
        >
      </v-col>
    </the-timeline>
  </v-container>
</template>
<script lang="ts">
import {
  ApolloQueryResult,
  FetchMoreOptions,
  FetchMoreQueryOptions,
} from 'apollo-client'

import {
  TimelineQuery,
  TimelineQueryVariables,
  TimelineQuery_Page_media,
} from './__generated__/TimelineQuery'
import { beforeRouteLeave, createBeforeRouteEnter } from '../hooks/fab'

import { computed, createComponent, ref } from '@vue/composition-api'
import { useQuery, useQueryLoading, useResult } from '@vue/apollo-composable'
import PAGE from './Timeline.gql'
import { RecursiveNonNullable } from '../types'
import TheTimelineLoading from '@/components/TheTimelineLoading.vue'
import { asyncComponent } from '@/router'
import { sorters } from '@/store/reducers/timeline'

import { useRoutes } from '@/hooks/route'

const TheTimeline = () =>
  asyncComponent(
    import(
      /* webpackChunkName: "TheTimeline" */ '@/components/TheTimeline.vue'
    ),
    TheTimelineLoading,
  )

export type FetchMore<Data, Variables> = <K extends keyof Variables>(
  options: FetchMoreQueryOptions<Variables, K> &
    FetchMoreOptions<Data, Variables>,
) => Promise<ApolloQueryResult<Data>>

export const updatePageQuery = <Q extends TimelineQuery>(
  previousResult: Q,
  {
    fetchMoreResult,
  }: {
    fetchMoreResult?: Q
  },
): Q => {
  if (!fetchMoreResult) {
    return previousResult
  }

  const getPageAndMedia = (result: Q) => {
    const resultPage = result.Page
    const resultMedia = (resultPage && resultPage.media) || []
    return [resultPage, resultMedia] as const
  }

  const [previousPage, previousMedia] = getPageAndMedia(previousResult)
  const [morePage, moreMedia] = getPageAndMedia(fetchMoreResult)

  return {
    ...previousResult,
    ...fetchMoreResult,
    Page: {
      __typename: 'Page',
      ...previousPage,
      ...morePage,
      media: previousMedia.concat(moreMedia),
    },
  }
}

export default createComponent({
  beforeRouteEnter: createBeforeRouteEnter(vm => ({
    icon: 'sort',
    on: () => {
      vm.order *= -1
    },
    title: 'sort',
  })),
  beforeRouteLeave,
  components: {
    TheTimeline,
    TheTimelineLoading,
  },
  props: { currentId: { default: null, required: true, type: Number } },
  setup(props, { root }) {
    const find = <R, D>(
      mapFn: (el: D, i: number, arr: readonly D[]) => R,
      data: readonly D[],
    ) => data.map(mapFn).filter(data => !!data) as NonNullable<R>[]

    const findRelativeMedia = (
      someMedia: readonly (TimelineQuery_Page_media | null)[],
      filter: readonly TimelineQuery_Page_media[],
    ) => {
      const filteredMedia = find(media => media, someMedia)
      const relations = find(({ relations }) => relations, filteredMedia)

      const edges = find(({ edges }) => edges, relations).flat()
      const nodes = find(({ node }) => node, edges)

      return nodes
        .map(({ id }) => id)
        .filter((id, i, arr) => arr.indexOf(id) === i)
        .filter(mediaId => !filter.find(({ id }) => id === mediaId))
    }

    const loading = useQueryLoading()

    const variables = computed(() => ({
      idIn: [props.currentId],
    }))

    const { routeTimeline } = useRoutes(root)

    const { result, fetchMore } = useQuery<
      TimelineQuery,
      TimelineQueryVariables
    >(PAGE, variables, () => ({
      enabled: routeTimeline.value,
      notifyOnNetworkStatusChange: true,
    }))

    const media = useResult<
      readonly TimelineQuery_Page_media[],
      readonly TimelineQuery_Page_media[]
    >(
      result,
      [],
      (data: RecursiveNonNullable<TimelineQuery>) => data.Page.media,
    )

    const nextIds = computed(() => findRelativeMedia(media.value, media.value))

    const hasNextPage = computed(() => !!nextIds.value.length)

    const loadNextPage = (variables: TimelineQueryVariables) =>
      fetchMore({
        updateQuery: updatePageQuery,
        variables,
      })

    const loadAll = async () => {
      const { data } = await loadNextPage({
        idIn: nextIds.value,
      })

      if (data.Page && data.Page.media) {
        const ids = findRelativeMedia(data.Page.media, media.value)

        if (ids.length) {
          loadNextPage({ idIn: ids })
        }
      }
    }

    const order = ref(1)

    const mediaSorted = computed(() => {
      const orderValue = order.value
      return media.value.slice().sort((a, b) => {
        for (const sort of sorters) {
          const result = sort(a, b) * orderValue

          if (result) {
            return result
          }
        }
        return 0
      })
    })

    return {
      hasNextPage,
      loadAll,
      loading,
      mediaSorted,
      order,
    }
  },
})
</script>
