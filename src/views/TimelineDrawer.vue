<template>
  <v-list rounded>
    <BaseActionItem
      icon="keyboard_arrow_down"
      tooltip="Back"
      @click.stop="$router.back()"
    />

    <BaseActionItem
      icon="edit"
      tooltip="Edit"
      @click.stop="isEdited = !isEdited"
    />

    <BaseActionItem
      :href="media.siteUrl"
      rel="noopener"
      target="_blank"
      icon="open_in_new"
      tooltip="Anilist"
    />

    <BaseActionItem
      :disabled="queryLoading"
      :loading="mutationLoading"
      :icon="isFavourite ? 'favorite' : 'favorite_border'"
      icon-color="red"
      :title="favourites"
      :tooltip="isFavourite ? 'unfavourite' : 'favourite'"
      @click.stop="toggleFavourite"
    />

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
  </v-list>
</template>

<script lang="ts">
import { createComponent, ref } from '@vue/composition-api'
import { useFavourites } from '@/hooks/toggleFavourite'
import { useShare } from '@/hooks/share'

import BaseActionItem from '@/components/BaseActionItem.vue'
import MediaEditLoading from '@/components/MediaEditLoading.vue'
import { TimelineDrawer_media } from './__generated__/TimelineDrawer_media'
import { VBottomSheet } from 'vuetify/lib'
import { asyncComponent } from '@/router'

import { useViewer } from '../hooks/viewer'

const BaseShare = () =>
  import(
    /* webpackChunkName: "BaseShare" */ /* webpackPrefetch: true */ '@/components/BaseShare.vue'
  )

const MediaEdit = () =>
  asyncComponent(
    import(
      /* webpackChunkName: "MediaEdit" */ /* webpackPrefetch: true */ '@/components/MediaEdit.vue'
    ),
    MediaEditLoading,
  )

export interface Props {
  media: TimelineDrawer_media
}

export default createComponent<Readonly<Props>>({
  components: {
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
