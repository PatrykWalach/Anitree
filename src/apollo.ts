import { ApolloLink, concat } from 'apollo-link'
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory'
import { PersistedData, PersistentStorage } from 'apollo-cache-persist/types'

import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'

import { Variables } from '@/graphql/schema/media'
import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { persistCache } from 'apollo-cache-persist'
import { settings } from '@/modules'

const link = new HttpLink({
  uri: 'https://graphql.anilist.co',
})

const middle = new ApolloLink((operation, forward) => {
  const {
    state: { token },
  } = settings

  if (token.value) {
    operation.setContext({
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })
  }
  if (forward) {
    return forward(operation)
  }
  return null
})

const cache = new InMemoryCache({
  cacheRedirects: {
    Query: {
      Media: (_, args, { getCacheKey }) =>
        getCacheKey({ __typename: 'Media', id: (args as Variables).id }),
    },
  },
})

// if (settings.state.cacheApollo.value) {
persistCache({
  cache,
  storage: window.localStorage as PersistentStorage<
    PersistedData<NormalizedCacheObject>
  >,
})
// }

export const apollo = new ApolloClient({
  cache,
  link: concat(middle, link),
})

Vue.use(VueApollo)

export const apolloProvider = new VueApollo({
  defaultClient: apollo,
})
