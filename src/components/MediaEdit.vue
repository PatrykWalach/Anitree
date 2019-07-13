<template>
  <v-dialog :value="isEdited" max-width="1080px" @update:returnValue="close">
    <v-card :loading="loading">
      <media-card-banner :media="media">
        <MediaEditOverlay v-if="authorized" :media="media" />
      </media-card-banner>
      <MediaCardItem :media="media" />

      <v-divider></v-divider>
      <MediaEditForm v-if="authorized" :media="media" :user="user" />
      <v-card-text v-else>
        <v-subheader>
          Please log in:
        </v-subheader>
        <TheDrawerSettingsLogin />
      </v-card-text>
      <MediaEditActions />
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

import MediaCardBanner from './MediaCardBanner.vue'
import MediaCardItem from './MediaCardItem.vue'
import edit from '../store/modules/edit'
import MediaEditForm from './MediaEditForm.vue'
import MediaEditActions from './MediaEditActions.vue'
import auth from '../store/modules/auth'
import { Media } from '../types'

const TheDrawerSettingsLogin = () => import('./TheDrawerSettingsLogin.vue')
const MediaEditIcon = () => import('./MediaEditIcon.vue')
const MediaEditOverlay = () => import('./MediaEditOverlay.vue')

@Component({
  components: {
    MediaCardBanner,
    MediaCardItem,
    MediaEditOverlay,
    MediaEditIcon,
    MediaEditForm,
    MediaEditActions,
    TheDrawerSettingsLogin
  }
})
export default class MediaEdit extends Vue {
  get isEdited() {
    return edit.isEdited
  }
  get loading() {
    return edit.loading
  }

  close() {
    return edit.CHANGE_IS_EDITED(false)
  }

  @Prop()
  media!: Media

  get user() {
    return auth.user
  }

  get authorized() {
    return auth.authorized
  }

  created() {
    if (!this.user) {
      auth.CHANGE_USER()
    }
  }

  // @Watch('isEdited')
  // reset = edit.RESET_FORM
}
</script>
