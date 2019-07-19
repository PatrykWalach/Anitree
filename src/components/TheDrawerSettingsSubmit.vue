<template>
  <v-list-item @click>
    <v-list-item-action>
      <v-switch v-model="auto"></v-switch>
    </v-list-item-action>

    <v-list-item-content @click="auto = !auto">
      <v-list-item-title>Autosave</v-list-item-title>
      <v-list-item-subtitle>{{
        auto ? 'Changes are autosaved' : 'Changes are not autosaved'
      }}</v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import submit from '../store/modules/submit'

@Component
export default class TheDrawerSettingsSubmit extends Vue {
  get auto() {
    return submit.auto
  }

  set auto(auto) {
    submit.CHANGE_AUTO(auto)
  }
}
</script>
