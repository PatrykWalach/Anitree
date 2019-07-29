<template>
  <v-form
    v-model="valid"
    :style="{ display: 'contents' }"
    @submit.prevent="submit"
  >
    <v-text-field
      v-model="search"
      autofocus
      filled
      rounded
      hide-details
      name="search"
      label="Search"
      @keydown.esc="$emit('keydown:esc')"
    ></v-text-field>
  </v-form>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class TheAppBarSearch extends Vue {
  search: string = ''
  valid: boolean = false
  rules: ((search: string) => string | true)[] = [
    search => !!search.length || 'stop it'
  ]

  async submit() {
    if (this.valid) {
      this.$router.push({
        name: 'search',
        query: {
          search: this.search.trim()
        }
      })
      this.$emit('submit')
    }
  }
}
</script>
