<template>
  <v-card-text>
    <v-container v-if="loading">
      <v-row justify="center" align="center">
        <v-progress-circular indeterminate></v-progress-circular>
      </v-row>
    </v-container>
    <template v-else-if="error">
      <v-subheader>
        Please try to refresh the page
      </v-subheader>
    </template>
    <template v-else>
      <v-subheader>
        Please log in
      </v-subheader>
      <TheSettingsLogin />
    </template>
  </v-card-text>
</template>
<script lang="ts">
import { createComponent } from '@vue/composition-api'

const TheSettingsLogin = () => import('./TheSettingsLogin.vue')

export interface Props {
  loading: boolean
  error: boolean
}
export default createComponent<Readonly<Props>>({
  props: {
    loading: { required: true, type: Boolean,
    default:false },
    error: { required: true, type: Boolean, default:false }
  },
  components: {
    TheSettingsLogin
  }
})
</script>
