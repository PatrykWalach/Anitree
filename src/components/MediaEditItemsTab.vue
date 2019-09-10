<script lang="ts">
import { VContainer, VRow } from 'vuetify/lib'
import { createComponent, createElement as h } from '@vue/composition-api'

import { Form } from '../types'
import FormBuilder from './FormBuilder'
import FormDirector from './FormDirector'

import { Media } from '@/graphql/schema/media'
import { User } from '@/graphql/schema/viewer'

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

export default createComponent<Readonly<Props>>({
  inheritAttrs: false,
  props: {
    advancedScoring: {
      default: () => [],
      required: true,
      type: Array
    },
    form: {
      default: null,
      required: true,
      type: Object
    },
    manga: {
      default: false,
      required: true,
      type: Boolean
    },
    media: {
      default: null,
      required: true,
      type: Object
    },
    method: {
      default: '',
      required: true,
      type: String
    },
    scoreFormat: {
      default: null,
      required: true,
      type: Object
    },
    user: {
      default: null,
      required: true,
      type: Object
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
