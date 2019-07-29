<template>
  <v-app>
    <TheDrawer :value.sync="drawerValue" />
    <TheAppBar @toggle:drawer="toggleDrawer" />
    <v-content>
      <keep-alive :max="10">
        <router-view />
      </keep-alive>
      <MediaEdit :media="editMedia" />
      <BaseShare :options="shareOptions" />
    </v-content>
    <TheFooter />
  </v-app>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import TheDrawer from './components/TheDrawer.vue'
import TheFooter from './components/TheFooter.vue'
import TheAppBar from './components/TheAppBar.vue'
import MediaEdit from './components/MediaEdit.vue'
import edit from './store/modules/edit'
import share from './store/modules/share'
import BaseShare from './components/BaseShare.vue'

@Component({
  components: {
    TheFooter,
    MediaEdit,
    TheAppBar,
    BaseShare,
    TheDrawer
  }
})
export default class App extends Vue {
  drawerValue: boolean = false

  toggleDrawer() {
    this.drawerValue = !this.drawerValue
  }

  get editMedia() {
    return edit.media
  }

  get shareOptions() {
    return share.options
  }
}
</script>
