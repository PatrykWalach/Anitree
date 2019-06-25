<template>
  <v-container fluid>
    <v-text-field autofocus label="Search" solo @input="input" append-icon="search"></v-text-field>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Emit } from 'vue-property-decorator'

import { HTMLElementEvent } from '../types'

@Component
export default class TheDrawerSearch extends Vue {
  @Emit()
  public input(value: string) {
    return value
  }
}
</script>
