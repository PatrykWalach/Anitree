<template>
  <VTextField name="search" v-model="value" v-bind="$attrs" />
</template>
<script lang="ts">
import { computed, createComponent, ref, watch } from '@vue/composition-api'
import { Dictionary } from 'vue-router/types/router'
import { debounce } from 'throttle-debounce'

interface Props {
  query: Dictionary<string | (string | null)[]>
}

export default createComponent({
  inheritAttrs: false,
  props: { query: { default: null, required: true, type: Object } },
  setup(props, { root }) {
    const currentSearch = computed(() => {
      const search = props.query.search
      return (search instanceof Array ? search.shift() : search) || ''
    })

    const value = ref(currentSearch.value)

    const submit = debounce(1000, search => {
      if (search !== currentSearch.value)
        root.$router.push({
          name: 'search',
          query: { search },
        })
    })

    watch(value, submit, { lazy: true })

    return {
      submit,
      value,
    }
  },
})
</script>
