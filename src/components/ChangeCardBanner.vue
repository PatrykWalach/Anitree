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
import { computed, defineComponent, ref } from '@vue/composition-api'
import ChangeCardBannerActions from './ChangeCardBannerActions.vue'
import { ChangeCardBanner_media } from './__generated__/ChangeCardBanner_media'
import MediaItemAvatar from './MediaItemAvatar.vue'
import MediaItemSubtitle from './MediaItemSubtitle.vue'
import MediaItemTitle from './MediaItemTitle.vue'
import { useTitle } from '../hooks/results'

import { MediaItemAvatarFragments } from './MediaItemAvatar.vue'
import { MediaItemSubtitleFragments } from './MediaItemSubtitle.vue'
import { MediaItemTitleFragments } from './MediaItemTitle.vue'

import gql from 'graphql-tag'

export const ChangeCardBannerFragments = {
  media: gql`
    fragment ChangeCardBanner_media on Media {
      id
      title {
        userPreferred
      }
      ...MediaItemAvatar_media
      ...MediaItemSubtitle_media
      ...MediaItemTitle_media
    }
    ${MediaItemAvatarFragments.media}
    ${MediaItemSubtitleFragments.media}
    ${MediaItemTitleFragments.media}
  `,
}

interface Props {
  media: ChangeCardBanner_media
  pending: SavePending | DeletePending
}

const ChangeCardBannerList = () =>
  import(
    /* webpackChunkName: "ChangeCardBannerList" */ /* webpackPrefetch: true */ './ChangeCardBannerList.vue'
  )

export default defineComponent<Readonly<Props>>({
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
