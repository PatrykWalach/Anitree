<template>
  <v-toolbar-items>
    <v-divider vertical></v-divider>
    <!-- <v-switch :value="dark" label="dark theme" @change="changeTheme"></v-switch> -->
  </v-toolbar-items>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
// import { Mutation, State } from 'vuex-class'
// import { ThemeChangeThemeMutation } from '../types'

@Component
export default class TheToolbarItems extends Vue {
  // @State('theme', { namespace: 'theme' })
  // public dark!: boolean

  // @Mutation('CHANGE_THEME', { namespace: 'theme' })
  // public changeTheme!: ThemeChangeThemeMutation
}
</script>
