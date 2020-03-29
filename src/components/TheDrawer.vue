<template>
  <v-navigation-drawer
    v-model="syncedValue"
    app
    :mini-variant="!$vuetify.breakpoint.xsOnly"
    :permanent="!$vuetify.breakpoint.xsOnly"
    mini-variant-width="72"
    color="primary"
    dark
  >
    <template v-if="$vuetify.breakpoint.xsOnly">
      <VList v-bind="$attrs">
        <VListItem selectable>
          <VListItemTitle class="headline">
            <template> Anitree <sup class="overline">alpha</sup> </template>
          </VListItemTitle>
        </VListItem>
      </VList>
    </template>

    <VList v-bind="$attrs">
      <TheDrawerLoadingViewer v-if="loading" />
      <TheDrawerViewer v-else-if="viewer" :viewer="viewer" />
      <TheDrawerLogin v-else :disabled="!!token" />
    </VList>

    <v-fab-transition v-if="!$vuetify.breakpoint.xsOnly">
      <div v-if="fab" :key="fab.icon">
        <VList rounded>
          <BaseActionItem
            icon-color="black"
            class="accent"
            :icon="fab.icon"
            :title="fab.title"
            @click.stop="fab.on"
          />
        </VList>
      </div>
    </v-fab-transition>

    <VList v-bind="$attrs">
      <BaseActionItem
        v-for="{ attrs, props, on } in navigationElements"
        :key="props.icon"
        color="accent"
        v-bind="{ ...attrs, ...props }"
        v-on="on"
      />
    </VList>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useQueryLoading, useQuery, useResult } from '@vue/apollo-composable'
import BaseActionItem from './BaseActionItem.vue'
import { Location } from 'vue-router'
import { NavigationElement } from '../types'
import TheDrawerLoadingViewer from './TheDrawerLoadingViewer.vue'
import TheDrawerLogin from './TheDrawerLogin.vue'
import { asyncComponent } from '@/router'
import { useFab } from '@/hooks/fab'
import { useSync } from '@/hooks/sync'
import { useToken } from '@/hooks/token'

import { TheDrawerQuery as TheDrawerQueryResult } from './__generated__/TheDrawerQuery'
import gql from 'graphql-tag'
import { TheDrawerViewerFragments } from './TheDrawerViewer.vue'

export const TheDrawerQuery = gql`
  query TheDrawerQuery {
    Viewer {
      id
      ...TheDrawerViewer_viewer
    }
  }
  ${TheDrawerViewerFragments.viewer}
`

const TheDrawerViewer = () =>
  asyncComponent(
    import(
      /* webpackChunkName: "TheDrawerViewer" */ /* webpackPrefetch: true */ './TheDrawerViewer.vue'
    ),
    TheDrawerLoadingViewer,
  )

interface Props {
  value: boolean
}

const useSearch = () => {
  const searchBtn: NavigationElement<{
    to: Location
  }> = {
    attrs: {
      to: {
        name: 'search',
        query: {
          sort: 'TRENDING_DESC',
        },
      },
    },
    props: {
      icon: 'search',
      title: 'Search',
    },
  }

  return { searchBtn }
}

export const useTheDrawerNavigation = () => {
  const { searchBtn } = useSearch()

  const elements: NavigationElement<{
    to: Location
    exact?: boolean
  }>[] = [
    {
      attrs: { exact: true, to: { name: 'home' } },
      props: {
        icon: 'home',
        title: 'Home',
      },
    },
    searchBtn,
    {
      attrs: { exact: true, to: { name: 'changes' } },
      props: {
        icon: 'change_history',
        title: 'Changes',
      },
    },
  ]

  return elements
}

export default defineComponent<Readonly<Props>>({
  components: {
    BaseActionItem,
    TheDrawerLoadingViewer,
    TheDrawerLogin,
    TheDrawerViewer,
  },
  inheritAttrs: false,
  props: {
    value: {
      default: false,
      required: true,
      type: Boolean,
    },
  },
  setup(props, { emit }) {
    const syncedValue = useSync(props, 'value', emit)
    const token = useToken()
    const viewerQuery = useQuery<TheDrawerQueryResult>(
      TheDrawerQuery,
      {},
      () => ({
        enabled: !!token.value,
      }),
    )
    const viewer = useResult(viewerQuery.result)
    const loading = useQueryLoading()
    const navigationElements = useTheDrawerNavigation()
    const fab = useFab()

    return {
      fab,
      loading,
      navigationElements,
      syncedValue,
      token,
      viewer,
    }
  },
})
</script>
