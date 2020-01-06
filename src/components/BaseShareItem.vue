<template>
  <v-card
    color="transparent"
    tile
    flat
    :href="href"
    target="_blank"
    rel="noopener"
  >
    <v-card-title :style="{ 'justify-content': 'center' }">
      <v-avatar :color="color" class="white--text">
        <slot />
      </v-avatar>
    </v-card-title>
    <v-card-text class="text-center">
      {{ title }}
    </v-card-text>
  </v-card>
</template>
<script lang="ts">
export default {
  props: {
    color: {
      default: 'grey darken-2',
      required: false,
      type: String,
    },
    href: {
      default: '',
      required: true,
      type: String,
    },
    title: {
      default: '',
      required: true,
      type: String,
    },
  },
}
</script>
