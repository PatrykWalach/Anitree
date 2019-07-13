<template>
  <v-card-actions>
    <div class="caption">
      {{ caption }}
    </div>
    <v-spacer></v-spacer>
    <v-btn color="error" text @click="remove">Delete</v-btn>
    <v-btn color="primary" text @click="submit">Save</v-btn>
  </v-card-actions>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import MediaEditIcon from './MediaEditIcon.vue'
import edit from '../store/modules/edit'
import submit from '../store/modules/submit'

@Component({
  components: {
    MediaEditIcon
  }
})
export default class MediaEditActions extends Vue {
  
  async submit() {
    await edit.submit()
    edit.CHANGE_IS_EDITED(false)
  }

  async remove() {
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
