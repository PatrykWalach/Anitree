<template>
  <v-layout>
    <v-text-field
      v-model="search"
      flat
      solo-inverted
      hide-details
      label="Search"
      @keyup.enter="submit"
    ></v-text-field>
    <v-btn icon aria-label="See results for the entered query" @click="submit"
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
