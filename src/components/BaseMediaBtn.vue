<template>
  <v-tooltip top>
    <template v-slot:activator="{ on }">
      <base-color
        rel="noopener"
        target="_blank"
        :href="media.siteUrl"
        fab
        small
        :color="color"
        absolute
        tag="v-btn"
        v-bind="style"
      >
        <v-icon v-on="on">link</v-icon>
      </base-color>
    </template>
    <span>Anilist</span>
  </v-tooltip>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator'
import { Media } from '../types'
import BaseColor from './BaseColor.vue'
import theme from '../store/modules/theme'

@Component({
  components: {
    BaseColor
  }
})
export default class BaseMediaBtn extends Vue {
  @Prop()
  public readonly media!: Media

  get color() {
    return this.media.coverImage.color || (theme.dark ? '#555' : '#e0e0e0')
  }
  get style() {
    if (this.banner) {
      return { top: true, right: true, style: { 'z-index': 1 } }
    }
    return {
      style: {
        top: '16px',
        right: '-20px',
        'z-index': 1
      }
    }
  }
  get banner() {
    return this.media.bannerImage && !this.$vuetify.breakpoint.smAndDown
  }
}
</script>
