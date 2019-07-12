<template>
  <v-card-actions>
    <v-spacer></v-spacer>
    <v-btn color="blue darken-1" text @click="close">Close</v-btn>
    <v-btn color="blue darken-1" text @click="submit">Save</v-btn>
  </v-card-actions>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

import edit from '../store/modules/edit'

@Component
export default class MediaEditActions extends Vue {
  public async submit() {
    await edit.submit()
    this.close()
  }
  public close() {
    edit.CHANGE_IS_EDITED(false)
    edit.RESET_FORM()
  }
}
</script>
