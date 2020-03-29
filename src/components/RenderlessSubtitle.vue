<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'

import { RenderlessSubtitle_media } from './__generated__/RenderlessSubtitle_media'
import gql from 'graphql-tag'

export const RenderlessSubtitleFragments = {
  media: gql`
    fragment RenderlessSubtitle_media on Media {
      id
      type
      chapters
      episodes
      format
      status
    }
  `,
}

export interface Props {
  media: RenderlessSubtitle_media
}

export const useString = () => ({
  clean: (str: string | null) =>
    str
      ?.split(/_/g)
      .map((str) => {
        if (str.match(/(TV)|(OVA)|(ONA)/)) {
          return str
        }
        return str.toLowerCase()
      })
      .join(' ') || '',
})

export default defineComponent<Readonly<Props>>({
  props: {
    media: { default: null, required: true, type: Object },
  },
  setup(props, { slots }) {
    const { clean } = useString()

    const manga = computed(() => props.media.type === 'MANGA')

    const chaptersNumber = computed(() => {
      const { chapters, episodes } = props.media
      return (manga.value ? chapters : episodes) || 0
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

    const subtitle = computed(() => {
      const { media } = props

      if (!media) {
        return ''
      }

      const { format, status } = media

      return [format, status, chapters.value]
        .map(clean)
        .filter((str) => str)
        .join(' · ')
    })

    return () =>
      slots
        .default({
          subtitle: subtitle.value,
        })
        .shift() || null
  },
})
</script>
