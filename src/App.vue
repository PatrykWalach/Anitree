<template>
  <v-app>
    <TheDrawer :value.sync="drawer" />
    <TheAppBar @toggle:drawer="toggleDrawer" />
    <TheBottomNavigation v-if="$vuetify.breakpoint.xsOnly" />
    <v-content>
      <keep-alive>
        <v-fade-transition hide-on-leave>
          <router-view />
        </v-fade-transition>
      </keep-alive>
      <MediaEdit :id="mediaId" />
      <BaseShare :options="options" />
    </v-content>
  </v-app>
</template>
<script lang="ts">
import TheDrawer from './components/TheDrawer.vue'
import TheAppBar from './components/TheAppBar.vue'
import MediaEdit from './components/MediaEdit.vue'
import BaseShare from './components/BaseShare.vue'

// import TheBottomNavigation from './components/TheBottomNavigation.vue'

const TheBottomNavigation = () => import('@/components/TheBottomNavigation.vue')

import { ref, createComponent } from '@vue/composition-api'
import useEdit from './store/edit'
import useShare from './store/share'

export default createComponent<{}>({
  components: {
    MediaEdit,
    TheAppBar,
    BaseShare,
    TheDrawer,
    TheBottomNavigation
  },
  setup(_, { root }) {
    const drawer = ref(false)

    const toggleDrawer = () => {
      drawer.value = !drawer.value
    }

    const { mediaId } = useEdit()
    const { options } = useShare()

    root.$vuetify.theme.dark = localStorage.getItem('THEME') === 'true'

    return {
      drawer,
      toggleDrawer,
      mediaId,
      options
    }
  }
})
</script>
