<template>
  <component :is="tag" v-model="input" v-bind="$attrs" @change="changeInput">
    <slot></slot>
  </component>
</template>

<script lang="ts">
const BaseDateField = () => import('./BaseDateField.vue')
import { VChipGroup, VSelect, VTextField, VTextarea } from 'vuetify/lib'

import { computed, createComponent, ref, watch } from '@vue/composition-api'

export interface Props {
  validators: ((v: string) => boolean)[]
  transformations: ((v: string) => string)[]
  tag: string
  beforeTransform: ((v: any) => any)[]
  afterTransform: ((v: any) => any)[]
  value: any
}

export default createComponent<Readonly<Props>>({
  components: {
    BaseDateField,
    VChipGroup,
    VSelect,
    VTextField,
    VTextarea
  },
  inheritAttrs: false,
  props: {
    afterTransform: { default: () => [], required: false, type: Array },
    beforeTransform: { default: () => [], required: false, type: Array },
    tag: {
      default: 'v-text-field',
      required: false,
      type: String
    },
    transformations: { default: () => [], required: false, type: Array },
    validators: { default: () => [], required: false, type: Array },
    value: {
      default: '',
      required: false,
      type: null
    }
  },
  setup(props, { emit }) {
    const input = ref('')
    const transform = (input: any, transformations: Function[]) =>
      transformations.reduce(
        (str, transformation) => transformation(str),
        input
      )

    watch(
      () => props.value,
      _value => {
        input.value = transform(_value, props.beforeTransform)
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

    return { changeInput, input, isValid }
  }
})
</script>
