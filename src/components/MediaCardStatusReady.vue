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
import {
  // SetupContext,
  computed,
  createComponent,
  // ref,
} from '@vue/composition-api'
import { Media } from '@/graphql/schema/media'

export interface Props {
  media: Media
}
// export const useMenu = (root: SetupContext['root']) => {
//   const x = ref(0)
//   const y = ref(0)
//   const menu = ref(false)

//   const show = (e: MouseEvent) => {
//     e.preventDefault()
//     menu.value = false
//     x.value = e.clientX
//     y.value = e.clientY
//     root.$nextTick(() => {
//       menu.value = true
//     })
//   }

//   return {
//     menu,
//     show,
//     x,
//     y,
//   }
// }
export default createComponent<Readonly<Props>>({
  props: {
    media: { default: null, required: true, type: Object },
  },
  setup(
    props,
    // , { root }
  ) {
    const manga = computed(() => props.media.type === 'MANGA')

    const status = computed(() => {
      const {
        media: { mediaListEntry },
      } = props

      return mediaListEntry && mediaListEntry.status
    })

    const progress = computed(() => {
      const {
        media: { mediaListEntry },
      } = props

      return (mediaListEntry && mediaListEntry.progress) || 0
    })

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
          return ''
      }
    })

    const tipString = computed(() => {
      const _tipObject = tipObject.value

      return (
        (_tipObject &&
          ((manga.value && _tipObject.manga) || _tipObject.text)) ||
        ''
      )
    })

    const tip = computed(() => {
      const _tipString = tipString.value

      switch (status.value) {
        case 'COMPLETED':
        case 'PLANNING':
        case 'DROPPED':
          return _tipString
        default:
          return _tipString + ' ' + stringValue.value
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
      // ...useMenu(root),
    }
  },
})
</script>
