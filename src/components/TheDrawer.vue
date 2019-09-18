<template>
  <v-navigation-drawer v-model="syncedValue" app mini-variant permanent>
    <v-list nav>
      <v-list-item
        v-for="{ to, title, icon } in main"
        :key="title"
        :color="theme.isDark ? undefined : 'primary'"
        exact
        :to="to"
      >
        <v-list-item-icon>
          <v-icon>{{ icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{ title }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { computed, createComponent } from '@vue/composition-api'

interface Props {
  value: boolean
}
import { navigation } from '@/store/navigation'
import { useTheme } from './MediaCardProgress.vue'

export default createComponent<Readonly<Props>>({
  props: {
    value: {
      default: false,
      required: true,
      type: Boolean,
    },
  },
  setup(props, { emit }) {
    const syncedValue = computed({
      get: () => props.value,
      set: value => emit('update:value', value),
    })

    const { theme } = useTheme()

    const {
      state: { main },
    } = navigation
    return { main, syncedValue, theme }
  },
})
</script>
