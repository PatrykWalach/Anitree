<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-form v-model="valid" @submit.prevent="submit">
          <v-text-field
            full-width
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
          ></v-text-field
        ></v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import { ref, Ref, computed, createComponent } from '@vue/composition-api'

export default createComponent({
  setup(_, { emit, root }) {
    const search = ref('')
    const valid = ref(false)

    const rules: Ref<((search: string) => string | true)[]> = ref([
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
