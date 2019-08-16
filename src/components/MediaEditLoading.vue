<template>
  <v-container v-if="loading" fill-height>
    <v-layout justify-center align-center>
      <v-progress-circular indeterminate></v-progress-circular>
    </v-layout>
  </v-container>
  <v-card-text v-else-if="error">
    <v-subheader>
      There was an error
    </v-subheader>
  </v-card-text>
  <v-card-text v-else>
    <v-subheader>
      Please log in
    </v-subheader>
    <TheSettingsLogin />
  </v-card-text>
</template>
<script lang="ts">
import { createComponent } from 'vue-function-api'

const TheSettingsLogin = () => import('./TheSettingsLogin.vue')

interface Props {
  loading: boolean
  error: boolean
}
export default createComponent({
  props: {
    loading: { required: true, type: Boolean },
    error: { required: true, type: Boolean }
  },

  components: {
    TheSettingsLogin
  }
})
</script>
