<template>
  <VCard
    color="transparent"
    tile
    flat
    :href="href"
    target="_blank"
    rel="noopener"
  >
    <VCardTitle :style="{ 'justify-content': 'center' }">
      <VAvatar :color="color" class="white--text">
        <slot />
      </VAvatar>
    </VCardTitle>
    <VCardText class="text-center" v-text="title" />
  </VCard>
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
