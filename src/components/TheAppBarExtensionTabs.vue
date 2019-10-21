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

    const tabs = computed(() => {
      const _params = params.value
      return [
        {
          icon: 'info',
          title: 'about',
          to: _params && {
            name: 'media-about',
            params: _params,
          },
        },
        {
          icon: 'timeline',
          title: 'timeline',
          to: _params && {
            name: 'media-timeline',
            params: _params,
          },
        },
      ]
    })

    return {
      tabs,
    }
  },
})
</script>
