<template>
  <v-list-item @click>
    <v-list-item-action>
      <v-switch :input-value="dark" @change="changeTheme"></v-switch>
    </v-list-item-action>

    <v-list-item-content @click="changeTheme">
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
  dark: boolean = localStorage.getItem('THEME') === 'true'

  created() {
    this.changeTheme(this.dark)
  }

  changeTheme(dark: boolean = !this.dark) {
    this.$vuetify.theme.dark = dark
    localStorage.setItem('THEME', dark.toString())
  }
}
</script>
