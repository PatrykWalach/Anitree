<template>
  <v-list-tile
    avatar
    rel="noopener"
    :href="
      `https://anilist.co/api/v2/oauth/authorize?client_id=${id}&response_type=token`
    "
    @click
  >
    <v-list-tile-content>
      <v-list-tile-title>Login</v-list-tile-title>
      <v-list-tile-sub-title>Login with AniList</v-list-tile-sub-title>
    </v-list-tile-content>
  </v-list-tile>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class TheDrawerSettingsLogin extends Vue {
  public id = process.env.VUE_APP_ANILIST_ID
}
</script>
