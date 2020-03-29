<template>
  <VApp>
    <TheDrawer rounded :value.sync="drawer" />

    <VContent
      :class="{
        primary: $vuetify.breakpoint.xsOnly,
      }"
    >
      <KeepAlive>
        <RouterView />
      </KeepAlive>
    </VContent>

    <TheFooter />

    <TheRightDrawer v-if="!$vuetify.breakpoint.xsOnly">
      <KeepAlive>
        <RouterView name="drawer" />
      </KeepAlive>
    </TheRightDrawer>
  </VApp>
</template>
<script lang="ts">
import { defineComponent, ref, provide } from '@vue/composition-api'

import TheDrawer from './components/TheDrawer.vue'
import TheFooter from './components/TheFooter.vue'
import { useQuery } from '@vue/apollo-composable'
import { useToken } from '@/hooks/token'

import { DefaultViewer } from './hooks/viewer'
import { AppQuery as AppQueryResult } from './__generated__/AppQuery'

import gql from 'graphql-tag'
import { MediaEditFragments } from './components/MediaEdit.vue'
import { SearchFragments } from './views/Search.vue'

export const AppQuery = gql`
  query AppQuery {
    Viewer {
      id
      ...MediaEdit_viewer
      ...Search_viewer
    }
  }
  ${MediaEditFragments.viewer}
  ${SearchFragments.viewer}
`

const TheRightDrawer = () =>
  import(
    /* webpackChunkName: "TheRightDrawer" */ /* webpackPrefetch: true */ './components/TheRightDrawer.vue'
  )

const TheBackdrop = () =>
  import(
    /* webpackChunkName: "TheBackdrop" */ /* webpackPrefetch: true */ './components/TheBackdrop.vue'
  )

export default defineComponent({
  components: {
    TheDrawer,
    TheFooter,
    TheBackdrop,
    TheRightDrawer,
  },
  setup() {
    const drawer = ref(false)

    const toggleDrawer = () => {
      drawer.value = !drawer.value
    }

    const token = useToken()

    const { result, loading, error } = useQuery<AppQueryResult>(
      AppQuery,
      {},
      () => ({
        enabled: !!token.value,
      }),
    )

    provide(DefaultViewer, { result, loading, error })

    return {
      drawer,
      toggleDrawer,
    }
  },
})
</script>
<style lang="scss">
.v-content.primary > div {
  display: flex;
  flex-direction: column;
}
</style>
