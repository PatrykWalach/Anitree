<template>
  <v-navigation-drawer :value="value" app @input="input">
    <!-- <TheDrawerSearch v-model="search" /> -->
    <TheDrawerFilters v-if="filter" />
    <v-divider></v-divider>
    <TheDrawerSettings />
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'

import TheDrawerSettings from './TheDrawerSettings.vue'
const TheDrawerFilters = () => import('./TheDrawerFilters.vue')

import media from '../store/modules/media'

@Component({
  components: {
    TheDrawerSettings,
    TheDrawerFilters
  }
})
export default class TheDrawer extends Vue {
  @Prop()
  public readonly value!: boolean

  get filter() {
    return media.activeFilters.length
  }

  @Emit()
  public input(value: boolean) {
    return value
  }
}
</script>
