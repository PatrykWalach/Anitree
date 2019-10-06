<template>
  <v-list-item
    rel="noopener"
    :href="
      `https://anilist.co/api/v2/oauth/authorize?client_id=${id}&response_type=token`
    "
  >
    <v-list-item-content>
      <v-list-item-title class="text-capitalize">Login</v-list-item-title>
      <v-list-item-subtitle>Login with AniList</v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>
<script lang="ts">
export default {
  setup: () => ({ id: process.env.VUE_APP_ANILIST_ID }),
}
</script>
