<template>
  <v-navigation-drawer @input="input" :value="value" app>
    <!-- <TheDrawerSearch v-model="search" /> -->
    <TheDrawerFilters />
    <v-divider></v-divider>
    <TheDrawerSettings />
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'

import FuzzySearch from 'fuzzy-search'

import TheDrawerSettings from './TheDrawerSettings.vue'
import TheDrawerList from './TheDrawerList.vue'
import TheDrawerFilters from './TheDrawerFilters.vue'

@Component({
  components: {
    TheDrawerList,
    TheDrawerSettings,
    TheDrawerFilters
  }
})
export default class TheDrawer extends Vue {
  @Prop()
  public readonly value!: boolean

  public search: string = ''

  @Emit()
  public input(value: boolean) {
    return value
  }
}
</script>
