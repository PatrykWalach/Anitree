<template>
  <div class="overline"   v-if="media.season || media.seasonInt">
    <router-link
      :to="{
        name: 'search',
        query
      }"
      class="link"
      :style="{
        '--hover': media.coverImage.color
      }"
    >
      {{ link }}
    </router-link>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator'
import { Media } from '../types'

@Component
export default class MediaCardItemSeason extends Vue {
  @Prop({ required: true })
  readonly media!: Media

  get year() {
    const { seasonInt } = this.media
    if (seasonInt) {
      const year = Math.floor(seasonInt / 10)
      return year > 50 ? 1900 + year : 2000 + year
    }
    return undefined
  }

  get season() {
    return this.media.season || undefined
  }

  get link() {
    const { season, year } = this
    return [season && season.toLowerCase(), year].filter(e => e).join(' ')
  }

  get query() {
    const { year, season } = this
    return { year, season }
  }
}
</script>
