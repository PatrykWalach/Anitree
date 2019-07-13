<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <v-toolbar v-if="media.mediaListEntry" :class="'v-card__status ' + color" v-on="on"></v-toolbar>
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

  get tip() {
    return [
      { manga: 'Reading', text: 'Watching', value: 'CURRENT' },
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
