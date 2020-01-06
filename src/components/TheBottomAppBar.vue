<template>
  <v-app-bar app bottom color="primary" dark>
    <v-app-bar-nav-icon
      @click.stop="syncedDrawer = !syncedDrawer"
    ></v-app-bar-nav-icon>

    <v-fab-transition>
      <v-btn
        v-if="fab"
        :key="fab.icon"
        top
        absolute
        class="accent"
        color="accent"
        fab
        large
        right
        @click.stop="fab.on"
      >
        <v-icon color="black">
          {{ fab.icon }}
        </v-icon>
      </v-btn>
    </v-fab-transition>
  </v-app-bar>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
import { useFab } from '@/hooks/fab'
import { useSync } from '@/hooks/sync'
import BaseAction from './BaseAction.vue'

export interface Props {
  drawer: boolean
}

export default createComponent<Readonly<Props>>({
  components: { BaseAction },
  props: {
    drawer: { default: false, required: true, type: Boolean },
  },
  setup(props, { emit }) {
    const syncedDrawer = useSync(props, 'drawer', emit)

    const fab = useFab()

    return { fab, syncedDrawer }
  },
})
</script>
