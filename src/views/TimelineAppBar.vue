<template>
  <div>
    <BaseAction
      icon="keyboard_arrow_down"
      @click.stop="$router.back()"
      tooltip="Back"
    />

    <BaseAction icon="edit" @click.stop="isEdited = !isEdited" tooltip="Edit" />

    <BaseAction
      :disabled="queryLoading"
      :loading="mutationLoading"
      @click.stop="toggleFavorite"
      :icon="isFavourite ? 'favorite' : 'favorite_border'"
      iconColor="red"
      :title="favourites"
      :tooltip="isFavourite ? 'unfavourite' : 'favourite'"
    />

    <base-action-dropdown type-icon icon="more_vert">
      <BaseActionItem icon="share" @click.stop="share" tooltip="Share" />

      <BaseActionItem
        :href="media.siteUrl"
        rel="noopener"
        target="_blank"
        icon="open_in_new"
        tooltip="Anilist"
      />
    </base-action-dropdown>

    <component
      :is="$vuetify.breakpoint.xsOnly ? 'v-bottom-sheet' : 'v-dialog'"
      v-model="isShared"
      scrollable
      max-width="440px"
    >
      <BaseShare :options="shareData" />
    </component>
    <v-dialog
      v-model="isEdited"
      scrollable
      :fullscreen="$vuetify.breakpoint.xsOnly"
      :transition="
        $vuetify.breakpoint.xsOnly ? 'dialog-bottom-transition' : undefined
      "
      max-width="720px"
    >
      <MediaEditLoading v-if="queryLoading" @close="isEdited = false" />
      <MediaEdit
        v-else-if="media && viewer"
        :viewer="viewer"
        :media="media"
        @close="isEdited = false"
      />
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { createComponent, ref } from '@vue/composition-api'
import { useFavourites } from '@/hooks/toggleFavourite'
import { useShare } from '@/hooks/share'

import BaseAction from '@/components/BaseAction.vue'
import BaseActionDropdown from '@/components/BaseActionDropdown.vue'
import MediaEditLoading from '@/components/MediaEditLoading.vue'
import { TimelineAppBar_media } from './__generated__/TimelineAppBar_media'
import { VBottomSheet } from 'vuetify/lib'
import { asyncComponent } from '@/router'
import { useViewer } from '../hooks/viewer'

const BaseShare = () =>
  import(/* webpackChunkName: "BaseShare" */ '@/components/BaseShare.vue')
const BaseActionItem = () =>
  import(
    /* webpackChunkName: "BaseActionItem" */ '@/components/BaseActionItem.vue'
  )

const MediaEdit = () =>
  asyncComponent(
    import(/* webpackChunkName: "MediaEdit" */ '@/components/MediaEdit.vue'),
    MediaEditLoading,
  )

export interface Props {
  media: TimelineAppBar_media
}

export default createComponent<Readonly<Props>>({
  components: {
    BaseAction,
    BaseActionDropdown,
    BaseActionItem,
    BaseShare,
    MediaEdit,
    MediaEditLoading,
    VBottomSheet,
  },
  props: {
    media: { default: null, required: true, type: Object },
  },
  setup(props) {
    const isEdited = ref(false)
    const { isShared, share, shareData } = useShare(() => props.media)
    const viewer = useViewer()

    return {
      ...useFavourites(() => props.media),
      viewer,
      isEdited,
      isShared,
      open,
      share,
      shareData,
    }
  },
})
</script>
