<template>
  <v-img
    v-lazy="changeInView"
    :lazy-src="lazySrc"
    v-bind="{ ...$attrs, srcset, src }"
    :min-width="banner ? '100%' : '100px'"
    max-height="240px"
    min-height="160px"
    :style="{ flex: 2 }"
  >
    <slot :banner="banner"></slot>
  </v-img>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator'
import { Media } from '../types'
@Component({
  directives: {
    lazy: {
      bind(el, { value }) {
        if (value) {
          new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                value(event)
                observer.disconnect()
              }
            })
          }).observe(el)
        }
      }
    }
  }
})
export default class MediaCardImg extends Vue {
  @Prop({ required: true })
  public readonly media!: Media

  @Prop({ default: true })
  public readonly lazy!: boolean

  public inView: boolean = false

  get src() {
    const { inView, lazy } = this
    if (inView || !lazy) {
      const { media, banner } = this
      if (banner) {
        return media.bannerImage
      }
      return media.coverImage.extraLarge
    } else {
      return ''
    }
  }

  get lazySrc() {
    if (this.banner) {
      return undefined
    }
    return this.media.coverImage.medium
  }

  get srcset() {
    const { banner, inView, lazy } = this
    if (banner || (!inView && lazy)) {
      return undefined
    }
    const { extraLarge, large, medium } = this.media.coverImage
    return `${medium} 0.5x,
    ${large} 1x,
     ${extraLarge} 1.5x`
    // return [...new Set([medium, large, extraLarge])]
    //  .map((url, i) => [url, i + 1])
    //  .filter(([url]) => url)
    //  .map(([url, i]) => `${url} ${i}x`)
    //  .join(', ')
  }

  get banner() {
    return this.media.bannerImage && !this.$vuetify.breakpoint.smAndDown
  }

  public async changeInView() {
    this.inView = true
  }
}
</script>
