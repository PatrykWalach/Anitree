<template>
  <v-navigation-drawer :value="value" app @input="input">
    <TheDrawerFilters v-if="filters.length" :filters="filters" />
    <v-divider></v-divider>
    <TheDrawerTitle />
    <v-divider></v-divider>

    <TheDrawerSettings />
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'

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
  @Prop({ required: true })
  readonly value!: boolean

  get filters() {
    return media.relationTypes
  }

  @Emit()
  input(value: boolean) {
    return value
  }
}
</script>
