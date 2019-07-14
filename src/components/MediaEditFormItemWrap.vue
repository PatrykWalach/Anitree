<template>
  <v-tab-item v-bind="$attrs">
    <v-container grid-list-md>
      <v-layout wrap>
        <slot></slot>
      </v-layout>
    </v-container>
  </v-tab-item>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component({ inheritAttrs: false })
export default class MediaEditFormItemWrap extends Vue {}
</script>
