<template>
  <base-lazy-img
    v-if="banner"
    :src="media.bannerImage"
    v-bind="{ ...$attrs }"
    min-width="100%"
    :aspect-ratio="500 / 150"
  >
    <slot></slot>
  </base-lazy-img>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator'
import { Media } from '../types'

const BaseLazyImg = () => import('./BaseLazyImg.vue')
@Component({
  components: {
    BaseLazyImg
  }
})
export default class MediaCardImg extends Vue {
  @Prop({ required: true })
  readonly media!: Media

  get banner() {
    return this.media.bannerImage && !this.$vuetify.breakpoint.smAndDown
  }
}
</script>
