import { DocumentNode } from 'graphql'
import { DollarApollo } from 'vue-apollo/types/vue-apollo'
import Vue from 'vue'
import { mockedMedia } from './media'
import { mockedViewer } from './viewer'

export const mockedDollarApollo = ({
  mutate: async () => ({}),
  query: async ({ query }: { query: DocumentNode }) => {
    if (query) {
      return {
        data: {
          Media: mockedMedia,
        },
      }
    }

    return {
      data: {
        Viewer: mockedViewer,
      },
    }
  },
} as unknown) as DollarApollo<Vue>
