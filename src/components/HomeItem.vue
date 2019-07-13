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
        <v-list-item class="text-xs-left">
          <v-list-item-content>
            <v-list-item-title class="text-capitalize">
              <h5 class="headline"><slot name="title"></slot></h5>
            </v-list-item-title>
            <v-list-item-subtitle class="subheading text-capitalize">
              <slot></slot>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
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

@Component
export default class HomeItem extends Vue {
  @Prop({ default: 0 })
  readonly i!: number

  get orientation() {
    return this.i % 2 ? 'right' : 'left'
  }
}
</script>
