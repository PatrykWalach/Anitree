<template>
  <v-app :dark="dark" inset>
    <TheDrawer v-model="drawerValue" />
    <TheToolbar @toggle:drawer="toggleDrawer" />
    <v-content>
      <keep-alive>
        <router-view />
      </keep-alive>
    </v-content>
    <TheFooter />
  </v-app>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import TheToolbar from './components/TheToolbar.vue'
import TheDrawer from './components/TheDrawer.vue'
import TheFooter from './components/TheFooter.vue'
import theme from './store/modules/theme'

@Component({
  components: {
    TheFooter,
    TheToolbar,
    TheDrawer
  }
})
export default class App extends Vue {
  get dark() {
    return theme.dark
  }

  public drawerValue: boolean = false

  public toggleDrawer() {
    this.drawerValue = !this.drawerValue
  }
}
</script>
