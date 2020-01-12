<script lang="ts">
import { computed, createComponent } from '@vue/composition-api'
import { useTitle } from '@/hooks/results'
import { RenderlessTitle_media } from './__generated__/RenderlessTitle_media'

interface Props {
  media: RenderlessTitle_media
}

export default createComponent<Readonly<Props>>({
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
