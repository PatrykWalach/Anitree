<script lang="ts">
import { createComponent, createElement as h } from '@vue/composition-api'

import FormBuilder from './FormBuilder'
import FormDirector from './FormDirector'

import { Media } from '@/graphql/schema/media'

import { User } from '@/graphql/schema/viewer'
import { Form } from '../types'

export interface Props {
  method: keyof FormDirector
  user: User
  media: Media
  form: Form
  scoreFormat: {
    round: number
    max: number
  }
  advancedScoring: string[]
  manga: boolean
}

import { VContainer, VRow } from 'vuetify/lib'

export default createComponent<Readonly<Props>>({
  inheritAttrs: false,
  props: {
    method: {
      required: true,
      type: String,
      default: ''
    },
    user: {
      required: true,
      type: Object,
      default: null
    },
    media: {
      required: true,
      type: Object,
      default: null
    },
    form: {
      required: true,
      type: Object,
      default: null
    },
    scoreFormat: {
      required: true,
      type: Object,
      default: null
    },
    advancedScoring: {
      required: true,
      type: Array,
      default: () => []
    },
    manga: {
      required: true,
      type: Boolean,
      default: false
    }
  },
  setup: props => {
    const director = new FormDirector()

    /*eslint-disable-next-line @typescript-eslint/no-unused-vars*/

    return () => {
      const builder = new FormBuilder()

      director[props.method](builder, props)

      return h(VContainer, { props: { fluid: true } }, [
        h(VRow, [builder.getFields()])
      ])
    }
  }
})
</script>
