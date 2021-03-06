<template>
  <VTooltip bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-progress-linear
        v-if="media.mediaListEntry"
        :color="color"
        :value="progressValue"
        v-bind="attrs"
        v-on="on"
      />
    </template>
    <span>{{ tip }}</span>
  </VTooltip>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'

import { MediaCardStatus_media } from './__generated__/MediaCardStatus_media'

import gql from 'graphql-tag'

export const MediaCardStatusFragments = {
  media: gql`
    fragment MediaCardStatus_media on Media {
      id
      type
      episodes
      chapters
      mediaListEntry {
        id
        status
        progress
      }
    }
  `,
}

export interface Props {
  media: MediaCardStatus_media
}

export default defineComponent<Readonly<Props>>({
  props: {
    media: { default: null, required: true, type: Object },
  },
  setup(props) {
    const manga = computed(() => props.media.type === 'MANGA')

    const status = computed(() => props.media.mediaListEntry?.status)

    const progress = computed(() => props.media.mediaListEntry?.progress || 0)

    const episodes = computed(() => {
      const { episodes, chapters } = props.media
      return manga.value ? chapters : episodes
    })

    const progressValue = computed((): number => {
      switch (status.value) {
        case 'COMPLETED':
        case 'PLANNING':
        case 'DROPPED':
          return 100
        default: {
          const episodesValue = episodes.value
          if (episodesValue) {
            return (progress.value / episodesValue) * 100
          }
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
          return { text: '' }
      }
    })

    const tipString = computed(() => {
      const tipObjectValue = tipObject.value

      return (manga.value && tipObjectValue.manga) || tipObjectValue.text
    })

    const tip = computed(() => {
      const tipStringValue = tipString.value

      switch (status.value) {
        case 'COMPLETED':
        case 'PLANNING':
        case 'DROPPED':
          return tipStringValue
        default:
          return tipStringValue + ' ' + stringValue.value
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
