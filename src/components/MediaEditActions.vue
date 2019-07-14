<template>
  <v-card-actions>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-icon v-on="on">
          {{ autoSubmit ? 'sync' : 'sync_disabled' }}
        </v-icon>
      </template>
      <span>{{ caption }}</span>
    </v-tooltip>

    <v-spacer></v-spacer>
    <v-dialog v-model="confirmation" max-width="360">
      <template v-slot:activator="{ on }">
        <v-btn v-if="authorized" color="error" text v-on="on">Delete</v-btn>
      </template>
      <v-card>
        <v-card-title>Warning</v-card-title>
        <v-card-text
          >Are you sure you want to delete this list entry?</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="confirmation = false">Cancel</v-btn>
          <v-btn :color="media.coverImage.color" @click="remove">Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-btn :color="media.coverImage.color" @click="submit">Save</v-btn>
  </v-card-actions>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import MediaEditIcon from './MediaEditIcon.vue'
import edit from '../store/modules/edit'
import submit from '../store/modules/submit'

@Component({
  components: {
    MediaEditIcon
  }
})
export default class MediaEditActions extends Vue {
  @Prop()
  readonly authorized!: boolean

  @Prop()
  readonly media!: boolean

  confirmation: boolean = false
  async submit() {
    await edit.submit()
    edit.CHANGE_IS_EDITED(false)
  }

  async remove() {
    this.confirmation = false
    await edit.remove()
    edit.CHANGE_IS_EDITED(false)
  }

  get caption() {
    return 'autoupdates are ' + (this.autoSubmit ? 'enabled' : 'disabled')
  }

  get autoSubmit() {
    return submit.auto
  }
}
</script>
