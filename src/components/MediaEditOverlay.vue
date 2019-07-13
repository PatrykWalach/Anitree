<template>
  <v-layout>
    <!-- <media-edit-icon :value="media.isFavourite">
          <template v-slot:alt>
            favorite
          </template>
          favorite_border
        </media-edit-icon> -->
    <media-edit-icon
      :value="form.private !== undefined ? form.private : private"
      @change="changePrivate"
    >
      <template v-slot:alt>
        visibility
      </template>
      visibility_off
    </media-edit-icon>
  </v-layout>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

import { Media } from '../types'
import edit from '../store/modules/edit'

const MediaEditIcon = () => import('./MediaEditIcon.vue')

@Component({
  components: {
    MediaEditIcon
  }
})
export default class MediaEditOverlay extends Vue {
  changePrivate(value: boolean) {
    edit.changeForm({ private: value })
  }

  @Prop()
  media!: Media

  get form() {
    return edit.form
  }

  get private() {
    return (
      (this.media.mediaListEntry && this.media.mediaListEntry.private) || false
    )
  }
  //    submit() {
  //     this.close()
  //   }
  //    close() {
  //     edit.CHANGE_IS_EDITED(false)
  //   }

  //   loading: boolean = false

  //   get user() {
  //     return auth.user
  //   }

  //   created() {
  //     if (!this.user) {
  //       this.loading = true
  //       auth.CHANGE_USER().then(() => (this.loading = false))
  //     }
  //   }

  //   @Watch('isEdited')
  //   reset = edit.RESET_FORM
}
</script>
