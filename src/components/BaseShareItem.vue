<template>
  <v-slide-item>
    <v-card flat :href="href" target="_blank" rel="noopener">
      <v-card-title :style="{ 'justify-content': 'center' }">
        <v-avatar :color="color" class="white--text">
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

export default {
  props: {
    color: {
      default: 'grey darken-2',
      type: String,required:false
    },
    title: {
      required: true,
      type: String,default:''
    },
    href: {
      required: true,
      type: String,default:''
    }
  }
}
</script>
