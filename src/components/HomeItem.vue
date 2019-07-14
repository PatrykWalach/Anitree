<template>
  <div>
    <v-timeline-item
      v-bind="$attrs"
      :[orientation]="true"
      :style="{ 'align-items': 'center' }"
    >
      <template v-slot:opposite>
        <slot name="opposite"></slot>
      </template>
      <v-card>
        <v-card-title class="text-xs-left">
          <slot name="title"> </slot>
        </v-card-title>
        <v-card-text><slot></slot></v-card-text>
      </v-card>
    </v-timeline-item>
    <v-timeline-item
      v-if="$slots.opposite && $vuetify.breakpoint.smAndDown"
      small
    >
      <slot name="opposite"></slot>
    </v-timeline-item>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  inheritAttrs: false
})
export default class HomeItem extends Vue {
  @Prop({ default: 0 })
  readonly i!: number

  get orientation() {
    return this.i % 2 ? 'right' : 'left'
  }
}
</script>
