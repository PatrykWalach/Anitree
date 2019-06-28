<template>
  <v-container fill-height>
    <v-layout justify-center align-center>
      <v-flex v-if="!loading">
        <slot></slot>
      </v-flex>
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
  public loading!: boolean
}
</script>
