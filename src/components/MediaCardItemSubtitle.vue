<template>
  <v-list-item-subtitle class="text-capitalize">
    <span class="text--primary">
      {{ subheading }}
    </span>
  </v-list-item-subtitle>
</template>

<script lang="ts">
import { computed, createComponent } from '@vue/composition-api'
import { Media } from '@/graphql/schema/media'
export interface Props {
  media: Media
}

export const useString = () => ({
  clean: (str: string | null) =>
    (str &&
      str
        .split(/_/g)
        .map(str => {
          if (str !== 'TV' && str !== 'OVA' && str !== 'ONA')
            return str.toLowerCase()
          return str
        })
        .join(' ')) ||
    '',
})

export default createComponent<Readonly<Props>>({
  props: {
    media: { default: null, required: true, type: Object },
  },
  setup(props) {
    const { clean } = useString()

    const manga = computed(() => props.media.type === 'MANGA')

    const chaptersNumber = computed(() => {
      const { chapters, episodes } = props.media
      return (
        ((chapters || episodes) && (manga.value ? chapters : episodes)) || 0
      )
    })

    const chapters = computed(() => {
      const chaptersNumberValue = chaptersNumber.value

      return (
        (chaptersNumberValue &&
          chaptersNumberValue +
            (manga.value ? ' Chapter' : ' Episode') +
            (chaptersNumberValue === 1 ? '' : 's')) ||
        null
      )
    })

    const subheading = computed(() => {
      const { media } = props

      if (!media) {
        return ''
      }

      const { format, status } = media

      return [format, status]
        .concat([chapters.value])
        .map(clean)
        .filter(str => str)
        .join(' · ')
    })

    return { chapters, chaptersNumber, manga, subheading }
  },
})
</script>
