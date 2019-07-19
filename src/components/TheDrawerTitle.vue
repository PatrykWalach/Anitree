<template>
  <v-list-item-group v-model="prefered" 
  mandatory
  >
    <v-subheader>Title Language</v-subheader>
    <v-list-item v-for="title in titles" :key="title" dense>
      <v-list-item-content>
        <v-list-item-title class="text-capitalize">{{
          title
        }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list-item-group>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import title from '../store/modules/title'

@Component
export default class TheDrawerTitle extends Vue {
  get prefered() {
    return title.prefered
  }
  set prefered(prefered) {
    title.CHANGE_PREFERED(prefered)
  }

  get titles() {
    return title.titles
  }
}
</script>
