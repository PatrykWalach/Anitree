<template>
  <component :is="tag" v-model="value" v-bind="$attrs" :multiple="multiple">
    <slot></slot>
  </component>
</template>

<script lang="ts">
interface Props {
  name: string
  tag: string
  multiple: boolean
}
import { VChipGroup } from 'vuetify/lib'
import { createComponent, computed } from 'vue-function-api'

export default createComponent({
  inheritAttrs: false,
  components: {
    VChipGroup
  },
  props: ({
    tag: { default: 'v-chip-group', type: String },
    name: { required: true, type: String },
    multiple: { default: false, type: Boolean }
  } as unknown) as Readonly<Props>,
  setup(props, { root }) {
    const value = computed(
      () => root.$route.query[props.name] || (props.multiple ? [] : null),
      _value =>
        root.$router.replace({
          query: Object.assign(
            {},
            root.$route.query,
            Object.fromEntries([[props.name, _value]])
          )
        })
    )

    const capitalize = (str: string) =>
      str[0].toUpperCase() + str.substr(1).toLowerCase()

    return { value, capitalize }
  }
})
</script>
