<template>
  <v-fab-transition>
    <v-btn
      v-if="!bottomNavigation"
      :key="active.icon"
      v-bind="active.bind"
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
import { useEdit } from './MediaCardActions.vue'

export const useFab = (root: SetupContext['root']) => {
  const { editBtn: _editBtn } = useEdit(root)

  const editBtn = computed(() => {
    const btn = _editBtn(parseInt(root.$route.params.mediaId, 10))

    return {
      ...btn,
      bind: { ...btn.bind, color: 'red' },
    }
  })

  const active = computed(() => {
    const { filter, timeline } = root.$modules

    switch (root.$route.name) {
      case 'search':
        return {
          bind: { color: 'accent' },
          icon: 'tune',
          on: {
            click: () => filter.CHANGE_IS_SHOWN(true),
          },
        }
      case 'media-timeline':
        return {
          bind: { color: 'accent' },
          icon: 'sort',
          on: {
            click: () => timeline.CHANGE_ORDER(timeline.state.order.value * -1),
          },
        }
      case 'media-about':
        return editBtn.value
      default:
        return {
          bind: { color: 'primary', to: { name: 'search', query: {} } },
          icon: 'search',
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
