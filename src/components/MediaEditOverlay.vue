<template>
  <v-layout>
    <!-- <media-edit-icon :value="media.isFavourite">
          <template v-slot:alt>
            favorite
          </template>
          favorite_border
        </media-edit-icon> -->
    <media-edit-icon v-model="private">
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
  @Prop()
  media!: Media

  get form() {
    return edit.form
  }

  get private() {
    const { form, media } = this
    return form.private !== undefined
      ? form.private
      : (media.mediaListEntry && media.mediaListEntry.private) || false
  }

  set private(value) {
    edit.changeForm({ private: value })
  }
}
</script>
