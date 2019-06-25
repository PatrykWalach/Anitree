import Vue from 'vue'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'

// Vue.use(VueApollo)

const link = createHttpLink({
  uri: 'https://graphql.anilist.co'
})

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
  link,
  cache
})

export const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

export default apolloClient
