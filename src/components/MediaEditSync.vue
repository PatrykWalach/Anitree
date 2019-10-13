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

export default createComponent({
  inheritAttrs: false,
  setup(_, { root }) {
    const {
      state: { syncChanges },
    } = root.$modules.settings

    const caption = computed(
      () => 'autoupdates are ' + (syncChanges.value ? 'enabled' : 'disabled'),
    )

    return {
      caption,
      syncChanges,
    }
  },
})
</script>
