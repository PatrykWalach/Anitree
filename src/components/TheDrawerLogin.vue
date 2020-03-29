<template>
  <VListItem
    v-bind="$attrs"
    :href="`https://anilist.co/api/v2/oauth/authorize?client_id=${id}&response_type=token`"
  >
    <VListItemIcon>
      <VIcon>person</VIcon>
    </VListItemIcon>
    <VListItemContent>
      <VListItemTitle>
        Login
      </VListItemTitle>
    </VListItemContent>
  </VListItem>
</template>
<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'

export const useLogin = () => {
  const id = ref(process.env.VUE_APP_ANILIST_ID || null)

  return { id }
}

export default defineComponent({
  inheritAttrs: false,
  setup() {
    const { id } = useLogin()
    return { id }
  },
})
</script>
