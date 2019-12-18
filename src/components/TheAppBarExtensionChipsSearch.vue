<template>
  <TheAppBarExtensionChipsSearchReady v-if="page" :page="page" />
  <v-chip-group
    v-else
    :style="{
      'max-width': '100%',
    }"
  >
    <v-skeleton-loader class="my-1 mr-2" v-for="i in 12" :key="i" type="chip" />
  </v-chip-group>
</template>
<script lang="ts">
import { PAGE, useViewer } from '@/graphql'
import { Page, Variables } from '@/graphql/schema/page'
import { computed, createComponent } from '@vue/composition-api'
import { useQuery, useResult } from '@vue/apollo-composable'
import TheAppBarExtensionChipsSearchReady from './TheAppBarExtensionChipsSearchReady.vue'

export default createComponent({
  components: {
    TheAppBarExtensionChipsSearchReady,
  },
  setup(_, { root }) {
    const { Viewer } = useViewer()

    const search = computed(() => {
      const search = root.$route.query.search
      return search instanceof Array ? search.shift() || undefined : search
    })

    const variables = computed(() => ({
      isAdult:
        Viewer.value && Viewer.value.options.displayAdultContent
          ? undefined
          : false,
      search: search.value,
    }))

    const { result } = useQuery<{ Page: Page }, Readonly<Variables>>(
      PAGE,
      variables,
      () => ({
        enabled: !!search.value,
      }),
    )

    const page = useResult(result, null, data => data.Page)

    return {
      page,
    }
  },
})
</script>
