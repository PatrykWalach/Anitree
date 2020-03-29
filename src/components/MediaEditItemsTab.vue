<script lang="ts">
import { FormDirector, Props } from './FormDirector'
import { VContainer, VRow } from 'vuetify/lib'
import { defineComponent, createElement as h } from '@vue/composition-api'
import { FormBuilder } from './FormBuilder'

import gql from 'graphql-tag'
import { FormDirectorFragments } from './FormDirector'

export const MediaEditItemsTabFragments = {
  media: gql`
    fragment MediaEditItemsTab_media on Media {
      id
      ...FormDirector_media
    }
    ${FormDirectorFragments.media}
  `,
}

export default defineComponent<Readonly<Props>>({
  inheritAttrs: false,
  props: {
    advancedScoring: {
      default: () => [],
      required: true,
      type: Array,
    },
    changeForm: { default: null, required: true, type: Function },
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
  },
  setup: (props) => {
    const director = new FormDirector()

    return () => {
      const builder = new FormBuilder()

      director[props.method](builder, props)

      return h(VContainer, { props: { fluid: true } }, [
        h(VRow, [builder.getFields()]),
      ])
    }
  },
})
</script>
