<template>
  <v-app>
    <TheDrawer :value.sync="drawerValue" />
    <TheToolbar @toggle:drawer="toggleDrawer" />
    <v-content>
      <keep-alive :max="10">
        <router-view />
      </keep-alive>
      <MediaEdit :media="media" />
    </v-content>
    <TheFooter />
  </v-app>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import TheDrawer from './components/TheDrawer.vue'
import TheFooter from './components/TheFooter.vue'
import TheToolbar from './components/TheToolbar.vue'
import MediaEdit from './components/MediaEdit.vue'
import edit from './store/modules/edit'

@Component({
  components: {
    TheFooter,
    MediaEdit,
    TheToolbar,
    TheDrawer
  }
})
export default class App extends Vue {
  drawerValue: boolean = false

  toggleDrawer() {
    this.drawerValue = !this.drawerValue
  }

  get media() {
    return edit.media
  }
}
</script>
