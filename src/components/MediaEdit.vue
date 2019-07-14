<template>
  <v-dialog
    scrollable
    :value="isEdited"
    max-width="720px"
    @update:returnValue="close"
  >
    <v-card outlined :loading="loading">
      <!-- <v-btn fab text absolute>
        <v-icon>close</v-icon>
      </v-btn> -->

      <v-card-text class="pa-0">
        <media-card-banner :media="media">
          <v-overlay absolute></v-overlay>
        </media-card-banner>
        <!-- <v-card-title> -->
        <MediaCardItem :media="media" />
        <!-- </v-card-title> -->
        <!-- <v-divider></v-divider> -->

        <MediaEditForm v-if="authorized" v-bind="{ media, user }" />
      </v-card-text>

      <!-- <v-card-text v-else>
        <v-subheader>
          Please log in:
        </v-subheader>
        <TheDrawerSettingsLogin />
      </v-card-text> -->

      <MediaEditActions v-bind="{ authorized }" />
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
  tab = 'tab1'

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
      auth.fetchUser()
    }
  }

  // @Watch('isEdited')
  // reset = edit.RESET_FORM
}
</script>
