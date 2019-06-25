<template>
  <v-tooltip bottom>
    <v-toolbar
      v-slot:activator
      :style="{ height: '2px' }"
      :class="color"
    ></v-toolbar>
    <span>{{ status }}</span>
  </v-tooltip>
</template>
<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator'

@Component
export default class BaseMediaStatus extends Vue {
  @Prop()
  public readonly status!: string

  get color() {
    switch (this.status) {
      case 'CURRENT':
        return 'info'
      case 'PLANNING':
        return 'warning'
      case 'COMPLETED':
        return 'success'
      case 'DROPPED':
        return 'error'
      case 'PAUSED':
        return 'red lighten-3'
      case 'REPEATING':
        return 'info'
      default:
        return ''
    }
  }
}
</script>
