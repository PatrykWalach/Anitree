<template>
  <v-app-bar app bottom color="primary" dark>
    <v-app-bar-nav-icon @click.stop="syncedDrawer = !syncedDrawer" />

    <slot></slot>

    <v-fab-transition>
      <v-btn
        v-if="fab"
        top
        absolute
        :key="fab.icon"
        class="accent"
        @click.stop="fab.on"
        color="accent"
        fab
        large
        right
      >
        <v-icon color="black">{{ fab.icon }}</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-app-bar>
</template>

<script lang="ts">
import { computed, createComponent } from '@vue/composition-api'
import { useFab } from '@/hooks/fab'

export interface Props {
  drawer: boolean
}

export default createComponent<Readonly<Props>>({
  props: {
    drawer: { default: false, required: true, type: Boolean },
  },
  setup(props, { emit }) {
    const syncedDrawer = computed({
      get: () => props.drawer,
      set: e => emit('update:drawer', e),
    })

    const fab = useFab()

    return {
      fab,
      syncedDrawer,
    }
  },
})
</script>
