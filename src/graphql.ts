import { ApolloLink, concat } from 'apollo-link'
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory'
import { PersistedData, PersistentStorage } from 'apollo-cache-persist/types'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { Variables } from '@/graphql/schema/media'
import Vue from 'vue'
import VueApollo from 'vue-apollo'

import { persistCache } from 'apollo-cache-persist'
import useSettings from '@/store/settings'

const link = new HttpLink({
  uri: 'https://graphql.anilist.co'
})

const middle = new ApolloLink((operation, forward) => {
  const { token } = useSettings()
  if (token.value) {
    operation.setContext({
      headers: {
        Authorization: `Bearer ${token.value}`
      }
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
        getCacheKey({ __typename: 'Media', id: (args as Variables).id })
    }
  }
})

if (useSettings().cacheApollo.value) {
  persistCache({
    cache,
    storage: window.localStorage as PersistentStorage<
      PersistedData<NormalizedCacheObject>
    >
  })
}

const apollo = new ApolloClient({
  cache,
  link: concat(middle, link)
})

Vue.use(VueApollo)

export default apollo

export const apolloProvider = new VueApollo({
  defaultClient: apollo
})

export { default as MEDIA } from '@/graphql/queries/Media.gql'
export {
  default as MEDIA_LIST_COLLECTION
} from '@/graphql/queries/MediaListCollection.gql'
export { default as PAGE } from '@/graphql/queries/Page.gql'
export { default as VIEWER } from '@/graphql/queries/Viewer.gql'

export {
  default as SAVE_MEDIA_LIST_ENTRY
} from '@/graphql/mutations/SaveMediaListEntry.gql'
export {
  default as DELETE_MEDIA_LIST_ENTRY
} from '@/graphql/mutations/DeleteMediaListEntry.gql'
