<template>
  <div class="subheading text-capitalize grey--text">
    {{ subheading }}
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator'
import { Media } from '../types'

@Component
export default class MediaCardTitleSubheading extends Vue {
  @Prop({ required: true })
  public readonly media!: Media

  get subheading() {
    const { format, status } = this.media
    return [format, status]
      .map(this.clean)
      .filter(str => str)
      .join(' · ')
  }

  public clean(str: string | null) {
    return (
      (str &&
        str
          .split(/_/g)
          .map(str => {
            if (str !== 'TV' && str !== 'OVA' && str !== 'ONA')
              return str.toLowerCase()
            return str
          })
          .join(' ')) ||
      ''
    )
  }
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
