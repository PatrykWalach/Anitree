import { ApolloClient } from 'apollo-client'
import { ApolloLink, concat } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import auth from './store/modules/auth'

const link = new HttpLink({
  uri: 'https://graphql.anilist.co'
})

const middle = new ApolloLink((operation, forward) => {
  if (auth.token) {
    operation.setContext({
      headers: {
        Authorization: `Bearer ${auth.token}`
      }
    })
  }
  if (forward) {
    return forward(operation)
  }
  return null
})

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
  link: concat(middle, link),
  cache
})

export default apolloClient
