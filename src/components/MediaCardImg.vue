<template>
  <div class="v-card__img">
    <router-link
      :style="{ 'text-decoration': 'unset' }"
      :to="{
        name: 'media',
        params: {
          mediaId: media.id,
          mediaType: media.type.toLowerCase()
        }
      }"
    >
      <v-img
        v-lazy="changeInView"
        v-bind="style"
        :lazy-src="lazySrc"
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
    </router-link>

    <MediaCardImgBtn :media="media" />
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator'
import { Media } from '../types'
import MediaCardImgBtn from './MediaCardImgBtn.vue'
@Component({
  components: {
    MediaCardImgBtn
  },
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
export default class MediaCardImg extends Vue {
  @Prop({ required: true })
  public readonly media!: Media
  public inView: boolean = false

  get style() {
    if (this.banner) {
      return {
        width: '100%',
        style: {
          'border-radius': '2px 2px 0 0'
        }
      }
    }
    return {
      height: '100%',
      style: {
        'border-radius': '2px 0 0' + this.media.mediaListEntry ? '' : ' 2px'
      }
    }
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
<style lang="stylus" scoped>
.v-card__img {
  position: relative;
  grid-area: img;
}
</style>
