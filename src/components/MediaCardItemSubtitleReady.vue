<template>
  <v-list-item-subtitle class="text-capitalize">
    <span class="text--primary"> {{ subheading }}</span>
    <v-spacer></v-spacer>
    <span v-html="media.description"></span>
  </v-list-item-subtitle>
</template>

<script lang="ts">
import { Media } from '@/apollo/schema/media'
import { computed, createComponent } from 'vue-function-api'
interface Props {
  media: Media
}
export default createComponent({
  props: {
    media: { required: true }
  },
  setup(props: Readonly<Props>) {
    const clean = (str: string | null) =>
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

    const manga = computed(() => props.media.type === 'MANGA')

    const chaptersNumber = computed(() => {
      const { chapters, episodes } = props.media
      return (
        ((chapters || episodes) && (manga.value ? chapters : episodes)) || 0
      )
    })

    const chapters = computed(
      () =>
        (chaptersNumber.value &&
          chaptersNumber.value +
            (manga.value ? ' Chapter' : ' Episode') +
            (chaptersNumber.value === 1 ? '' : 's')) ||
        null
    )

    const subheading = computed(() => {
      if (!props.media) {
        return ''
      }
      const { format, status } = props.media

      return [format, status]
        .concat([chapters.value])
        .map(clean)
        .filter(str => str)
        .join(' · ')
    })

    return { subheading, chapters, manga, chaptersNumber }
  }
})
</script>
