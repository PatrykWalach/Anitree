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
    const { chapters, media, clean } = this
    const { format, status } = media

    return [...[format, status].map(clean), chapters]
      .filter(str => str)
      .join(' · ')
  }

  get chapters() {
    const { chapters, episodes, type } = this.media

    return (
      ((chapters || episodes) &&
        (type === 'MANGA' ? chapters + ' Chapters' : episodes + ' Episodes')) ||
      null
    )
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
