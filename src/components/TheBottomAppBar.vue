<template>
  <v-app-bar app bottom>
    <v-app-bar-nav-icon @click.stop="syncedDrawer = !syncedDrawer" />

    <v-tooltip
      top
      :key="title"
      v-for="{ icon, bind, title, on: actionOn } in mainActions"
    >
      <template v-slot:activator="{ attrs, on }">
        <v-btn
          v-bind="{ ...bind, ...attrs }"
          icon
          v-on="{ ...on, ...actionOn }"
        >
          <v-icon>{{ icon }}</v-icon>
        </v-btn>
      </template>
      <span>{{ title }}</span>
    </v-tooltip>

    <TheAppBarMenu :media="media" :actions="moreActions" />
    <TheFab top absolute />
  </v-app-bar>
</template>

<script lang="ts">
import { SetupContext, computed, createComponent } from '@vue/composition-api'
import TheFab, { useFab } from './TheFab.vue'
import { Media } from '../graphql/schema/media'
import { useMediaCardActions } from './MediaCardActions.vue'
import { useRoutes } from './TheAppBar.vue'
import { useSearch } from './TheFab.vue'

const TheAppBarMenu = () =>
  import(
    /* webpackChunkName: "TheAppBarMenu" */ /* webpackPrefetch: true */ './TheAppBarMenu.vue'
  )

export interface Props {
  media: Media | null
  drawer: boolean
}
export const useAppBarActions = (
  props: Pick<Props, 'media'>,
  root: SetupContext['root'],
) => {
  const { actions: _actions } = useMediaCardActions()

  const { active } = useFab(root)

  const { routeTitle } = useRoutes(root)

  const { searchBtn: _searchBtn } = useSearch()

  const searchBtn = computed(_searchBtn)
  const actions = computed(() => _actions(props.media))

  const allActions = computed(() =>
    (routeTitle.value ? actions.value : []).concat([searchBtn.value]),
  )

  const filteredActions = computed(() => {
    const { name } = root.$route
    const activeIcon = active.value.icon

    return allActions.value
      .filter(
        ({ icon, bind }) =>
          icon !== activeIcon && (!bind || !bind.to || bind.to.name !== name),
      )
      .reverse()
  })

  const mainActions = computed(() => filteredActions.value.slice().splice(0, 2))
  const moreActions = computed(() => filteredActions.value.slice().splice(2))

  return {
    allActions,
    filteredActions,
    mainActions,
    moreActions,
  }
}
export default createComponent<Readonly<Props>>({
  components: { TheAppBarMenu, TheFab },
  props: {
    drawer: { default: false, required: true, type: Boolean },
    media: { default: null, required: true, type: null },
  },
  setup(props, { root, emit }) {
    const syncedDrawer = computed({
      get: () => props.drawer,
      set: e => emit('update:drawer', e),
    })

    return {
      ...useAppBarActions(props, root),
      syncedDrawer,
    }
  },
})
</script>
