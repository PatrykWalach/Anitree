<template>
  <v-tabs v-model="tab" grow>
    <v-tab
      v-for="{ icon, title, href } in tabs"
      :href="`#${href}`"
      :disabled="error || loading"
      :key="title"
    >
      <v-icon left>{{ icon }}</v-icon>
      {{ title }}
    </v-tab>
  </v-tabs>
</template>
<script lang="ts">
import { createComponent } from '@vue/composition-api'
import useEdit from '../store/edit'

export interface Props {
  error: boolean
  loading: boolean
}

export default createComponent<Readonly<Props>>({
  props: {
    error: { required: true, type: Boolean, default: false },
    loading: { required: true, type: Boolean, default: false }
  },
  components: {},
  setup() {
    const { tab, tabs } = useEdit()

    return {
      tab,
      tabs
    }
  }
})
</script>
