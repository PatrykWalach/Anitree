import { DefaultApolloClient } from '@vue/apollo-composable'
import { apollo } from '@/apollo'

export const mockApollo = () => apollo

export const useMockedApollo = () => {
  const apollo = mockApollo()
  return {
    [DefaultApolloClient]: apollo,
  }
}
