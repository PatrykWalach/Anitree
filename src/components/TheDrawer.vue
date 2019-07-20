<template>
  <v-navigation-drawer v-model="syncedValue" app>
    <TheDrawerFilters v-if="filters.length" :filters="filters" />
    <v-divider></v-divider>
    <TheDrawerTitle />
    <v-divider></v-divider>

    <TheDrawerSettings />
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Vue, Component, PropSync } from 'vue-property-decorator'

import TheDrawerSettings from './TheDrawerSettings.vue'
import TheDrawerTitle from './TheDrawerTitle.vue'
const TheDrawerFilters = () => import('./TheDrawerFilters.vue')

import media from '../store/modules/media'

@Component({
  components: {
    TheDrawerSettings,
    TheDrawerFilters,
    TheDrawerTitle
  }
})
export default class TheDrawer extends Vue {
  @PropSync('value', { required: true })
  readonly syncedValue!: boolean

  get filters() {
    return media.relationTypes
  }
}
</script>
