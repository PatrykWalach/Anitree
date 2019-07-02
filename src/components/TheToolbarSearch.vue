<template>
  <v-form
    v-model="valid"
    :style="{ display: 'contents' }"
    @submit.prevent="submit"
  >
    <v-text-field
      v-model="search"
      autofocus
      flat
      solo
      hide-details
      label="Search"
      @keydown.esc="$emit('keydown:esc')"
    ></v-text-field>
  </v-form>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class TheToolbarSearch extends Vue {
  public search: string = ''
  public valid: boolean = false
  public rules: ((search: string) => string | true)[] = [
    search => !!search.length || 'stop it'
  ]

  public async submit() {
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
