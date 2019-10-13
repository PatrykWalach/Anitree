<template>
  <v-app>
    <TheBottomNavigation v-if="$vuetify.breakpoint.xsOnly" />
    <TheDrawer v-else :value.sync="drawer" />
    <TheAppBar @toggle:drawer="toggleDrawer" />
    <v-content>
      <keep-alive>
        <router-view />
      </keep-alive>

      <MediaEdit :id="mediaId" />
      <BaseShare :options="options" />
    </v-content>
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
import TheFooter from './components/TheFooter.vue'

// const TheBottomNavigation = () => import('@/components/TheBottomNavigation.vue')

export const useTheme = ({ root }: SetupContext) => {
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
    TheFooter,
  },
  setup(_, context) {
    const drawer = ref(false)

    const toggleDrawer = () => {
      drawer.value = !drawer.value
    }

    const {
      state: { mediaId },
    } = context.root.$modules.edit

    const {
      state: { options },
    } = context.root.$modules.share

    const { dark } = useTheme(context)

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
      mediaId,
      options,
      toggleDrawer,
    }
  },
})
</script>
