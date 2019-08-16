<template>
  <component
    :is="tag"
    v-model="input"
    v-bind="$attrs"
    filled
    rounded
    @change="changeInput"
  >
  </component>
</template>

<script lang="ts">
const BaseDateField = () => import('./BaseDateField.vue')
import { VTextField, VTextarea, VSelect } from 'vuetify/lib'
import {
  createComponent,
  value as react,
  watch,
  computed
} from 'vue-function-api'

interface Props {
  validators: ((v: string) => boolean)[]
  transformations: ((v: string) => string)[]
  tag: string
  beforeTransform: ((v: any) => any)[]
  afterTransform: ((v: any) => any)[]
  value: any
}

export default createComponent({
  inheritAttrs: false,
  components: {
    BaseDateField,
    VTextField,
    VTextarea,
    VSelect
  },
  props: ({
    tag: {
      default: 'v-text-field',
      type: String
    },
    validators: { default: () => [], type: Array },
    transformations: { default: () => [], type: Array },
    beforeTransform: { default: () => [], type: Array },
    afterTransform: { default: () => [], type: Array },
    value: {
      default: ''
    }
  } as unknown) as Readonly<Props>,
  setup(props, { emit }) {
    const input = react('')
    const transform = (input: any, transformations: Function[]) =>
      transformations.reduce(
        (str, transformation) => transformation(str),
        input
      )

    watch(
      () => props.value,
      value => {
        input.value = transform(value, props.beforeTransform)
      }
    )

    const isValid = computed(() => {
      for (const validator of props.validators) {
        if (!validator(input.value)) {
          return false
        }
      }
      return true
    })

    const changeInput = (newValue: string) => {
      input.value = transform(newValue, props.transformations)
      if (isValid.value) {
        emit('input', transform(input.value, props.afterTransform))
      } else {
        input.value = transform(props.value, props.beforeTransform)
      }
    }

    return { input, isValid, changeInput }
  }
})
</script>
