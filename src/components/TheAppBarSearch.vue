<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-form @submit.prevent="submit">
          <v-text-field
            v-model="value"
            full-width
            prepend-inner-icon="search"
            autofocus
            clearable
            single-line
            filled
            rounded
            hide-details
            name="search"
            label="Search"
            @click:clear="clear"
            @click="move"
            @keydown.esc="$emit('keydown:esc')"
          ></v-text-field>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import { createComponent, ref, watch } from '@vue/composition-api'

export default createComponent({
  setup(_, { root }) {
    const value = ref('')

    watch(
      () => root.$route.query.search,
      (search = '') => {
        if (search && !(search instanceof Array)) {
          value.value = search
        }
      },
    )

    const clear = () =>
      root.$router.replace({
        name: 'search',
        query: {},
      })

    const move = () => {
      if (!value.value && root.$route.name !== 'search') {
        root.$router.push({
          name: 'search',
          query: {},
        })
      }
    }

    const submit = () => {
      if (value.value !== root.$route.query.search)
        root.$router.replace({
          name: 'search',
          query: { search: value.value },
        })
    }

    return { clear, move, submit, value }
  },
})
</script>
