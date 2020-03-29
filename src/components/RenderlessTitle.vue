<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'
import { useTitle } from '@/hooks/results'
import { RenderlessTitle_media } from './__generated__/RenderlessTitle_media'
import gql from 'graphql-tag'

import { useTitleFragments } from '../hooks/results'

export const RenderlessTitleFragments = {
  media: gql`
    fragment RenderlessTitle_media on Media {
      id
      ...useTitle_media
    }
    ${useTitleFragments.media}
  `,
}
interface Props {
  media: RenderlessTitle_media
}

export default defineComponent<Readonly<Props>>({
  props: { media: { default: null, required: true, type: Object } },
  setup(props, { slots }) {
    const title = useTitle(() => props.media)

    const scopedVariables = computed(() => ({
      title: title.value,
    }))

    return () => slots.default(scopedVariables.value).shift() || null
  },
})
</script>
