<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-progress-linear
        v-if="media.mediaListEntry"
        :color="color"
        :value="progressValue"
        v-bind="attrs"
        v-on="on"
      ></v-progress-linear>
    </template>
    <span>{{ tip }}</span>
  </v-tooltip>
</template>

<script lang="ts">
import { computed, createComponent } from '@vue/composition-api'
import { Media } from '@/graphql/schema/media'

export interface Props {
  media: Media
}
export default createComponent<Readonly<Props>>({
  props: {
    media: { default: null, required: true, type: Object },
  },
  setup(props) {
    const manga = computed(() => props.media.type === 'MANGA')

    const status = computed(
      () => props.media.mediaListEntry && props.media.mediaListEntry.status,
    )

    const progress = computed(
      () =>
        (props.media.mediaListEntry && props.media.mediaListEntry.progress) ||
        0,
    )

    const episodes = computed(() => {
      const { episodes, chapters } = props.media
      return manga.value ? chapters : episodes
    })

    const progressValue = computed((): number => {
      switch (status.value) {
        case 'COMPLETED':
          return 100
        case 'PLANNING':
          return 100
        case 'DROPPED':
          return 100
        default: {
          if (episodes.value) return (progress.value / episodes.value) * 100
          return 50
        }
      }
    })

    const stringValue = computed(
      () => progress.value + '/' + (episodes.value || ''),
    )

    const tipObject = computed(() => {
      switch (status.value) {
        case 'CURRENT':
          return {
            manga: 'Reading',
            text: 'Watching',
          }
        case 'PLANNING':
          return { manga: 'Plan to read', text: 'Plan to watch' }
        case 'COMPLETED':
          return { text: 'Completed' }
        case 'REPEATING':
          return {
            manga: 'Rereading',
            text: 'Rewatching',
          }
        case 'PAUSED':
          return {
            text: 'Paused',
          }
        case 'DROPPED':
          return { text: 'Dropped' }
        default:
          return ''
      }
    })

    const tipString = computed(
      () =>
        (tipObject.value &&
          ((manga.value && tipObject.value.manga) || tipObject.value.text)) ||
        '',
    )

    const tip = computed(() => {
      switch (status.value) {
        case 'COMPLETED':
          return tipString.value
        case 'PLANNING':
          return tipString.value
        case 'DROPPED':
          return tipString.value
        default:
          return tipString.value + ' ' + stringValue.value
      }
    })

    const color = computed(() => {
      switch (status.value) {
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
    })

    return {
      color,
      episodes,
      manga,
      progress,
      progressValue,
      status,
      stringValue,
      tip,
      tipObject,
      tipString,
    }
  },
})
</script>
