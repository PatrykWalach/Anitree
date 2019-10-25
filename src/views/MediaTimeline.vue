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
import { DocumentNode } from 'graphql'

import { PAGE } from '@/graphql'
import TheMediaTimeline from '../components/TheMediaTimeline.vue'

export const useQuery = <R, TVariables = OperationVariables>(
  root: SetupContext['root'],
  queryDocument: DocumentNode,
  {
    skip,
    variables,
    ...options
  }: {
    variables?: Ref<TVariables>
    skip?: Ref<boolean>
  } & Omit<WatchQueryOptions<TVariables>, 'variables' | 'query'> &
    ClientOptions,
) => {
  const result: Ref<ApolloQueryResult<R> | null> = ref(null)
  const error = ref(null)

  const query = root.$apollo.watchQuery<R, TVariables>({
    query: queryDocument,
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
    data: computed(() => result.value && result.value.data),
    error: computed(() => result.value && result.value.errors),
    fetchMore: query.fetchMore.bind(query),
    loading: computed(() => result.value && result.value.loading),
    refetch: query.refetch.bind(query),
    startPolling: query.startPolling.bind(query),
    stopPolling: query.stopPolling.bind(query),
    subscribeToMore: query.subscribeToMore.bind(query),
    updateQuery: query.updateQuery.bind(query),
    variables,
  }
}

export default createComponent({
  components: {
    TheMediaTimeline,
  },
  setup(_, { root }) {
    const loading = ref(false)

    const currentId = computed(() => parseInt(root.$route.params.mediaId, 10))
    const variables = computed(() => ({
      idIn: currentId.value,
    }))

    const skip = computed(() => !variables.value.idIn)

    const { data, fetchMore } = useQuery<{ Page: Page }, PageVariables>(
      root,
      PAGE,
      { skip, variables },
    )

    watch(data, data => {
      loading.value = true
      if (data) {
        const idIn = data.Page.media
          .flatMap(({ relations }) => relations.edges)
          .map(({ node }) => node.id)
          .filter(
            (id, i, arr) => arr.findIndex(mediaId => mediaId === id) === i,
          )
          .filter(id => !data.Page.media.find(media => media.id === id))

        if (idIn.length) {
          fetchMore({
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

    const { sorters, order } = root.$modules.timeline

    const mediaList = computed(() => {
      const _data = data.value
      const _order = order.value

      return (
        (_data &&
          _data.Page.media.slice().sort((a, b) => {
            for (const sort of sorters.value) {
              const result = sort(a, b) * _order

              if (result) {
                return result
              }
            }
            return 0
          })) ||
        []
      )
    })

    return {
      data,
      loading,
      mediaList,
    }
  },
})
</script>
