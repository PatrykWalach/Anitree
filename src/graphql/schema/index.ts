import { DocumentNode } from 'graphql'
import { OperationVariables } from 'apollo-client'

export type FetchPolicy = 'cache-and-network'

export interface ApolloQueryProps<
  Result = any,
  Variables = OperationVariables
> {
  query: DocumentNode
  variables?: Variables
  fetchPolicy?: FetchPolicy
  pollInterval?: number
  notifyOnNetworkStatusChange?: boolean
  context?: Record<string, any>
  update?(data: Result): any
  skip?: boolean
  clientId?: number
  deep?: boolean
  tag?: string | null
  debounce?: number
  throttle?: number
  prefetch?: boolean
  options?: any
}
