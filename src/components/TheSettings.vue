<template>
  <v-card>
    <v-list two-line subheader>
      <v-subheader>Settings</v-subheader>
      <TheSettingsTitle />
      <TheSettingsTheme />
      <TheSettingsLogin v-if="!token" />
      <TheSettingsSubmit v-else />
    </v-list>
  </v-card>
</template>

<script lang="ts">
import TheSettingsTheme from '@/components/TheSettingsTheme.vue'
import TheSettingsTitle from '@/components/TheSettingsTitle.vue'
const TheSettingsLogin = () => import('@/components/TheSettingsLogin.vue')
const TheSettingsSubmit = () => import('@/components/TheSettingsSubmit.vue')

import { createComponent } from 'vue-function-api'

import useAuth from '@/store/auth'

export default createComponent({
  components: {
    TheSettingsTheme,
    TheSettingsLogin,
    TheSettingsSubmit,
    TheSettingsTitle
  },
  setup() {
    const { token } = useAuth()

    return {
      token
    }
  }
})
</script>
