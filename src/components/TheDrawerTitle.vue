<template>
  <v-list-item-group
    mandatory
    :value="prefered"
    @change="changePrefered"
    shaped
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

  get titles() {
    return title.titles
  }

  changePrefered(prefered: number) {
    return title.CHANGE_PREFERED(prefered)
  }
}
</script>
