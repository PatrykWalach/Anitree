<template>
  <v-list-tile avatar @click>
    <v-list-tile-action>
      <v-switch :input-value="dark" @change="changeTheme"></v-switch>
    </v-list-tile-action>

    <v-list-tile-content @click="changeTheme">
      <v-list-tile-title class="text-capitalize">theme</v-list-tile-title>
      <v-list-tile-sub-title class="text-capitalize">{{
        dark ? 'dark' : 'light'
      }}</v-list-tile-sub-title>
    </v-list-tile-content>
  </v-list-tile>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import moduleTheme from '@/store/modules/theme'

@Component
export default class TheDrawerSettingsTheme extends Vue {
  get dark() {
    return moduleTheme.dark
  }

  public changeTheme() {
    const dark = !this.dark
    moduleTheme.CHANGE_THEME(dark)
  }
}
</script>
