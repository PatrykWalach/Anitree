<template>
  <VList nav color="transparent">
    <TheDrawerLoadingViewer v-if="loading" />
    <TheDrawerViewer v-else-if="viewer" :viewer="viewer" />
    <TheDrawerLogin v-else :disabled="!!token" />
  </VList>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
import { useQueryLoading, useQuery, useResult } from '@vue/apollo-composable'
import TheDrawerLoadingViewer from '@/components/TheDrawerLoadingViewer.vue'
import TheDrawerLogin from '@/components/TheDrawerLogin.vue'
import { asyncComponent } from '@/router'

import { useToken } from '@/hooks/token'
import { ChangesBackdropQuery } from './ChangesBackdrop.gql.js'
import { ChangesBackdropQuery as ChangesBackdropQueryResult } from './__generated__/ChangesBackdropQuery'

const TheDrawerViewer = () =>
  asyncComponent(
    import(
      /* webpackChunkName: "TheDrawerViewer" */ /* webpackPrefetch: true */ '@/components/TheDrawerViewer.vue'
    ),
    TheDrawerLoadingViewer,
  )

export default createComponent({
  components: {
    TheDrawerLoadingViewer,
    TheDrawerLogin,
    TheDrawerViewer,
  },
  inheritAttrs: false,
  setup() {
    const token = useToken()
    const viewerQuery = useQuery<ChangesBackdropQueryResult>(
      ChangesBackdropQuery,
      {},
      () => ({
        enabled: !!token.value,
      }),
    )
    const viewer = useResult(viewerQuery.result)
    const loading = useQueryLoading()

    return {
      loading,
      token,
      viewer,
    }
  },
})
</script>
