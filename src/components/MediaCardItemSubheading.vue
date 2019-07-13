<template>
  <v-list-item-title class="text-capitalize">
    {{ subheading }}
  </v-list-item-title>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator'
import { Media } from '../types'

@Component
export default class MediaCardItemSubheading extends Vue {
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
}
</script>
