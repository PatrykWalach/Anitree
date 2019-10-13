<template>
  <v-container>
    <TheMediaTimeline :loading="loading" :media-list="mediaList" />
  </v-container>
</template>
<script lang="ts">
import {
  ApolloQueryResult,
  OperationVariables,
  WatchQueryOptions,
} from 'apollo-client'

import { Page, Variables as PageVariables } from '@/graphql/schema/page'
import {
  Ref,
  SetupContext,
  computed,
  createComponent,
  ref,
  watch,
} from '@vue/composition-api'

import { ClientOptions } from 'vue-apollo/types/vue-apollo'
import { Media } from '../graphql/schema/media'
import { PAGE } from '@/graphql'
import TheMediaTimeline from '../components/TheMediaTimeline.vue'

const getYear = (seasonInt: number) => {
  const year = Math.floor(seasonInt / 10)
  return (year > 50 ? 1900 : 2000) + year
}

export const useQuery = <R, TVariables = OperationVariables>(
  {
    skip,
    variables,
    ...options
  }: {
    variables?: Ref<TVariables>
    skip?: Ref<boolean>
  } & Omit<WatchQueryOptions<TVariables>, 'variables'> &
    ClientOptions,
  { root }: SetupContext,
) => {
  const result: Ref<ApolloQueryResult<R> | null> = ref(null)
  const error = ref(null)

  const query = root.$apollo.watchQuery<R, TVariables>({
    ...options,
    variables: variables && variables.value,
  })

  if (variables) {
    watch(variables, () => {
      if (!(skip && skip.value)) {
        query.setVariables(variables.value)
      }
    })
  }

  query.subscribe({
    error(_error) {
      error.value = _error
    },
    next(_result) {
      result.value = _result
    },
  })

  return {
    error,
    query,
    result,
  }
}

export default createComponent({
  components: {
    TheMediaTimeline,
  },
  setup(_, context) {
    const loading = ref(false)

    const currentId = computed(() =>
      parseInt(context.root.$route.params.mediaId, 10),
    )
    const variables = computed(() => ({
      idIn: currentId.value,
    }))

    const skip = computed(() => !variables.value.idIn)

    const { result, query } = useQuery<{ Page: Page }, PageVariables>(
      { query: PAGE, skip, variables },
      context,
    )

    watch(result, _result => {
      loading.value = true
      if (_result) {
        const idIn = _result.data.Page.media
          .flatMap(({ relations }) => relations.edges)
          .map(({ node }) => node.id)
          .filter(
            (id, i, arr) => arr.findIndex(mediaId => mediaId === id) === i,
          )
          .filter(id => !_result.data.Page.media.find(media => media.id === id))

        // console.log('TCL: setup -> idIn', idIn)

        if (idIn.length) {
          query.fetchMore({
            updateQuery: (previousResult, { fetchMoreResult }) => {
              if (!fetchMoreResult) {
                return previousResult
              }
              return {
                Page: {
                  ...fetchMoreResult.Page,
                  media: previousResult.Page.media.concat(
                    fetchMoreResult.Page.media,
                  ),
                },
              }
            },
            variables: { idIn },
          })
        } else {
          loading.value = false
        }
      }
    })

    const isNumber = (e: any): e is number => !isNaN(e)

    const compare = (keys: (string)[], transform?: (arg: number) => number) => (
      a: Record<string, any>,
      b: Record<string, any>,
    ) => {
      const _a: unknown = keys.reduce((acc, key) => acc[key], a) || Infinity
      const _b: unknown = keys.reduce((acc, key) => acc[key], b) || Infinity

      if (isNumber(_a) && isNumber(_b)) {
        if (!transform) {
          return _a - _b || 0
        }
        return transform(_a) - transform(_b) || 0
      }
      return 0
    }

    const sorters: ((mediaA: Media, mediaB: Media) => number)[] = [
      compare(['startDate', 'year']),
      compare(['startDate', 'month']),
      compare(['startDate', 'day']),
      compare(['seasonInt'], getYear),
      compare(['seasonInt'], int => int % 10),
    ]

    const mediaList = computed(
      () =>
        (result.value &&
          result.value.data.Page.media.slice().sort((a, b) => {
            for (const sort of sorters) {
              const result = sort(a, b)
              if (result) {
                return result
              }
            }
            return 0
          })) ||
        [],
    )

    return {
      loading,
      mediaList,
      query,
      result,
    }
  },
})
</script>
