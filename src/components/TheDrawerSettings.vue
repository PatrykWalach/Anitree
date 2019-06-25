<template>
  <v-list two-line subheader>
    <v-subheader>Settings</v-subheader>

    <TheDrawerSettingsTheme/>

    <TheDrawerSettingsTitle/>
  </v-list>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import TheDrawerSettingsTheme from './TheDrawerSettingsTheme.vue'
import TheDrawerSettingsTitle from './TheDrawerSettingsTitle.vue'

@Component({
  components: {
    TheDrawerSettingsTheme,
    TheDrawerSettingsTitle
  }
})
export default class TheDrawerSettings extends Vue {}
</script>