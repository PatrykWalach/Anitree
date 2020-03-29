<template>
  <ChangeCardLoadingBanner v-if="loading" />
  <ChangeCardBanner v-else-if="media" :media="media" :pending="request" />
</template>
<script lang="ts">
import {
  ChangeCardQuery as ChangeCardQueryResult,
  ChangeCardQueryVariables,
} from './__generated__/ChangeCardQuery'
import { computed, defineComponent } from '@vue/composition-api'
import { useQuery, useResult, useQueryLoading } from '@vue/apollo-composable'
import ChangeCardLoadingBanner from './ChangeCardLoadingBanner.vue'
import { asyncComponent } from '@/router'
import { NonNullableValues } from '../types'

const ChangeCardBanner = () =>
  asyncComponent(
    import(
      /* webpackChunkName: "ChangeCardBanner" */ /* webpackPrefetch: true */ './ChangeCardBanner.vue'
    ),
  )

import { ChangeCardBannerFragments } from './ChangeCardBanner.vue'

import gql from 'graphql-tag'

export const ChangeCardQuery = gql`
  query ChangeCardQuery($id: Int) {
    Media(id: $id) {
      id
      ...ChangeCardBanner_media
    }
  }
  ${ChangeCardBannerFragments.media}
`

export default defineComponent({
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
      NonNullableValues<ChangeCardQueryResult>,
      ChangeCardQueryVariables
    >(
      ChangeCardQuery,
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
