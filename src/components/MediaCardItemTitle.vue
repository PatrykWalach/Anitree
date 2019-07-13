<template>
  <h6 :id="media.id" class="title">
    <v-hover>
      <template v-slot="{ hover }">
        <router-link
          class="link"
          :style="{
            '--hover': media.coverImage.color
          }"
          :to="{
            name: 'media',
            params: {
              mediaId: media.id,
              mediaType: media.type.toLowerCase()
            }
          }"
        >
          {{ title }}
        </router-link>
      </template>
    </v-hover>

    <MediaCardMenu :hover="hover" :media="media" />
  </h6>
  <!-- <v-list-item-title class="headline mb-1">
    {{ title }}
  </v-list-item-title> -->
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator'
import { Media } from '../types'

import moduleTitle from '../store/modules/title'
import MediaCardMenu from './MediaCardMenu.vue'
@Component({
  components: {
    MediaCardMenu
  }
})
export default class MediaCardItemTitle extends Vue {
  @Prop({ required: true })
  readonly media!: Media

  @Prop({ default: true })
  readonly hover!: boolean

  get preferedTitle() {
    return moduleTitle.preferedTitle
  }
  get title() {
    return this.media.title[this.preferedTitle] || this.media.title.romaji
  }
}
</script>
