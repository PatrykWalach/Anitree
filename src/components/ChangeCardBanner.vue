<template>
  <VCard>
    <VListItem>
      <VListItemIcon>
        <VIcon color="primary" v-text="icon" />
      </VListItemIcon>
      <VListItemContent>
        <MediaItemTitle headline :media="media" />
        <MediaItemSubtitle body1 :media="media" />
      </VListItemContent>
      <MediaItemAvatar :size="40" :media="media" />
    </VListItem>

    <VDivider />
    <ChangeCardBannerActions :extension.sync="extension" :pending="pending" />

    <VExpandTransition v-if="!deleteType">
      <KeepAlive>
        <ChangeCardBannerList v-if="extension" :pending="pending" />
      </KeepAlive>
    </VExpandTransition>
  </VCard>
</template>
<script lang="ts">
import { DeletePending, SavePending } from '../store/reducers/changes'
import { computed, createComponent, ref } from '@vue/composition-api'
import ChangeCardBannerActions from './ChangeCardBannerActions.vue'
import { ChangeCardBanner_media } from './__generated__/ChangeCardBanner_media'
import MediaItemAvatar from './MediaItemAvatar.vue'
import MediaItemSubtitle from './MediaItemSubtitle.vue'
import MediaItemTitle from './MediaItemTitle.vue'
import { useTitle } from '../hooks/results'

interface Props {
  media: ChangeCardBanner_media
  pending: SavePending | DeletePending
}

const ChangeCardBannerList = () =>
  import(
    /* webpackChunkName: "ChangeCardBannerList" */ /* webpackPrefetch: true */ './ChangeCardBannerList.vue'
  )

export default createComponent<Readonly<Props>>({
  components: {
    ChangeCardBannerActions,
    ChangeCardBannerList,
    MediaItemAvatar,
    MediaItemSubtitle,
    MediaItemTitle,
  },
  props: {
    media: {
      default: null,
      required: true,
      type: Object,
    },
    pending: {
      default: null,
      required: true,
      type: Object,
    },
  },
  setup(props) {
    const title = useTitle(() => props.media)

    const extension = ref(false)

    const deleteType = computed(() => props.pending.type === 'DELETE')

    const icon = computed(() => (deleteType.value ? 'delete' : 'edit'))

    return { deleteType, extension, icon, title }
  },
})
</script>
