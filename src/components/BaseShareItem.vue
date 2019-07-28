<template>
  <v-slide-item>
    <v-card flat :href="href" target="_blank" rel="noopener">
      <v-card-title :style="{ 'justify-content': 'center' }">
        <v-avatar :color="color">
          <slot></slot>
        </v-avatar>
      </v-card-title>
      <v-card-text>
        {{ title }}
      </v-card-text>
    </v-card>
  </v-slide-item>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class BaseShareItem extends Vue {
  @Prop({ default: 'grey darken-2' })
  readonly color!: string

  @Prop({ required: true })
  readonly title!: string

  @Prop({ required: true })
  readonly href!: string
}
</script>
