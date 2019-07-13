<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on, value }">
      <v-fab-transition>
        <v-btn
          v-show="hover || value || $vuetify.breakpoint.xsOnly"
          :style="{ top: 0, right: 0 }"
          absolute
          icon
          large
          v-on="on"
        >
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-fab-transition>
    </template>

    <v-list dense shaped>
      <v-list-item rel="noopener" target="_blank" :href="media.siteUrl">
        <v-list-item-icon>
          <v-icon>info</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Anilist</v-list-item-title>
      </v-list-item>

      <v-list-item v-clipboard="media.siteUrl" @click>
        <v-list-item-icon>
          <v-icon>link</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Copy link</v-list-item-title>
      </v-list-item>

      <v-list-item v-if="!isEdited && authorized" @click="edit">
        <v-list-item-icon>
          <v-icon>edit</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Edit</v-list-item-title>
      </v-list-item>

      <v-list-item v-if="isEdited" @click="close">
        <v-list-item-icon>
          <v-icon>close</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Close</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Media } from '../types'
import auth from '../store/modules/auth'
import edit from '../store/modules/edit'
import { clipboard } from 'vue-clipboards'

@Component({
  directives: {
    clipboard
  }
})
export default class MediaCardItemMenu extends Vue {
  @Prop()
  readonly hover!: boolean

  @Prop()
  readonly media!: Media

  get authorized() {
    return auth.authorized
  }

  get isEdited() {
    return edit.isEdited
  }

  edit() {
    edit.open(this.media.id)
  }

  close() {
    edit.CHANGE_IS_EDITED(false)
  }
}
</script>
