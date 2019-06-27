<template>
  <v-layout>
    <v-text-field
      flat
      solo-inverted
      hide-details
      label="Search"
      v-model="search"
      @keyup.enter="submit"
    ></v-text-field>
    <v-btn icon @click="submit" aria-label="See results for the entered query"
      ><v-icon>search</v-icon></v-btn
    >
  </v-layout>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class TheToolbarSearch extends Vue {
  public search: string = ''

  public async submit() {
    this.$router.push({
      name: 'search',
      query: {
        search: this.search
      }
    })
  }
}
</script>
