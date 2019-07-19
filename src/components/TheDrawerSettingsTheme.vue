<template>
  <v-list-item @click>
    <v-list-item-action>
      <v-switch v-model="dark"></v-switch>
    </v-list-item-action>

    <v-list-item-content @click="dark = !dark">
      <v-list-item-title class="text-capitalize">theme</v-list-item-title>
      <v-list-item-subtitle class="text-capitalize">{{
        dark ? 'dark' : 'light'
      }}</v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class TheDrawerSettingsTheme extends Vue {
  created() {
    this.$vuetify.theme.dark = localStorage.getItem('THEME') === 'true'
  }

  get dark() {
    return this.$vuetify.theme.dark
  }

  set dark(dark) {
    this.$vuetify.theme.dark = dark
    localStorage.setItem('THEME', dark.toString())
  }
}
</script>
