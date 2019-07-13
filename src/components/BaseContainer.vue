<template>
  <v-container fill-height>
    <v-layout justify-center align-center>
      <template v-if="!loading">
        <slot></slot>
      </template>
      <v-progress-circular
        v-else
        indeterminate
        color="primary"
      ></v-progress-circular>
    </v-layout>
  </v-container>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class BaseContainer extends Vue {
  @Prop({ default: false })
  loading!: boolean
}
</script>
