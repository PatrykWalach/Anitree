<template>
  <v-card>
    <v-list two-line subheader>
      <v-subheader>Site</v-subheader>
      <TheSettingsTitle />
      <TheSettingsTheme />
      <TheSettingsLogin v-if="!token" />
      <TheSettingsSubmit v-else />
      <v-subheader>Cache</v-subheader>
      <TheSettingsApollo />
      <TheSettingsChanges />
    </v-list>
  </v-card>
</template>

<script lang="ts">
import TheSettingsTheme from '@/components/TheSettingsTheme.vue'
import TheSettingsTitle from '@/components/TheSettingsTitle.vue'
import TheSettingsApollo from '@/components/TheSettingsApollo.vue'
import TheSettingsChanges from '@/components/TheSettingsChanges.vue'
const TheSettingsLogin = () => import('@/components/TheSettingsLogin.vue')
const TheSettingsSubmit = () => import('@/components/TheSettingsSubmit.vue')

import { createComponent } from '@vue/composition-api'

import useSettings from '@/store/settings'

export default createComponent({
  components: {
    TheSettingsTheme,
    TheSettingsLogin,
    TheSettingsSubmit,
    TheSettingsTitle,
    TheSettingsApollo,
    TheSettingsChanges
  },
  setup() {
    const { token } = useSettings()

    return {
      token
    }
  }
})
</script>
