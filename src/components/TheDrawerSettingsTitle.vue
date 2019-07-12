<template>
  <v-list-item  @click>
    <v-list-item-content @click="changePrefered">
      <v-list-item-title class="text-capitalize"
        >prefered title</v-list-item-title
      >
      <v-list-item-subtitle class="text-capitalize">{{
        title
      }}</v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import moduleTitle from '../store/modules/title'

interface Options {
  expires?: string | number | Date
  path?: string
  domain?: string
  secure?: boolean
}

interface Cookies {
  set<T = any>(key: string, value: T, options: Options): void
}

@Component
export default class TheDrawerSettingsTitle extends Vue {
  get prefered() {
    return moduleTitle.prefered
  }

  get titles() {
    return moduleTitle.titles
  }

  get title() {
    return this.titles[this.prefered]
  }

  public changePrefered() {
    const prefered = (this.prefered + 1) % this.titles.length
    return moduleTitle.CHANGE_PREFERED(prefered)
  }
}
</script>
