<template>
  <v-navigation-drawer :value="value" app @input="input">
    <!-- <TheDrawerSearch v-model="search" /> -->
    <TheDrawerFilters />
    <v-divider></v-divider>
    <TheDrawerSettings />
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'

import TheDrawerSettings from './TheDrawerSettings.vue'
import TheDrawerFilters from './TheDrawerFilters.vue'

@Component({
  components: {
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
