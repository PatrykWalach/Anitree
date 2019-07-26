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
    <span>{{ tip }}</span>
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
    const { mediaListEntry } = this.media
    return (mediaListEntry && mediaListEntry.progress) || 0
  }

  get episodes() {
    const { media, manga } = this
    const { episodes, chapters } = media
    return manga ? chapters : episodes
  }

  get value(): number {
    const { status } = this

    switch (status) {
      case 'COMPLETED':
        return 100
      case 'PLANNING':
        return 100
      case 'DROPPED':
        return 100
      default: {
        const { episodes, progress } = this
        return (episodes && (progress / episodes) * 100) || 50
      }
    }
  }

  get stringValue() {
    const { episodes, progress } = this
    return progress + '/' + (episodes || '')
  }

  get tip() {
    const { status, tipString, stringValue } = this

    switch (status) {
      case 'COMPLETED':
        return tipString
      case 'PLANNING':
        return tipString
      case 'DROPPED':
        return tipString
      default:
        return tipString + ' ' + stringValue
    }
  }

  get tipString() {
    const { tipObject, manga } = this
    return (tipObject && ((manga && tipObject.manga) || tipObject.text)) || ''
  }

  get tipObject() {
    switch (this.status) {
      case 'CURRENT':
        return {
          manga: 'Reading',
          text: 'Watching'
        }
      case 'PLANNING':
        return { manga: 'Plan to read', text: 'Plan to watch' }
      case 'COMPLETED':
        return { text: 'Completed' }
      case 'REPEATING':
        return {
          manga: 'Rereading',
          text: 'Rewatching'
        }
      case 'PAUSED':
        return {
          text: 'Paused'
        }
      case 'DROPPED':
        return { text: 'Dropped' }
      default:
        return ''
    }
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
