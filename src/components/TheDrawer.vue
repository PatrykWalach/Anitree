<template>
  <v-navigation-drawer
    v-model="syncedValue"
    app
    mini-variant
    permanent
    v-if="!$vuetify.breakpoint.xsOnly"
  >
    <v-list>
      <v-list-item exact :to="{ name: 'home' }">
        <v-list-item-icon>
          <v-icon>home</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            Home
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item exact :to="{ name: 'search' }">
        <v-list-item-icon>
          <v-icon>search</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            Search
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item exact :to="{ name: 'settings' }">
        <v-list-item-icon>
          <v-icon>settings</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            Settings
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
interface Props {
  value: boolean
}
import { createComponent, computed } from 'vue-function-api'
export default createComponent({
  props: ({
    value: {
      required: true,
      type: Boolean
    }
  } as unknown) as Readonly<Props>,
  setup(props, { emit }) {
    const syncedValue = computed(
      () => props.value,
      value => emit('update:value', value)
    )

    return { syncedValue }
  }
})
</script>
