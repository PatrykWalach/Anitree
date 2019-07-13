<template>
  <v-dialog :value="isEdited" max-width="1080px" @update:returnValue="close">
    <v-card outlined :loading="loading">
      <media-card-banner :media="media">
        <v-overlay></v-overlay>
      </media-card-banner>

         

      <MediaCardItem :media="media" />

      <v-divider></v-divider>
      
      <!-- <MediaEditOverlay v-if="authorized" :media="media" /> -->
      <MediaEditForm v-if="authorized"  v-bind="{media,user}"/>
      <v-card-text v-else>
        <v-subheader>
          Please log in:
        </v-subheader>
        <TheDrawerSettingsLogin />
      </v-card-text>
          
      <MediaEditActions  v-bind="{media,authorized}"/>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

import MediaCardBanner from './MediaCardBanner.vue'
import MediaCardItem from './MediaCardItem.vue'
import edit from '../store/modules/edit'
import MediaEditActions from './MediaEditActions.vue'
import auth from '../store/modules/auth'
import { Media } from '../types'

const TheDrawerSettingsLogin = () => import('./TheDrawerSettingsLogin.vue')
const MediaEditForm = () => import('./MediaEditForm.vue')


@Component({
  components: {
    MediaCardBanner,
    MediaCardItem,
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
