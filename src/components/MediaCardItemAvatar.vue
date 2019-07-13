<template>
  <v-list-item-avatar size="80" :style="{ 'align-self': 'center' }">
    <base-lazy-img
      :src="media.coverImage.extraLarge"
      :lazy-src="media.coverImage.small"
      :srcset="srcset"
    ></base-lazy-img>
  </v-list-item-avatar>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator'
import { Media } from '../types'

import BaseLazyImg from './BaseLazyImg.vue'

@Component({
  components: {
    BaseLazyImg
  }
})
export default class MediaCardItem extends Vue {
  @Prop({ required: true })
  readonly media!: Media

  get srcset() {
    const { extraLarge, large, medium } = this.media.coverImage
    return `${medium} 1x,
    ${large} 2x,
     ${extraLarge} 3x`

    // return `${medium} 0.5x,
    // ${large} 1x,
    //  ${extraLarge} 1.5x`
    // return [...new Set([medium, large, extraLarge])]
    //  .map((url, i) => [url, i + 1])
    //  .filter(([url]) => url)
    //  .map(([url, i]) => `${url} ${i}x`)
    //  .join(', ')
  }
}
</script>
