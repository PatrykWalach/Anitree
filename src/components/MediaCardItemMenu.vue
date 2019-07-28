<template>
  <component
    :is="!$vuetify.breakpoint.xsOnly ? 'v-menu' : 'v-bottom-sheet'"
    v-model="menu"
    :offset-y="desktop"
  >
    <template v-slot:activator="{ on, value }">
      <v-fab-transition>
        <v-btn
          v-show="hover || value || $vuetify.breakpoint.xsOnly"
          :style="{ top: 0, right: 0 }"
          absolute
          icon
          small
          v-on="on"
        >
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-fab-transition>
    </template>

    <v-list :shaped="desktop" :dense="desktop">
      <v-list-item
        rel="noopener"
        target="_blank"
        :href="url"
        @click="menu = false"
      >
        <v-list-item-icon>
          <v-icon>info</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Anilist</v-list-item-title>
      </v-list-item>

      <v-list-item
        @click="
          ;(navigator.share || desktopShare)({
            url: url,
            title: media.title[preferedTitle]
          }).then(() => (menu = false))
        "
      >
        <v-list-item-icon>
          <v-icon>share</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Share</v-list-item-title>
      </v-list-item>

      <v-list-item v-if="!isEdited && authorized" @click="edit">
        <v-list-item-icon>
          <v-icon>edit</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Edit</v-list-item-title>
      </v-list-item>
    </v-list>
  </component>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Media, ShareOptions } from '../types'
import auth from '../store/modules/auth'
import edit from '../store/modules/edit'

import title from '../store/modules/title'
import share from '../store/modules/share'

@Component
export default class MediaCardItemMenu extends Vue {
  @Prop()
  readonly hover!: boolean

  @Prop()
  readonly media!: Media

  menu = false
  navigator = navigator

  // share: (options: ShareOptions) => Promise<any> =
  //   (navigator as any).share || this.desktopShare
  // (navigator.share &&
  //   navigator
  //     .share({
  //       url: this.url,
  //       title: this.media.title[this.preferedTitle]
  //     })
  //     .then(() => (this.menu = false))) ||
  // this.desktopShare

  async desktopShare(options: ShareOptions) {
    await share.CHANGE_OPTIONS(options)
    share.CHANGE_IS_SHARED(true)
  }

  get preferedTitle() {
    return title.preferedTitle
  }

  get url() {
    return this.media.siteUrl
  }

  get authorized() {
    return auth.authorized
  }

  get desktop() {
    return !this.$vuetify.breakpoint.xsOnly ? true : undefined
  }

  get isEdited() {
    return edit.isEdited
  }

  edit() {
    this.menu = false
    edit.open(this.media.id)
  }
}
</script>
