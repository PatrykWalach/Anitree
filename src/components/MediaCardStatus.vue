<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <v-toolbar
        :style="{ height: '3px' }"
        :class="color"
        v-on="on"
      ></v-toolbar>
    </template>
    <span>{{ status }}</span>
  </v-tooltip>
</template>
<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator'
import { Media } from '../types'

@Component
export default class MediaCardStatus extends Vue {
  @Prop({ required: true })
  public readonly media!: Media

  get status() {
    const { mediaListEntry } = this.media
    return mediaListEntry && mediaListEntry.status
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
