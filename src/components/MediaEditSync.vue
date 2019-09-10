<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-icon v-bind="{ ...attrs, ...$attrs }" v-on="on">
        sync {{ syncChanges ? '' : '_disabled' }}
      </v-icon>
    </template>
    <span>{{ caption }}</span>
  </v-tooltip>
</template>
<script lang="ts">
import { computed, createComponent } from '@vue/composition-api'
import useSettings from '../store/settings'

export default createComponent({
  inheritAttrs: false,
  setup() {
    const { syncChanges } = useSettings()

    const caption = computed(
      () => 'autoupdates are ' + (syncChanges.value ? 'enabled' : 'disabled')
    )

    return {
      caption,
      syncChanges
    }
  }
})
</script>
