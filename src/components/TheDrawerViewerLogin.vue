<template>
  <v-list-item
    v-bind="$attrs"
    :href="
      `https://anilist.co/api/v2/oauth/authorize?client_id=${id}&response_type=token`
    "
  >
    <v-list-item-icon>
      <v-icon>person</v-icon>
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title>
        Login
      </v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>
<script lang="ts">
import { createComponent, ref } from '@vue/composition-api'

export const useLogin = () => {
  const id = ref(process.env.VUE_APP_ANILIST_ID || null)

  return { id }
}

export default createComponent({
  inheritAttrs: false,
  setup() {
    const { id } = useLogin()
    return { id }
  },
})
</script>
