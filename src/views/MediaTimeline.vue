<template>
  <v-container>
    <TheMediaTimeline :loading="loading" :media-list="mediaSorted" />
  </v-container>
</template>
<script lang="ts">
import {
  ApolloQueryResult,
  ObservableQuery,
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
import { State } from '@/store'
import TheMediaTimeline from '../components/TheMediaTimeline.vue'

import { sorters } from '@/store/modules/timeline'
import { useRouteParams } from '../App.vue'
import { useSelector } from 'vue-redux-hooks'
import { Media, Node } from '../graphql/schema/media'

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
): [Ref<ApolloQueryResult<R>>, ObservableQuery<R, TVariables>] => {
  const result: Ref<ApolloQueryResult<R>> = ref({ data: null })

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
      result.value.errors = _error
    },
    next(_result) {
      result.value = _result
    },
  })

  return [result, query]
}

export default createComponent({
  components: {
    TheMediaTimeline,
  },
  setup(_, { root }) {
    const loading = ref(false)

    const { currentId } = useRouteParams(root)

    const variables = computed(() => ({
      idIn: currentId.value,
    }))

    const skip = computed(() => !variables.value.idIn)

    const [result, query] = useQuery<{ Page: Page }, PageVariables>(
      root,
      PAGE,
      { skip, variables },
    )

    const page = computed(() => result.value.data && result.value.data.Page)

    watch(page, page => {
      loading.value = true
      if (page) {
        const idIn = page.media
          .flatMap(({ relations }) => relations.edges)
          .map(({ node }) => node.id)
          .filter((id, i, arr) => arr.indexOf(id) === i)
          .filter(id => !page.media.find(media => media.id === id))

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

    const order = useSelector((state: State) => state.timeline.order)

    const media = computed(() => {
      const pageValue = page.value
      return (pageValue && pageValue.media) || []
    })

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
      loading,
      mediaSorted,
    }
  },
})
</script>
