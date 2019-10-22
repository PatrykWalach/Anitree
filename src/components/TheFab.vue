<template>
  <v-fab-transition>
    <v-btn
      v-if="!bottomNavigation"
      :key="active.icon"
      :color="active.color"
      :to="active.to"
      v-on="active.on"
      fab
      large
      dark
      fixed
      bottom
      right
    >
      <v-icon>{{ active.icon }}</v-icon>
    </v-btn>
  </v-fab-transition>
</template>
<script lang="ts">
import { SetupContext, computed, createComponent } from '@vue/composition-api'
import TheSearchFilters from './TheSearchFilters.vue'
import { useBottomNavigation } from '@/App.vue'

export const useFab = (root: SetupContext['root']) => {
  const active = computed(() => {
    const { filter, timeline, edit } = root.$modules

    switch (root.$route.name) {
      case 'search':
        return {
          color: 'accent',
          icon: 'tune',
          on: {
            click: () => filter.mutations.CHANGE_IS_SHOWN(true),
          },
        }
      case 'media-timeline':
        return {
          color: 'accent',
          icon: 'sort',
          on: {
            click: () =>
              timeline.mutations.CHANGE_ORDER(timeline.state.order.value * -1),
          },
        }
      case 'media-about':
        return {
          color: 'error',
          icon: 'edit',
          on: {
            click: () =>
              edit.actions.open(parseInt(root.$route.params.mediaId, 10)),
          },
        }
      default:
        return {
          color: 'primary',
          icon: 'search',
          to: { name: 'search', query: {} },
        }
    }
  })

  return {
    active,
    ...useBottomNavigation(root),
  }
}

export default createComponent({
  components: {
    TheSearchFilters,
  },
  setup(_, { root }) {
    return useFab(root)
  },
})
</script>
