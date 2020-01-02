<template>
  <ChangeCardLoadingBanner v-if="loading" />
  <ChangeCardBanner v-else-if="media" :media="media" :pending="request" />
</template>
<script lang="ts">
import {
  ChangeCardQuery,
  ChangeCardQueryVariables,
} from './__generated__/ChangeCardQuery'
import { computed, createComponent } from '@vue/composition-api'
import { useQuery, useResult, useQueryLoading } from '@vue/apollo-composable'
import ChangeCardLoadingBanner from './ChangeCardLoadingBanner.vue'
import MEDIA from './ChangeCard.gql'
import { asyncComponent } from '@/router'
import { NonNullableValues } from '../types'

const ChangeCardBanner = () =>
  asyncComponent(
    import(/* webpackChunkName: "ChangeCardBanner" */ './ChangeCardBanner.vue'),
  )

export default createComponent({
  components: { ChangeCardBanner, ChangeCardLoadingBanner },
  props: {
    request: {
      default: null,
      required: true,
      type: Object,
    },
  },
  setup(props) {
    const mediaQuery = useQuery<
      NonNullableValues<ChangeCardQuery>,
      ChangeCardQueryVariables
    >(
      MEDIA,
      computed(() => ({ id: props.request.mediaId })),
    )
    const media = useResult(mediaQuery.result)

    const loading = useQueryLoading()

    return {
      loading,
      media,
    }
  },
})
</script>
