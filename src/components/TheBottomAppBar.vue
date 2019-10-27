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

    <TheAppBarMenu :media="media" top :actions="moreActions" />
    <TheFab top absolute />
  </v-app-bar>
</template>

<script lang="ts">
import { computed, createComponent } from '@vue/composition-api'

import { Media } from '../graphql/schema/media'
import TheFab from './TheFab.vue'

const TheAppBarMenu = () =>
  import(
    /* webpackChunkName: "TheAppBarMenu" */ /* webpackPrefetch: true */ './TheAppBarMenu.vue'
  )

export interface Props {
  media: Media | null
  drawer: boolean
}

import { useAppBarActions } from '@/mixins'
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
