<template>
  <h6 class="title">
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
  </h6>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator'
import { Media } from '../types'

import moduleTitle from '../store/modules/title'

@Component
export default class MediaCardTitleTitle extends Vue {
  @Prop({ required: true })
  public readonly media!: Media

  get preferedTitle() {
    return moduleTitle.preferedTitle
  }

  get title() {
    return this.media.title[this.preferedTitle] || this.media.title.romaji
  }
}
</script>
