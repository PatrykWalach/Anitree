<template>
  <v-dialog
    v-model="isEdited"
    scrollable
    :fullscreen="$vuetify.breakpoint.xsOnly"
    max-width="720px"
  >
    <v-card :loading="loading">
      <v-card-text class="pa-0">
        <media-card-banner :media="media">
          <v-overlay absolute></v-overlay>
        </media-card-banner>
        <media-card-item :media="media">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                :style="{ top: 0, right: 0 }"
                absolute
                icon
                small
                @click="close"
                v-on="on"
              >
                <v-icon>close</v-icon>
              </v-btn>
            </template>
            <span>Close</span>
          </v-tooltip>
        </media-card-item>
        <v-divider></v-divider>
        <MediaEditForm v-if="authorized" v-bind="{ media, user }" />
      </v-card-text>
      <v-divider></v-divider>

      <MediaEditActions v-bind="{ authorized, media }" />
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

  set isEdited(isEdited) {
    if (!isEdited) this.close()
    else edit.CHANGE_IS_EDITED(isEdited)
  }

  close() {
    edit.close()
  }

  get loading() {
    return edit.loading
  }

  @Prop()
  media!: Media

  get user() {
    return auth.user
  }

  get authorized() {
    return auth.authorized
  }
}
</script>
