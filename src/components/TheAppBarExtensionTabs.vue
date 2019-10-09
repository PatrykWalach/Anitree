<template>
  <v-tabs align-with-title>
    <v-tab
      v-for="{ to, icon, title } in tabs"
      :key="title"
      exact
      :to="to"
      replace
    >
      <v-icon left>{{ icon }}</v-icon>
      {{ title }}
    </v-tab>
  </v-tabs>
</template>

<script lang="ts">
import { computed, createComponent } from '@vue/composition-api'

export default createComponent({
  setup(_, { root }) {
    const params = computed(() => {
      const { mediaType, mediaId } = root.$route.params
      return (
        mediaType &&
        mediaId && {
          mediaId,
          mediaType,
        }
      )
    })

    const tabs = computed(() => [
      {
        icon: 'info',
        title: 'about',
        to: params.value && {
          name: 'media-about',
          params: params.value,
        },
      },
      {
        icon: 'timeline',
        title: 'timeline',
        to: params.value && {
          name: 'media-timeline',
          params: params.value,
        },
      },
    ])

    return {
      tabs,
    }
  },
})
</script>
