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
      <TheFab v-if="!bottomNavigation" />
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

    const {
      state: { mediaId },
    } = root.$modules.edit

    const {
      state: { options },
    } = root.$modules.share

    // const {
    //   state: { active },
    // } = context.root.$modules.fab

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

    const bottomNavigation = computed(
      () =>
        root.$vuetify.breakpoint.xsOnly &&
        !!root.$modules.navigation.state.main.value.find(
          ({ to }) => to.name === root.$route.name,
        ),
    )

    return {
      bottomNavigation,
      drawer,
      mediaId,
      options,
      toggleDrawer,
    }
  },
})
</script>
