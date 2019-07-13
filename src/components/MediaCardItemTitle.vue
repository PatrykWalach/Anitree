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
  </h6>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator'
import { Media } from '../types'

import title from '../store/modules/title'
@Component
export default class MediaCardItemTitle extends Vue {
  @Prop({ required: true })
  readonly media!: Media

  get preferedTitle() {
    return title.preferedTitle
  }

  get title() {
    const { media, preferedTitle } = this
    return media.title[preferedTitle] || media.title.romaji
  }
}
</script>
