<template>
  <v-app>
    <TheAppBar @toggle:drawer="toggleDrawer" />

    <v-content>
      <keep-alive>
        <router-view />
      </keep-alive>
      <TheSearchFilters />
      <MediaEdit :id="mediaId" />
      <BaseShare :options="options" />
      <TheFab />
    </v-content>

    <TheBottomNavigation v-if="bottomNavigation" />
    <TheDrawer v-else-if="!$vuetify.breakpoint.xsOnly" :value.sync="drawer" />

    <TheFooter />
  </v-app>
</template>
<script lang="ts">
import {
  SetupContext,
  computed,
  createComponent,
  ref,
} from '@vue/composition-api'
import BaseShare from './components/BaseShare.vue'
import MediaEdit from './components/MediaEdit.vue'
import TheAppBar from './components/TheAppBar.vue'
import TheBottomNavigation from './components/TheBottomNavigation.vue'
import TheDrawer from './components/TheDrawer.vue'
import TheFab from './components/TheFab.vue'
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
export const useBottomNavigation = (root: SetupContext['root']) => {
  const mainRoute = computed(() => {
    const { name } = root.$route

    return !!root.$modules.navigation.main.value.find(
      ({ bind }) => bind.to.name === name,
    )
  })

  const bottomNavigation = computed(
    () => root.$vuetify.breakpoint.xsOnly && mainRoute.value,
  )
  return { bottomNavigation, mainRoute }
}

export default createComponent({
  components: {
    BaseShare,
    MediaEdit,
    TheAppBar,
    TheBottomNavigation,
    TheDrawer,
    TheFab,
    TheFooter,
    TheSearchFilters,
  },
  setup(_, { root }) {
    const drawer = ref(false)

    const toggleDrawer = () => {
      drawer.value = !drawer.value
    }

    const { mediaId } = root.$modules.edit

    const { options } = root.$modules.share

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
      ...useBottomNavigation(root),
      mediaId,
      options,
      toggleDrawer,
    }
  },
})
</script>
