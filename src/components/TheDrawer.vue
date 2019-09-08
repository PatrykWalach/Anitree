<template>
  <v-navigation-drawer v-model="syncedValue" app mini-variant permanent>
    <v-list>
      <v-list-item
        :key="title"
        exact
        :to="to"
        v-for="{ to, title, icon } in main"
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
import useNavigation from '@/store/navigation'
export default createComponent<Readonly<Props>>({
  props: {
    value: {
      required: true,
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const syncedValue = computed({
      get: () => props.value,
      set: value => emit('update:value', value)
    })

    const { main } = useNavigation()
    return { main, syncedValue }
  }
})
</script>
