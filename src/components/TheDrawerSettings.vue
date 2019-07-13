<template>
  <v-list two-line subheader>
    <v-subheader>Settings</v-subheader>

    <TheDrawerSettingsTheme />

    <TheDrawerSettingsTitle />
    <TheDrawerSettingsLogin v-if="!authorized" />
    <TheDrawerSettingsSubmit v-else />
  </v-list>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import TheDrawerSettingsTheme from './TheDrawerSettingsTheme.vue'
import TheDrawerSettingsTitle from './TheDrawerSettingsTitle.vue'
import auth from '@/store/modules/auth'

const TheDrawerSettingsLogin = () =>
  import('@/components/TheDrawerSettingsLogin.vue')
const TheDrawerSettingsSubmit = () =>
  import('@/components/TheDrawerSettingsSubmit.vue')

@Component({
  components: {
    TheDrawerSettingsTheme,
    TheDrawerSettingsTitle,
    TheDrawerSettingsLogin,
    TheDrawerSettingsSubmit
  }
})
export default class TheDrawerSettings extends Vue {
  get authorized() {
    return auth.authorized
  }
}
</script>
