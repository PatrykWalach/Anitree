<template>
  <v-fab-transition>
    <v-btn
      :key="active.icon"
      v-bind="{ ...active.bind, ...$attrs }"
      v-on="active.on"
      fab
      large
      dark
      right
    >
      <v-icon>{{ active.icon }}</v-icon>
    </v-btn>
  </v-fab-transition>
</template>
<script lang="ts">
import { SetupContext, computed, createComponent } from '@vue/composition-api'
import { NavigationElement } from '@/types'
import TheSearchFilters from './TheSearchFilters.vue'
// import { useBottomNavigation } from '@/App.vue'
import { useEdit } from './MediaCardActions.vue'

export const useSearch = () => {
  const searchBtn = (): NavigationElement => ({
    bind: { color: 'primary', exact: true, to: { name: 'search', query: {} } },
    icon: 'search',
    title: 'Search',
  })

  return { searchBtn }
}

export const useFab = (root: SetupContext['root']) => {
  const { editBtn: _editBtn } = useEdit(root)

  const editBtn = computed(() => {
    const btn = _editBtn(parseInt(root.$route.params.mediaId, 10))

    return {
      ...btn,
      bind: { ...btn.bind, color: 'red' },
    }
  })

  const { searchBtn: _searchBtn } = useSearch()

  const searchBtn = computed(_searchBtn)

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
        return searchBtn.value
    }
  })

  return {
    active,
  }
}

export default createComponent({
  components: {
    TheSearchFilters,
  },
  inheritAttrs: false,
  setup(_, { root }) {
    return useFab(root)
  },
})
</script>
