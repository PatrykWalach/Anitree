<template>
  <v-list-item-subtitle
    v-if="media.description"
    class="subheading text-capitalize"
    v-html="media.description"
  >
  </v-list-item-subtitle>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator'
import { Media } from '../types'

@Component
export default class MediaCardItemDescription extends Vue {
  @Prop({ required: true })
  readonly media!: Media

  get subheading() {
    const { format, status } = this.media
    return [format, status]
      .map(this.clean)
      .filter(str => str)
      .join(' · ')
  }

  clean(str: string | null) {
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
