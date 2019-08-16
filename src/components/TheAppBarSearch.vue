<template>
  <v-layout justify-center>
    <v-form
      v-model="valid"
      :style="{ display: 'contents' }"
      @submit.prevent="submit"
    >
      <v-text-field
        :style="{ 'max-width': '720px' }"
        prepend-inner-icon="search"
        v-model="search"
        autofocus
        clearable
        @click:clear="move"
        @click="move"
        @input="move"
        single-line
        filled
        rounded
        hide-details
        name="search"
        label="Search"
        @keydown.esc="$emit('keydown:esc')"
      ></v-text-field> </v-form
  ></v-layout>
</template>
<script lang="ts">
import {
  createComponent,
  value as binding,
  Wrapper,
  computed
} from 'vue-function-api'

export default createComponent({
  setup(_, { emit, root }) {
    const search = binding('')
    const valid = binding(false)

    const rules: Wrapper<((search: string) => string | true)[]> = binding([
      (search: string) => !!search.length || 'stop it'
    ])

    const submit = async () => {
      if (valid.value && root.$route.query.search !== search.value.trim()) {
        root.$router.push({
          name: 'search',
          query: {
            search: search.value.trim()
          }
        })
        emit('submit')
      }
    }

    const query = computed(() => root.$route.query)

    const isSearched = computed(() => {
      for (const prop in query.value) {
        if (query.value.hasOwnProperty(prop)) {
          return true
        }
      }
      return false
    })

    const move = () => {
      if (root.$route.name !== 'search') {
        root.$router.push({
          name: 'search',
          query: {}
        })
      } else if (isSearched.value) {
        root.$router.replace({
          query: {}
        })
      }
    }

    return { search, valid, rules, submit, move }
  }
})
</script>
