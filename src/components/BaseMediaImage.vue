<template>
  <v-img
    v-bind="style"
    v-lazy="changeInView"
    :lazySrc="lazySrc"
    :srcset="srcset"
    :src="src"
  >
    <template v-slot:placeholder>
      <v-layout fill-height align-center justify-center ma-0>
        <v-progress-circular indeterminate color="grey lighten-5">
        </v-progress-circular
      ></v-layout>
    </template>
  </v-img>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator'
import { AMedia } from '../types'

@Component({
  directives: {
    lazy: {
      bind(el, { value }) {
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
})
export default class BaseMediaImage extends Vue {
  @Prop()
  public readonly media!: AMedia
  public inView: boolean = false

  get style() {
    if (this.banner) {
      return { 'min-width': '100%', height: '200px' }
    }
    return { 'min-height': '100%', width: '100px' }
  }

  get src() {
    if (this.inView) {
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
    const { banner, inView } = this
    if (banner || !inView) {
      return undefined
    }
    const { extraLarge, large, medium } = this.media.coverImage
    return `${medium} 1x,
    ${large} 2x,
     ${extraLarge} 3x`
    // return [...new Set([medium, large, extraLarge])]
    //  .map((url, i) => [url, i + 1])
    //  .filter(([url]) => url)
    //  .map(([url, i]) => `${url} ${i}x`)
    //  .join(', ')
  }

  get banner() {
    return this.media.bannerImage && !this.$vuetify.breakpoint.xsOnly
  }

  public changeInView() {
    this.inView = true
  }
}
</script>
