<template>
  <router-link
    :style="{ 'text-decoration': 'unset', color: 'unset' }"
    :to="{
      name: 'media',
      params: {
        mediaId: media.id,
        mediaType: media.type.toLowerCase()
      }
    }"
  >
    <h6 class="title">
      {{ title }}
    </h6>
  </router-link>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator'
import { AMedia } from '../types'

import moduleTitle from '@/store/modules/title'

@Component
export default class BaseMediaTitleTitle extends Vue {
  @Prop()
  public readonly media!: AMedia

  get preferedTitle() {
    return moduleTitle.preferedTitle
  }

  get title() {
    return this.media.title[this.preferedTitle] || this.media.title.romaji
  }
}
</script>
