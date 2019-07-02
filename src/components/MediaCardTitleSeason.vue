<template>
  <div class="body-2 text-capitalize">
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
export default class MediaCardTitleSeason extends Vue {
  @Prop({ required: true })
  public readonly media!: Media

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
  //   get subheading() {
  //     const { format, status } = this.media
  //     return [format, status]
  //       .map(this.clean)
  //       .filter(str => str)
  //       .join(' · ')
  //   }

  //   public clean(str: string | null) {
  //     return (
  //       (str &&
  //         str
  //           .split(/_/g)
  //           .map(str => {
  //             if (str !== 'TV' && str !== 'OVA' && str !== 'ONA')
  //               return str.toLowerCase()
  //             return str
  //           })
  //           .join(' ')) ||
  //       ''
  //     )
  //   }

  //   get color() {
  //     switch (this.media.status) {
  //       case 'RELEASING':
  //         return `info--text`
  //       case 'CANCELLED':
  //         return `error--text`
  //       case 'NOT_YET_RELEASED':
  //         return `warning--text`
  //       case 'FINISHED':
  //         return `success--text`
  //       default:
  //         return ''
  //     }
  //   }
}
</script>
