<template>
  <v-dialog persistent :value="isEdited" max-width="1080px">
    <v-card>
      <div :style="{ display: 'flex', 'flex-wrap': 'wrap' }">
        <media-card-img :lazy="false" :media="media">
          <MediaEditOverlay v-if="!loading" :media="media" />
        </media-card-img>
        <MediaCardItem :media="media" />
      </div>
      <v-divider></v-divider>
      <MediaEditForm v-if="!loading" :media="media" :user="user" />
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

import MediaCardImg from './MediaCardImg.vue'
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
    MediaCardImg,
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

  @Prop()
  media!: Media

  loading: boolean = false

  get user() {
    return auth.user
  }

  created() {
    if (!this.user) {
      this.loading = true
      auth.CHANGE_USER().then(() => (this.loading = false))
    }
  }

  // @Watch('isEdited')
  // reset = edit.RESET_FORM
}
</script>
