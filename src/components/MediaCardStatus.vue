<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <v-progress-linear
        v-if="media.mediaListEntry"
        :color="color"
        :value="value"
        v-on="on"
      ></v-progress-linear>
    </template>
    <span>{{ (tip && (manga ? tip.manga : tip.text)) || '' }}</span>
  </v-tooltip>
</template>
<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator'
import { Media } from '../types'

@Component
export default class MediaCardStatus extends Vue {
  @Prop({ required: true })
  readonly media!: Media

  get manga() {
    return this.media.type === 'MANGA'
  }

  get status() {
    const { mediaListEntry } = this.media
    return mediaListEntry && mediaListEntry.status
  }

  get progress() {
    return (
      (this.media.mediaListEntry && this.media.mediaListEntry.progress) || 0
    )
  }

  get episodes() {
    const { media, manga } = this
    const { episodes, chapters } = media
    return manga ? chapters : episodes
  }

  get value() {
    const { episodes, progress } = this
    return (episodes && (progress / episodes) * 100) || (progress ? 50 : 100)
  }

  get stringValue() {
    const { episodes, progress } = this
    return progress + '/' + (episodes || '')
  }

  get tip() {
    const { stringValue } = this
    return [
      {
        manga: 'Reading ' + stringValue,
        text: 'Watching ' + stringValue,
        value: 'CURRENT'
      },
      { manga: 'Plan to read', text: 'Plan to watch', value: 'PLANNING' },
      { manga: 'Completed', text: 'Completed', value: 'COMPLETED' },
      { manga: 'Rereading', text: 'Rewatching', value: 'REPEATING' },
      { manga: 'Paused', text: 'Paused', value: 'PAUSED' },
      { manga: 'Dropped', text: 'Dropped', value: 'DROPPED' }
    ].find(({ value }) => value === this.status)
  }

  get color() {
    switch (this.status) {
      case 'CURRENT':
        return 'info'
      case 'PLANNING':
        return 'warning'
      case 'COMPLETED':
        return 'success'
      case 'DROPPED':
        return 'error'
      case 'PAUSED':
        return 'red lighten-3'
      case 'REPEATING':
        return 'info'
      default:
        return ''
    }
  }
}
</script>
<style lang="scss" scoped>
.v-card__status {
  height: 3px;
}
</style>
