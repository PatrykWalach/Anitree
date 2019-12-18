<template>
  <ChangeCardLoadingBanner v-if="loading" />
  <ChangeCardBanner v-else-if="media" :media="media" :pending="request" />
</template>
<script lang="ts">
import { DeletePending, SavePending } from '../store/modules/changes'
import { computed, createComponent } from '@vue/composition-api'
import ChangeCardLoadingBanner from './ChangeCardLoadingBanner.vue'
import { asyncComponent } from '../views/Search.vue'
import { useMedia } from '@/graphql'
import { useQueryLoading } from '@vue/apollo-composable'

const ChangeCardBanner = () =>
  asyncComponent(
    import(/* webpackChunkName: "ChangeCardBanner" */ './ChangeCardBanner.vue'),
    ChangeCardLoadingBanner,
  )

interface Props {
  request: SavePending | DeletePending
}

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
    const { Media: media } = useMedia(
      computed(() => ({ id: props.request.mediaId })),
    )
    const loading = useQueryLoading()

    return {
      loading,
      media,
    }
  },
})
</script>
