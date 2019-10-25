<template>
  <component :is="tag" v-model="input" v-bind="$attrs" @change="changeInput">
    <slot></slot>
  </component>
</template>

<script lang="ts">
const BaseDateField = () => import('./BaseDateField.vue')
import {
  VChipGroup,
  VSelect,
  VSwitch,
  VTextField,
  VTextarea,
} from 'vuetify/lib'

import { computed, createComponent, ref, watch } from '@vue/composition-api'
import { Props } from './FormBuilder'

export default createComponent<Readonly<Props>>({
  components: {
    BaseDateField,
    VChipGroup,
    VSelect,
    VSwitch,
    VTextField,
    VTextarea,
  },
  inheritAttrs: false,
  props: {
    afterTransform: { default: () => [], required: false, type: Array },
    beforeTransform: { default: () => [], required: false, type: Array },
    tag: {
      default: 'v-text-field',
      required: false,
      type: String,
    },
    transformations: { default: () => [], required: false, type: Array },
    validators: {
      default: () => [],
      required: false,
      type: [Array, Set],
    },
    value: {
      default: '',
      required: false,
      type: null,
    },
  },
  setup(props, { emit }) {
    const input = ref('')
    const transform = (input: any, transformations: Function[]) =>
      transformations.reduce(
        (str, transformation) => transformation(str),
        input,
      )

    watch(
      () => props.value,
      _value => {
        input.value = transform(_value, props.beforeTransform)
      },
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
      const { transformations, afterTransform, beforeTransform, value } = props

      input.value = transform(newValue, transformations)
      if (isValid.value) {
        const finalValue = transform(input.value, afterTransform)
        emit('input', finalValue)
        emit('change', finalValue)
      } else {
        input.value = transform(value, beforeTransform)
      }
    }

    return { changeInput, input, isValid }
  },
})
</script>
