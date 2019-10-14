import { ApolloLink, concat } from 'apollo-link'
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory'
import { PersistedData, PersistentStorage } from 'apollo-cache-persist/types'
import { Ref, SetupContext, computed } from '@vue/composition-api'
import { ApolloClient } from 'apollo-client'
import { ApolloQueryProps } from '@/graphql/schema'
import { HttpLink } from 'apollo-link-http'
import MEDIA from '@/graphql/queries/Media.gql'
import { Media as MediaT } from '@/graphql/schema/media'
import { User } from './graphql/schema/viewer'
import VIEWER from '@/graphql/queries/Viewer.gql'
import { Variables } from '@/graphql/schema/media'
import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { persistCache } from 'apollo-cache-persist'
import { settings } from '@/store/modules'

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

if (settings.state.cacheApollo.value) {
  persistCache({
    cache,
    storage: window.localStorage as PersistentStorage<
      PersistedData<NormalizedCacheObject>
    >,
  })
}

export const apollo = new ApolloClient({
  cache,
  link: concat(middle, link),
})

Vue.use(VueApollo)

export const apolloProvider = new VueApollo({
  defaultClient: apollo,
})

export { default as MEDIA } from '@/graphql/queries/Media.gql'

export {
  default as MEDIA_LIST_COLLECTION,
} from '@/graphql/queries/MediaListCollection.gql'
export { default as PAGE } from '@/graphql/queries/Page.gql'
export { default as VIEWER } from '@/graphql/queries/Viewer.gql'

export {
  default as SAVE_MEDIA_LIST_ENTRY,
} from '@/graphql/mutations/SaveMediaListEntry.gql'
export {
  default as DELETE_MEDIA_LIST_ENTRY,
} from '@/graphql/mutations/DeleteMediaListEntry.gql'

export const useMedia = (props: () => Variables) => {
  const variables = computed(props)

  const Media: Ref<ApolloQueryProps<{ Media: MediaT }, Variables>> = computed(
    () => ({
      query: MEDIA,
      skip: !variables.value.id || variables.value.id === 0,
      variables: variables.value,
    }),
  )

  return {
    Media,
    variables,
  }
}

export const useViewer = (root: SetupContext['root']) => {
  const {
    state: { token },
  } = root.$modules.settings

  const Viewer: Ref<ApolloQueryProps<{ Viewer: User }, never>> = computed(
    () => ({
      query: VIEWER,
      skip: !token.value,
      tag: null,
    }),
  )

  return {
    Viewer,
    token,
  }
}
