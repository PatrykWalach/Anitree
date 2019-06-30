<template>
  <v-list two-line subheader>
    <v-subheader>Settings</v-subheader>

    <TheDrawerSettingsTheme />

    <TheDrawerSettingsTitle />
    <TheDrawerSettingsLogin v-if="!token" />
  </v-list>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import TheDrawerSettingsTheme from './TheDrawerSettingsTheme.vue'
import TheDrawerSettingsTitle from './TheDrawerSettingsTitle.vue'
import auth from '../store/modules/auth'

const TheDrawerSettingsLogin = () => import('./TheDrawerSettingsLogin.vue')

@Component({
  components: {
    TheDrawerSettingsTheme,
    TheDrawerSettingsTitle,
    TheDrawerSettingsLogin
  }
})
export default class TheDrawerSettings extends Vue {
  get token() {
    return auth.token
  }
}
</script>
