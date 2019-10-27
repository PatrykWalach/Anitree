<template>
  <BaseQuery
    :apollo="{
      Viewer,
      Media: {
        ...Media,
        tag: null,
      },
    }"
    v-slot="{ Media, Viewer }"
  >
    <v-app>
      <TheAppBar :media="Media" @toggle:drawer="toggleDrawer" />

      <v-content>
        <keep-alive>
          <router-view />
        </keep-alive>
        <TheSearchFilters />
        <MediaEdit :id="mediaId" />
        <BaseShare :options="options" />
      </v-content>

      <TheBottomAppBar
        :media="Media"
        :drawer.sync="drawer"
        v-if="$vuetify.breakpoint.xsOnly"
      />

      <TheDrawer :viewer="Viewer" :value.sync="drawer" />

      <TheFooter />
    </v-app>
  </BaseQuery>
</template>
<script lang="ts">
import {
  SetupContext,
  computed,
  createComponent,
  ref,
} from '@vue/composition-api'
import { useMedia, useViewer } from '@/graphql'
import BaseQuery from '@/components/BaseQuery.vue'
import BaseShare from './components/BaseShare.vue'
import MediaEdit from './components/MediaEdit.vue'
import TheAppBar from './components/TheAppBar.vue'

const TheBottomAppBar = () =>
  import(
    /* webpackChunkName: "TheBottomAppBar" */ /* webpackPrefetch: true */ './components/TheBottomAppBar.vue'
  )
import TheDrawer from './components/TheDrawer.vue'
import TheFooter from './components/TheFooter.vue'
import TheSearchFilters from './components/TheSearchFilters.vue'

export const useTheme = (root: SetupContext['root']) => {
  const dark = computed({
    get: () => root.$vuetify.theme.dark,
    set: dark => {
      root.$vuetify.theme.dark = dark
      localStorage.setItem('THEME', dark.toString())
    },
  })
  return { dark }
}

export default createComponent({
  components: {
    BaseQuery,
    BaseShare,
    MediaEdit,
    TheAppBar,
    TheBottomAppBar,
    TheDrawer,
    TheFooter,
    TheSearchFilters,
  },
  setup(_, { root }) {
    const drawer = ref(false)

    const toggleDrawer = () => {
      drawer.value = !drawer.value
    }

    const { mediaId } = root.$modules.edit

    const {
      state: { options },
    } = root.$modules.share

    const { dark } = useTheme(root)

    const stored = localStorage.getItem('THEME')

    if (stored === null) {
      window.matchMedia('(prefers-color-scheme: dark)').addListener(e => {
        if (e.matches) {
          dark.value = true
        }
      })
    } else {
      dark.value = localStorage.getItem('THEME') === 'true'
    }

    return {
      drawer,
      ...useViewer(root),
      ...useMedia(() => ({ id: parseInt(root.$route.params.mediaId, 10) })),
      mediaId,
      options,
      toggleDrawer,
    }
  },
})
</script>
