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

    <v-card>
      <v-list-item v-if="$vuetify.breakpoint.xsOnly">
        <v-list-item-avatar
          color="grey darken-2"
          size="40"
          :style="{ 'align-self': 'center' }"
        >
          <base-lazy-img
            :src="media.coverImage.extraLarge"
            :lazy-src="media.coverImage.medium"
          ></base-lazy-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <MediaCardItemSeason :media="media" />
          <v-list-item-title>{{ media.title.romaji }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>

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

        <v-list-item @click="share">
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
    </v-card>
  </component>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Media, ShareData, NewNavigator } from '../types'
import auth from '../store/modules/auth'
import edit from '../store/modules/edit'

import title from '../store/modules/title'
import share from '../store/modules/share'
import BaseLazyImg from './BaseLazyImg.vue'
import MediaCardItemSeason from './MediaCardItemSeason.vue'

@Component({
  components: {
    BaseLazyImg,
    MediaCardItemSeason
  }
})
export default class MediaCardItemMenu extends Vue {
  @Prop()
  readonly hover!: boolean

  @Prop()
  readonly media!: Media

  menu = false

  share() {
    const { desktopShare, url, title } = this

    const share = (navigator as NewNavigator).share || desktopShare

    share
      .call(navigator, {
        url,
        title
      })
      .then(() => (this.menu = false))
  }

  get title() {
    const { media, preferedTitle } = this
    return media.title[preferedTitle]
  }

  async desktopShare(data: ShareData) {
    await share.CHANGE_OPTIONS(data)
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
