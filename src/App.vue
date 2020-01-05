<template>
  <v-app>
    <TheDrawer rounded :value.sync="drawer" />

    <v-content>
      <keep-alive>
        <router-view />
      </keep-alive>
    </v-content>

    <the-bottom-app-bar :drawer.sync="drawer" v-if="$vuetify.breakpoint.xsOnly">
      <keep-alive>
        <router-view name="appBar" />
      </keep-alive>
    </the-bottom-app-bar>
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

const TheRightDrawer = () =>
  import(
    /* webpackChunkName: "TheRightDrawer" */ './components/TheRightDrawer.vue'
  )

const TheBottomAppBar = () =>
  import(
    /* webpackChunkName: "TheBottomAppBar" */ './components/TheBottomAppBar.vue'
  )

import { DefaultViewer } from './hooks/viewer'
import { AppQuery } from './App.js'
import { AppQuery as AppQueryResult } from './__generated__/AppQuery'

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

    const { result, loading, error, onError } = useQuery<AppQueryResult>(
      AppQuery,
      {},
      () => ({
        enabled: !!token.value,
      }),
    )
    onError((...e) => console.log(e))

    provide(DefaultViewer, { result, loading, error })

    return {
      drawer,
      toggleDrawer,
    }
  },
})
</script>
