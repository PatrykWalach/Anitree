<template>
  <v-app>
    <TheDrawer rounded :value.sync="drawer" />

    <v-content>
      <keep-alive>
        <router-view />
      </keep-alive>
    </v-content>
    <template v-if="$vuetify.breakpoint.xsOnly">
      <keep-alive>
        <router-view name="appBar" />
      </keep-alive>
      <TheBottomAppBar :drawer.sync="drawer" />
    </template>
    <the-right-drawer v-else>
      <keep-alive>
        <router-view name="drawer" />
      </keep-alive>
    </the-right-drawer>
    <TheFooter />
  </v-app>
</template>
<script lang="ts">
import { createComponent, ref, provide } from '@vue/composition-api'

import TheDrawer from './components/TheDrawer.vue'
import TheFooter from './components/TheFooter.vue'
import { useQuery } from '@vue/apollo-composable'
import { useToken } from '@/hooks/token'

import { DefaultViewer } from './hooks/viewer'
import { AppQuery } from './App.gql.js'
import { AppQuery as AppQueryResult } from './__generated__/AppQuery'

const TheRightDrawer = () =>
  import(
    /* webpackChunkName: "TheRightDrawer" */ /* webpackPrefetch: true */ './components/TheRightDrawer.vue'
  )

const TheBottomAppBar = () =>
  import(
    /* webpackChunkName: "TheBottomAppBar" */ /* webpackPrefetch: true */ './components/TheBottomAppBar.vue'
  )

export default createComponent({
  components: {
    TheBottomAppBar,
    TheDrawer,
    TheFooter,
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
