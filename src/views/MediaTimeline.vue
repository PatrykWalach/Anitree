<template>
  <v-container>
    <TheMediaTimelineLoading v-if="loading" />
    <TheMediaTimeline v-else-if="mediaSorted" :media-list="mediaSorted" />
    <v-btn
      v-if="hasNextPage"
      @click="loadAll"
      :disabled="loading"
      block
      color="accent"
      >show all</v-btn
    >
  </v-container>
</template>
<script lang="ts">
import {
  ApolloQueryResult,
  FetchMoreOptions,
  FetchMoreQueryOptions,
} from 'apollo-client'
import { Page, Variables as PageVariables } from '@/graphql/schema/page'
import { Ref, computed, createComponent } from '@vue/composition-api'
import { useQuery, useQueryLoading, useResult } from '@vue/apollo-composable'

import { Media } from '../graphql/schema/media'
import { PAGE } from '@/graphql'
import { State } from '@/store'
import TheMediaTimelineLoading from '../components/TheMediaTimelineLoading.vue'

import { asyncComponent } from '@/views/Search.vue'

import { sorters } from '@/store/modules/timeline'
import { useRouteParams } from '../App.vue'
import { useRoutes } from '@/components/TheAppBar.vue'
import { useSelector } from 'vue-redux-hooks'
const TheMediaTimeline = () =>
  asyncComponent(
    import(
      /* webpackChunkName: "TheMediaTimelineLoading" */ '@/components/TheMediaTimeline.vue'
    ),
    TheMediaTimelineLoading,
  )

type FetchMore<Data, Variables> = <K extends keyof Variables>(
  options: FetchMoreQueryOptions<Variables, K> &
    FetchMoreOptions<Data, Variables>,
) => Promise<ApolloQueryResult<Data>>

export const usePagination = () => {
  const loadNextPage = (
    fetchMore: FetchMore<{ Page: Page }, PageVariables>,
    variables: PageVariables,
  ) =>
    fetchMore({
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult
        }

        return {
          Page: {
            ...fetchMoreResult.Page,
            media: previousResult.Page.media.concat(fetchMoreResult.Page.media),
          },
        }
      },
      variables,
    })
  return {
    loadNextPage,
  }
}
export default createComponent({
  components: {
    TheMediaTimeline,
    TheMediaTimelineLoading,
  },
  setup(_, { root }) {
    const findRelativeMedia = (
      someMedia: readonly Media[],
      filter: readonly Media[],
    ) =>
      someMedia
        .flatMap(({ relations }) => relations.edges)
        .map(({ node }) => node.id)
        .filter((id, i, arr) => arr.indexOf(id) === i)
        .filter(mediaId => !filter.find(({ id }) => id === mediaId))

    const loading = useQueryLoading()

    const { currentId } = useRouteParams(root)

    const variables = computed(() => ({
      idIn: currentId.value,
    }))

    const { routeTimeline } = useRoutes(root)

    const { result, fetchMore } = useQuery<{ Page: Page }, PageVariables>(
      PAGE,
      variables,
      () => ({
        enabled: routeTimeline.value,
        notifyOnNetworkStatusChange: true,
      }),
    )

    const media: Readonly<Ref<readonly Media[]>> = useResult(
      result,
      [],
      data => data.Page.media,
    )

    const nextIds = computed(() => findRelativeMedia(media.value, media.value))

    const hasNextPage = computed(() => !!nextIds.value.length)

    const { loadNextPage } = usePagination()

    const loadAll = async () => {
      const { data } = await loadNextPage(fetchMore, { idIn: nextIds.value })
      //  .then(({ data }) => {
      const ids = findRelativeMedia(data.Page.media, media.value)
      // console.log('TCL: ids', ids)

      if (ids.length) {
        loadNextPage(fetchMore, { idIn: ids })
      }
      // })
    }

    const order = useSelector((state: State) => state.timeline.order)

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
    }
  },
})
</script>
