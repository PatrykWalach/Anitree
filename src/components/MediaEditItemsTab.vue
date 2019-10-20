<script lang="ts">
import { FormDirector, Props } from './FormDirector'
import { VContainer, VRow } from 'vuetify/lib'
import { createComponent, createElement as h } from '@vue/composition-api'
import { FormBuilder } from './FormBuilder'

export default createComponent<Readonly<Props>>({
  inheritAttrs: false,
  props: {
    advancedScoring: {
      default: () => [],
      required: true,
      type: Array,
    },
    form: {
      default: null,
      required: true,
      type: Object,
    },
    manga: {
      default: false,
      required: true,
      type: Boolean,
    },
    media: {
      default: null,
      required: true,
      type: Object,
    },
    method: {
      default: '',
      required: true,
      type: String,
    },
    scoreFormat: {
      default: null,
      required: true,
      type: Object,
    },
    user: {
      default: null,
      required: true,
      type: Object,
    },
  },
  setup: (props, context) => {
    const director = new FormDirector()

    return () => {
      const builder = new FormBuilder()

      director[props.method](builder, props, context)

      return h(VContainer, { props: { fluid: true } }, [
        h(VRow, [builder.getFields()]),
      ])
    }
  },
})
</script>
