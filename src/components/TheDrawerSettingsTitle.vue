<template>
  <v-list-tile @click avatar>
    <v-list-tile-content @click="changePrefered">
      <v-list-tile-title class="text-capitalize"
        >prefered title</v-list-tile-title
      >
      <v-list-tile-sub-title class="text-capitalize">{{
        title
      }}</v-list-tile-sub-title>
    </v-list-tile-content>
  </v-list-tile>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import moduleTitle from '@/store/modules/title'
import Cookies from 'js-cookie'

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
    Cookies.set('title', { prefered }, { expires: Infinity })
    return moduleTitle.CHANGE_PREFERED(prefered)
  }

  public created() {
    const title: { prefered: number } = Cookies.getJSON('title')
    if (title) {
      moduleTitle.CHANGE_PREFERED(title.prefered)
    }
  }
}
</script>
