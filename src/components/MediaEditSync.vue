<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-icon v-bind="{ ...attrs, ...$attrs }" v-on="on">
        sync {{ auto ? '' : '_disabled' }}
      </v-icon>
    </template>
    <span>{{ caption }}</span>
  </v-tooltip>
</template>
<script lang="ts">
import { createComponent, computed } from '@vue/composition-api'
import useSubmit from '../store/submit'

export default createComponent<{}>({
  inheritAttrs: false,
  setup() {
    const { auto } = useSubmit()

    const caption = computed(
      () => 'autoupdates are ' + (auto.value ? 'enabled' : 'disabled')
    )

    return {
      caption,
      auto
    }
  }
})
</script>
