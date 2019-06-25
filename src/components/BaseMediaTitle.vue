<template>
  <v-card-title
    :style="{
      flex: 2,
      'max-width': '100%' /*banner ? '100%' : '66%'*/,
      'align-items': 'stretch'
    }"
  >
    <div
      :style="{
        'max-width': '100%',
        display: 'flex',
        'flex-direction': 'column'
      }"
    >
      <router-link
        tag="h6"
        class="title"
        :style="{
          cursor: 'pointer'
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

      <div class="grey--text subheading">
        {{ media.format }}
      </div>

      <div :class="color">
        {{ media.status }}
      </div>

      <BaseMediaTitleDescription :media="media" />
      <BaseMediaTitleTags :media="media" />
    </div>
  </v-card-title>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator'
import { AMedia } from '../types'
import BaseMediaTitleTags from './BaseMediaTitleTags.vue'
import BaseMediaTitleDescription from './BaseMediaTitleDescription.vue'
import moduleTitle from '@/store/modules/title'

@Component({
  components: {
    BaseMediaTitleTags,
    BaseMediaTitleDescription
  }
})
export default class BaseMediaTitle extends Vue {
  @Prop()
  public readonly media!: AMedia

  get preferedTitle() {
    return moduleTitle.preferedTitle
  }

  get title() {
    return this.media.title[this.preferedTitle] || this.media.title.romaji
  }

  get color() {
    switch (this.media.status) {
      case 'RELEASING':
        return `info--text`
      case 'CANCELLED':
        return `error--text`
      case 'NOT_YET_RELEASED':
        return `warning--text`
      case 'FINISHED':
        return `success--text`
      default:
        return ''
    }
  }

  get banner() {
    return this.media.bannerImage && !this.$vuetify.breakpoint.xsOnly
  }
}
</script>
